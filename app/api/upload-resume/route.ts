import { NextRequest, NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';
import { getSession } from '@auth0/nextjs-auth0';

export async function POST(req: NextRequest) {
  try {
    const res = new NextResponse();
    const session = await getSession(req, res);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Only PDF, DOC, and DOCX files are allowed' }, { status: 400 });
    }

    // Validate file size (5MB limit)
    const fiveMB = 5 * 1024 * 1024;
    if (file.size > fiveMB) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
    }

    // Get file buffer
    const buffer = await file.arrayBuffer();

    // Initialize Azure Blob Storage client
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING || '');
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME || 'resumes');

    // Generate unique blob name using timestamp and original filename
    const blobName = `${Date.now()}-${file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload file to Azure Blob Storage
    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: file.type }
    });

    // Get the URL of the uploaded blob
    const url = blockBlobClient.url;

    const response = NextResponse.json({ url });
    return response;
  } catch (error) {
    console.error('Error uploading resume to Azure:', error);
    return NextResponse.json(
      { error: 'Failed to upload resume' },
      { status: 500 }
    );
  }
} 