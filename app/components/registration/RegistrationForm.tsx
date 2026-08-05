"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '../../services/api';
import { useUser } from '@auth0/nextjs-auth0/client';
import { subYears } from 'date-fns';
import { motion } from "framer-motion";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  country: string;
  college: string;
}

interface ValidationErrors {
  [key: string]: string | null;
}

const QUESTIONS = [
  {
    id: 'firstName',
    question: "What's your first name?",
    inputType: 'text',
  },
  {
    id: 'lastName',
    question: "And your last name?",
    inputType: 'text',
  },
  {
    id: 'dateOfBirth',
    question: "When were you born?",
    inputType: 'date',
  },
  {
    id: 'college',
    question: "Where did you learn to be so awesome? (your school or college)",
    inputType: 'text',
  },
];

const validations = {
  firstName: (value: string) => {
    if (!value) return "First name is required";
    if (!/^[A-Za-z\s]{1,50}$/.test(value)) return "First name should only contain letters and spaces";
    return null;
  },
  lastName: (value: string) => {
    if (!value) return "Last name is required";
    if (!/^[A-Za-z\s]{1,50}$/.test(value)) return "Last name should only contain letters and spaces";
    return null;
  },
  dateOfBirth: (value: string) => {
    if (!value) return "Date of birth is required";
    const date = new Date(value);
    const minDate = subYears(new Date(), 100);
    const maxDate = subYears(new Date(), 18);
    if (date < minDate || date > maxDate) return "Age must be between 18 and 100 years";
    return null;
  },
  college: (value: string) => {
    if (!value) return "College name is required";
    if (value.length < 2) return "College name must be at least 2 characters long";
    return null;
  }
};

const Registration: React.FC = () => {
  const router = useRouter();
  const { user, isLoading: isUserLoading, error: userError } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dateOfBirth: '',
    country: 'India', 
    college: '',
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [isUserLoading, user, router]);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    return <div>Error: {userError.message}</div>;
  }

  if (!user) {
    return null;
  }

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;
  
  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (validations[name as keyof typeof validations]) {
      const err = validations[name as keyof typeof validations](value);
      setValidationErrors((prev) => ({
        ...prev,
        [name]: err,
      }));
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleContinue = () => {
    const fieldName = currentQuestion.id as keyof FormData;
    const fieldValue = formData[fieldName];
    const validate = validations[fieldName as keyof typeof validations];
    if (validate) {
      const err = validate(fieldValue);
      if (err) {
        setValidationErrors((prev) => ({
          ...prev,
          [fieldName]: err,
        }));
        return;
      }
    }

    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question answered, proceed to submit
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    if (!user?.email) {
      setError('Unable to retrieve your email. Please try logging in again.');
      setIsLoading(false);
      return;
    }

    // Validate all fields once more before final submit
    let hasErrors = false;
    const newErrors: ValidationErrors = {};
    for (const q of QUESTIONS) {
      const fieldName = q.id as keyof FormData;
      const value = formData[fieldName];
      const validate = validations[fieldName as keyof typeof validations];
      if (validate) {
        const err = validate(value);
        if (err) {
          newErrors[fieldName] = err;
          hasErrors = true;
        }
      }
    }
    if (hasErrors) {
      setValidationErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const signupData = {
      name: `${formData.firstName} ${formData.lastName}`,
      date_of_birth: formData.dateOfBirth,
      email: user.email,
      college: formData.college,
      mobile: formData.mobile,
      country: formData.country,
    };

    try {
      const response = await signup(signupData);
      if (response.message === 'User signed up successfully') {
        window.location.href = '/dashboard';
      } else if (response.message === 'User already exists') {
        setError('User already exists. Please login instead.');
      } else {
        setError('An unexpected error occurred during signup');
      }
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const maxDate = subYears(new Date(), 18).toISOString().split('T')[0];

  const renderProgressSteps = () => {
    return (
      <div className="flex items-center justify-center w-full mb-6 sm:mb-8">
        {QUESTIONS.map((_, index) => (
          <div key={index} className="flex items-center">
            {/* Step circle */}
            <div 
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-colors ${
                index === currentQuestionIndex 
                  ? "border-[#61dd01] bg-[#61dd01] text-white" 
                  : index < currentQuestionIndex 
                    ? "border-[#61dd01] bg-white text-[#61dd01]" 
                    : "border-gray-300 bg-white text-gray-400"
              }`}
            >
              {index < currentQuestionIndex ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-xs sm:text-sm font-medium">{index + 1}</span>
              )}
            </div>
            
            {/* Connector line */}
            {index < QUESTIONS.length - 1 && (
              <div 
                className={`flex-1 h-1 sm:h-1.5 w-12 sm:w-16 mx-1 sm:mx-2 ${
                  index < currentQuestionIndex ? "bg-[#61dd01]" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section
      aria-label="Registration Form Section"
      className="min-h-screen flex flex-col bg-white relative overflow-hidden w-full"
    >
      {/* Header */}
      <div className="w-full border-b">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-center">
            <h1 className="text-base sm:text-lg font-medium text-foreground text-center px-2 sm:px-4">
              Complete your profile to get started
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 mt-3 sm:mt-4 md:mt-8 w-full">
        {/* Progress Indicator */}
        {renderProgressSteps()}
      
        {/* Top Bubble (Question) */}
        <div className="relative mx-auto max-w-sm mb-3 sm:mb-4 md:mb-8 md:ml-10 w-full px-2 sm:px-0">
          <div className="relative bg-white border border-gray-300 rounded-2xl px-3 sm:px-6 py-2 sm:py-4 inline-block w-full">
            <p className="text-foreground font-medium text-sm sm:text-base md:text-lg">
              {currentQuestion.question}
            </p>
            {/* Speech bubble tail */}
            <div className="absolute -bottom-3 left-3/4 -translate-x-1/2">
              <div className="relative w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 rotate-45 bg-white border-r border-b border-gray-300"></div>
            </div>
          </div>
        </div>

        {/* Layout: left illustration placeholder, right input */}
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-12 w-full min-h-[250px] sm:min-h-[300px]">
          {/* Left Column (Illustration) */}
          <div className="w-full md:w-1/2 flex-shrink-0 flex items-center justify-center">
            <div className="w-full max-w-[300px] sm:max-w-[400px] h-48 sm:h-64 md:h-80 lg:h-96 flex items-center justify-center">
              <iframe
                title="Professor Spark Animation"
                src="https://rive.app/s/qJTrWy2Ej0_8X7Fea7KLZQ/embed"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Input Column */}
          <div className="w-full md:w-1/2 max-w-md mx-auto flex flex-col items-start justify-center px-2 sm:px-0">
            <div className="w-full">
              {/* Render input based on inputType */}
              {(currentQuestion.inputType === 'text' || currentQuestion.inputType === 'autocomplete') && (
                <div className="flex flex-col mb-3 sm:mb-4 w-full">
                  <input
                    type="text"
                    name={currentQuestion.id}
                    value={formData[currentQuestion.id as keyof FormData] as string}
                    onChange={(e) => handleInputChange(currentQuestion.id as keyof FormData, e.target.value)}
                    className="w-full py-2.5 sm:py-3 px-3 sm:px-4 border-2 border-gray-300 rounded-xl focus:border-[#61dd01] focus:ring-1 focus:ring-[#61dd01] outline-none transition-colors text-sm sm:text-base"
                    placeholder="Type your answer..."
                  />
                  {validationErrors[currentQuestion.id] && (
                    <span className="text-red-500 text-xs sm:text-sm mt-1">
                      {validationErrors[currentQuestion.id]}
                    </span>
                  )}
                </div>
              )}

              {currentQuestion.inputType === 'date' && (
                <div className="flex flex-col mb-3 sm:mb-4 w-full">
                  <input
                    type="date"
                    name={currentQuestion.id}
                    value={formData[currentQuestion.id as keyof FormData] as string}
                    onChange={(e) => handleInputChange(currentQuestion.id as keyof FormData, e.target.value)}
                    className="w-full py-2.5 sm:py-3 px-3 sm:px-4 border-2 border-gray-300 rounded-xl focus:border-[#61dd01] focus:ring-1 focus:ring-[#61dd01] outline-none transition-colors text-sm sm:text-base"
                    max={maxDate}
                  />
                  {validationErrors[currentQuestion.id] && (
                    <span className="text-red-500 text-xs sm:text-sm mt-1">
                      {validationErrors[currentQuestion.id]}
                    </span>
                  )}
                </div>
              )}

              <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 md:mt-6 w-full">
                {currentQuestionIndex > 0 && (
                  <motion.button
                    onClick={handlePrevious}
                    className="w-full sm:w-auto px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold transition-all duration-200 text-xs sm:text-sm md:text-base bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Previous
                  </motion.button>
                )}
                <motion.button
                  onClick={handleContinue}
                  disabled={
                    !formData[currentQuestion.id as keyof FormData] ||
                    (validationErrors[currentQuestion.id] !== null && validationErrors[currentQuestion.id] !== undefined)
                  }
                  className={`w-full sm:w-auto px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold transition-all duration-200 text-xs sm:text-sm md:text-base ${
                    !formData[currentQuestion.id as keyof FormData] ||
                    (validationErrors[currentQuestion.id] !== null && validationErrors[currentQuestion.id] !== undefined)
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#61dd01] text-white hover:bg-[#4caf00]"
                  }`}
                >
                  {isLastQuestion ? (isLoading ? "Submitting..." : "Submit") : "Continue"}
                </motion.button>
              </div>

              {error && <p className="text-red-500 mt-3 sm:mt-4 text-xs sm:text-sm md:text-base">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;