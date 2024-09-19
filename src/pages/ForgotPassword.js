// import React, { useState } from 'react';

// const ForgotPassword = () => {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle password reset logic here
//         setMessage('Password reset link has been sent to your email.');
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//             <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             className="mt-1 block w-full px-3 py-2 border border-teal-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//                         />
//                     </div>
//                     {message && (
//                         <div className="mb-4 text-green-600 text-sm">
//                             {message}
//                         </div>
//                     )}
//                     <button
//                         type="submit"
//                         className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     >
//                         Send Reset Link
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword;
