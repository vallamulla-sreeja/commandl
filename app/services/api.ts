import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// export const BASE_URL = 'http://0.0.0.0:3001/api';
export const BASE_URL = 'https://api.vedaai.io/api';

export const fetchAccessToken = async (): Promise<string> => {
  if (typeof window === 'undefined') {
    // Server-side
    const { getAccessToken } = await import('@auth0/nextjs-auth0');
    const { accessToken } = await getAccessToken();
    if (!accessToken) {
      throw new Error('Unauthorized');
    }
    return accessToken;
  } else {
    // Client-side
    try {
      const response = await fetch('/api/auth/token');
      if (!response.ok) {
        throw new Error('Unauthorized');
      }
      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      console.error('Error fetching access token:', error);
      throw error;
    }
  }
};

export interface SignupData {
  name: string;
  date_of_birth: string;
  email: string;
  mobile: string;
  country: string;
  college: string;
}
interface CollegeSuggestion {
  college_name: string;
  university_name: string;
  state: string;
}

export const getCollegeSuggestions = async (query: string): Promise<string[]> => {
  try {
    const accessToken = await fetchAccessToken();
    const response = await api.get<CollegeSuggestion[]>('/search/college', {
      params: { q: query },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data.map(college => college.college_name);
  } catch (error) {
    console.error('Error fetching college suggestions:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      await handleLogout();
      throw error;
    }
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

interface SignupResponse {
  message: string;
  userId: string;
}
export const signup = async (userData: SignupData): Promise<SignupResponse> => {
  try {
    const accessToken = await fetchAccessToken();
    const response = await api.post('/signup', userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.data.message === 'User already exists') {
      return {
        message: 'User already exists',
        userId: response.data.userId
      };
    }
    return {
      message: 'User signed up successfully',
      userId: response.data.userId
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      await handleLogout();
      throw error;
    }
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'An error occurred during signup');
    }
    throw new Error('An error occurred during signup');
  }
};

export const handleLogout = async () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/api/auth/logout';
  }
};

export interface Profile {
  name: string;
  email: string;
  date_of_birth: string;
  profile_picture: string;
  mobile: string;
  country: string;
  college: string;
  majors: string;
  college_year: string;
  linkedin: string;
  github: string;
  fun_fact: string;
  expertise: string;
  location: string;
  bio: string;
  github_username: string;
  github_url: string;
  linkedin_username: string;
  linkedin_url: string;
  portfolio_url: string;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  try {
    const token = await fetchAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  }
});

// Profile related API calls
export const profileApi = {
  getProfile: async (): Promise<Profile> => {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error instanceof Error && error.message === 'Unauthorized') {
        throw error;
      }
      if (axios.isAxiosError(error) && error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error instanceof Error) {
        console.error('Error message:', error.message);
      }
      throw error;
    }
  },
  updateProfile: async (profileData: Profile): Promise<unknown> => {
    try {
      const accessToken = await fetchAccessToken();
      const response = await api.post('/update-user-profile', profileData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error instanceof Error && error.message === 'Unauthorized') {
        await handleLogout();
        throw error;
      }
      throw error;
    }
  }
};

export const uploadToAzure = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload-to-azure', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  return data.url;
};

export interface PaymentStatusResponse {
  status: string;
  extra: string;
  project_enrolled: string;
}

export const checkUserStatusAPI = async (): Promise<PaymentStatusResponse> => {
  try {
    const accessToken = await fetchAccessToken();
    const response = await api.post('/check-user-status', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error checking user status:', error);
    throw error;
  }
};

// Error handling middleware
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle different error cases
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/api/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api; 