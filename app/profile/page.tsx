'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { profileApi, uploadToAzure } from '../services/api';
import type { Profile } from '../services/api';
import Image from 'next/image';
import { FiEdit2, FiPhone, FiCalendar } from 'react-icons/fi';
import { FaCamera } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GraduationCap, MapPin } from 'lucide-react';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const InfoCard = ({ icon, title, text }: InfoCardProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-400">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-gray-900">{text}</p>
      </div>
    </div>
  );
};

// Validation functions
function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateDate(dateStr: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

function validateURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function validateMobile(mobile: string): boolean {
  const re = /^[0-9]{5,}$/;
  return re.test(mobile);
}

const EditProfileForm = ({
  profile,
  onSave,
  onCancel,
}: {
  profile: Profile;
  onSave: (updatedProfile: Profile) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(profile);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email || !validateEmail(formData.email)) {
      errors.email = 'Please provide a valid email address';
    }
    if (formData.date_of_birth && !validateDate(formData.date_of_birth)) {
      errors.date_of_birth = 'Please provide a valid date in YYYY-MM-DD format';
    }
    if (formData.mobile && !validateMobile(formData.mobile)) {
      errors.mobile = 'Please provide a valid mobile number (digits only)';
    }
    if (formData.linkedin && !validateURL(formData.linkedin)) {
      errors.linkedin = 'Please provide a valid LinkedIn URL';
    }
    if (formData.github && !validateURL(formData.github)) {
      errors.github = 'Please provide a valid GitHub URL';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the form errors', {
        position: 'bottom-center',
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let profilePictureUrl = formData.profile_picture;
      
      // Upload new profile picture if one was selected
      if (profilePicture) {
        try {
          profilePictureUrl = await uploadToAzure(profilePicture);
        } catch (error) {
          console.error('Error uploading profile picture:', error);
          toast.error('Failed to upload profile picture', {
            position: 'bottom-center',
            autoClose: 3000,
          });
          return;
        }
      }

      const updatedProfile = {
        ...formData,
        profile_picture: profilePictureUrl,
      };
      
      await onSave(updatedProfile);
      toast.success('Profile updated successfully', {
        position: 'bottom-center',
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile', {
        position: 'bottom-center',
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      {/* Profile Picture */}
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md">
            {(previewUrl || formData.profile_picture) ? (
              <Image
                src={previewUrl || formData.profile_picture}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-4xl text-gray-400">
                  {formData.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <label
            htmlFor="profile-picture"
            className="absolute bottom-0 right-0 bg-[#58cc02] p-2 rounded-full cursor-pointer hover:bg-[#4fa802] transition-colors"
          >
            <FaCamera className="text-white" />
          </label>
          <input
            id="profile-picture"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#58cc02] focus:outline-none focus:ring-1 focus:ring-[#58cc02]"
          />
          {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#58cc02] focus:outline-none focus:ring-1 focus:ring-[#58cc02]"
          />
          {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#58cc02] focus:outline-none focus:ring-1 focus:ring-[#58cc02]"
          />
          {formErrors.date_of_birth && <p className="mt-1 text-sm text-red-600">{formErrors.date_of_birth}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#58cc02] focus:outline-none focus:ring-1 focus:ring-[#58cc02]"
          />
          {formErrors.mobile && <p className="mt-1 text-sm text-red-600">{formErrors.mobile}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#58cc02] focus:outline-none focus:ring-1 focus:ring-[#58cc02]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">College</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#58cc02] focus:outline-none focus:ring-1 focus:ring-[#58cc02]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Majors</label>
          <input
            type="text"
            name="majors"
            value={formData.majors}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#58cc02] focus:outline-none focus:ring-1 focus:ring-[#58cc02]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">College Year</label>
          <input
            type="text"
            name="college_year"
            value={formData.college_year}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#58cc02] focus:outline-none focus:ring-1 focus:ring-[#58cc02]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#58cc02] focus:outline-none focus:ring-1 focus:ring-[#58cc02]"
          />
          {formErrors.linkedin && <p className="mt-1 text-sm text-red-600">{formErrors.linkedin}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#58cc02] focus:outline-none focus:ring-1 focus:ring-[#58cc02]"
          />
          {formErrors.github && <p className="mt-1 text-sm text-red-600">{formErrors.github}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#58cc02] focus:outline-none focus:ring-1 focus:ring-[#58cc02]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Fun Fact</label>
          <textarea
            name="fun_fact"
            value={formData.fun_fact}
            onChange={handleChange}
            rows={2}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#58cc02] focus:outline-none focus:ring-1 focus:ring-[#58cc02]"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#58cc02]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-[#58cc02] text-white rounded-md hover:bg-[#4fa802] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#58cc02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileApi.getProfile();
        if (data.date_of_birth && data.date_of_birth.includes('T')) {
          data.date_of_birth = data.date_of_birth.split('T')[0];
        }
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async (updatedProfile: Profile) => {
    try {
      await profileApi.updateProfile(updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#58cc02]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <EditProfileForm
          profile={profile}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ToastContainer />
      <div className="bg-white rounded-xl shadow-sm">
        {/* Header Section */}
        <div className="relative h-48 rounded-t-xl bg-gradient-to-r from-[#58cc02] to-[#1cb0f6]">
          <div className="absolute -bottom-16 left-8">
            <div className="relative w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
              {profile.profile_picture ? (
                <Image
                  src={profile.profile_picture}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl text-gray-400">
                    {profile.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleEditProfile}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-lg px-4 py-2 flex items-center gap-2 backdrop-blur-sm transition-colors"
          >
            <FiEdit2 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-8 pb-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-600">{profile.email}</p>
            {profile.expertise && (
              <p className="text-[#58cc02] font-medium mt-2">{profile.expertise}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              <div className="space-y-4">
                <InfoCard
                  icon={<MapPin className="h-6 w-6" />}
                  title="Location"
                  text={profile?.location || 'Not specified'}
                />
                {profile.mobile && (
                  <div className="flex items-center gap-3">
                    <FiPhone className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Mobile</p>
                      <p className="text-gray-900">{profile.mobile}</p>
                    </div>
                  </div>
                )}
                {profile.date_of_birth && (
                  <div className="flex items-center gap-3">
                    <FiCalendar className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="text-gray-900">
                        {new Date(profile.date_of_birth).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Education</h2>
              <div className="space-y-4">
                <InfoCard
                  icon={<GraduationCap className="h-6 w-6" />}
                  title="Education"
                  text={profile?.college || 'Not specified'}
                />
              </div>
            </div>

            {/* Social Links
            {(profile.github_url || profile.linkedin_url || profile.portfolio_url) && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Connect</h2>
                <div className="flex flex-wrap gap-4">
                  {profile.github_url && (
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-[#58cc02] transition-colors"
                    >
                      <FiGithub className="w-5 h-5" />
                      <span>{profile.github_username || 'GitHub'}</span>
                    </a>
                  )}
                  {profile.linkedin_url && (
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-[#58cc02] transition-colors"
                    >
                      <FiLinkedin className="w-5 h-5" />
                      <span>{profile.linkedin_username || 'LinkedIn'}</span>
                    </a>
                  )} */}
                  {/* {profile.portfolio_url && (
                    <a
                      href={profile.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-[#58cc02] transition-colors"
                    >
                      <FiGlobe className="w-5 h-5" />
                      <span>Portfolio</span>
                    </a>
                  )} */}
                {/* </div>
              </div>
            )} */}

            {/* About */}
            {(profile.bio || profile.fun_fact) && (
              <div className="space-y-6 md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-900">About</h2>
                <div className="space-y-4">
                  {profile.bio && (
                    <div>
                      <p className="text-sm text-gray-500">Bio</p>
                      <p className="text-gray-900 mt-1">{profile.bio}</p>
                    </div>
                  )}
                  {profile.fun_fact && (
                    <div>
                      <p className="text-sm text-gray-500">Fun Fact</p>
                      <p className="text-gray-900 mt-1">{profile.fun_fact}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 