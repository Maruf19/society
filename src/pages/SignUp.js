// SignUp.js
import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && formSubmitted) {
                console.log("User is authenticated:", user);
                navigate('/home'); // Redirect to the home page or dashboard
            }
        });

        return () => unsubscribe();
    }, [auth, formSubmitted, navigate]);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordMatch(newPassword, confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        checkPasswordMatch(password, newConfirmPassword);
    };

    const checkPasswordMatch = (password, confirmPassword) => {
        setPasswordMatch(password === confirmPassword || confirmPassword === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (passwordMatch && password && email) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("User registered:", userCredential.user);
                await sendEmailVerification(userCredential.user);
                console.log("Verification email sent.");
                setFormSubmitted(true);
            } catch (error) {
                console.error("Error registering user:", error);
            }
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
            <div className="bg-white border border-teal-500 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
                <p className="mb-6 text-gray-600">Create your account</p>
                {!formSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 block w-full px-3 py-2 border border-teal-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-teal-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="student-id" className="block text-sm font-medium text-gray-700">Student ID</label>
                            <input
                                type="text"
                                id="student-id"
                                className="mt-1 block w-full px-3 py-2 border border-teal-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full px-3 py-2 border border-teal-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                className={`mt-1 block w-full px-3 py-2 border ${passwordMatch ? 'border-teal-500' : 'border-red-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                            {!passwordMatch && confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                            )}
                        </div>
                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                id="terms"
                                className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                                required
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                I agree to the{' '}
                                <a href="#" className="text-teal-600 hover:underline">terms and conditions</a>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                            Sign Up
                        </button>
                        <p className="mt-4 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/login" className="text-teal-600 hover:underline">Log In</a>
                        </p>
                    </form>
                ) : (
                    <div className="text-center text-gray-600">
                        <p className="text-lg font-semibold">Check your email!</p>
                        <p className="mt-2">A verification email has been sent to your address.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUp;
