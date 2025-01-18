//File to store all commendted out or temp file

//dashboard/page.tsx commednted out code


// 'use client';

// import { useUser } from '@auth0/nextjs-auth0/client';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import { ArrowDownCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

// export default function Dashboard() {
//   const { user, isLoading, error } = useUser();
//   const router = useRouter();
//   // const [accessToken, setAccessToken] = useState<string>('');

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push('/api/auth/login');
//     }
//   }, [user, isLoading, router]);

//   if (isLoading) {
//     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="min-h-screen flex items-center justify-center">Error: {error.message}</div>;
//   }

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <main className="flex-1 lg:ml-72 transition-all duration-300 p-4 lg:p-8">
//         <div className="max-w-3xl mx-auto">
//           <div className="bg-white rounded-2xl p-4 lg:p-8">
//             <div className="text-center mb-6 lg:mb-8">
//               <div className="flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-[#58CC02] bg-opacity-10 rounded-2xl mx-auto mb-4 lg:mb-6">
//                 <ArrowDownCircleIcon className="w-6 h-6 lg:w-8 lg:h-8 text-[#58CC02]" />
//               </div>
//               <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">
//                 Download CommandL Code Editor
//               </h1>
//               <p className="text-gray-600 text-base lg:text-lg mb-6 lg:mb-8 max-w-xl mx-auto">
//                 To get started with CommandL, download our code editor and sign in with the email address you used to create your account.
//               </p>
//               <button className="buttonPrimary mb-6 lg:mb-8">
//                 Download CommandL
//               </button>
//             </div>

//             <div className="border-t border-gray-100 pt-6 lg:pt-8">
//               <div className="flex items-start space-x-3 lg:space-x-4 max-w-xl mx-auto">
//                 <div className="flex-shrink-0 mt-1">
//                   <EnvelopeIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#1CB0F6]" />
//                 </div>
//                 <div>
//                   <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
//                     Your Registered Email
//                   </h2>
//                   <p className="text-sm lg:text-base text-gray-600 mb-2">
//                     Use this email address to sign in to the desktop application:
//                   </p>
//                   <div className="bg-gray-50 p-3 lg:p-4 rounded-lg">
//                     <p className="font-medium text-sm lg:text-base text-gray-900">{user.email}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// } 