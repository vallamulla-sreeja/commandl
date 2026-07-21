import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

interface AboutCardProps {
  name: string;
  image: string;
  designation: string;
  description: string;
  linkedIn?: string;
  twitter?: string;
  github?: string;
}

const AboutCard = ({
  name,
  image,
  designation,
  description,
  linkedIn,
  twitter,
  github,
}: AboutCardProps) => {
  return (
    <div className="max-w-sm mx-4 mb-8 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#274C77] mb-2">{name}</h3>
        <p className="text-gray-600 font-semibold mb-4">{designation}</p>
        <p className="text-gray-700 mb-6">{description}</p>
        <div className="flex space-x-4">
          {linkedIn && (
            <Link href={linkedIn} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl text-[#0077b5] hover:opacity-80" />
            </Link>
          )}
          {twitter && (
            <Link href={twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl text-[#1DA1F2] hover:opacity-80" />
            </Link>
          )}
          {github && (
            <Link href={github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-2xl text-gray-800 hover:opacity-80" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutCard; 