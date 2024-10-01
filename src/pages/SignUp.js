import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md'; // Import the back icon
import img from '../components/Assets/33.avif'; // Keep the image import for other uses

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [verificationEmailSent, setVerificationEmailSent] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [batch, setBatch] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [studentIdValid, setStudentIdValid] = useState(true);
    const [passwordLengthValid, setPasswordLengthValid] = useState(true);
    const [emailVerified, setEmailVerified] = useState(false); // New state for email verification
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    // Required middle part of student ID for validation
    const requiredMiddlePart = '115';

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user && formSubmitted) {
                await user.reload(); // Reload user data to check verification status
                setEmailVerified(user.emailVerified); // Set email verification status
            }
        });

        return () => unsubscribe();
    }, [auth, formSubmitted]);

    useEffect(() => {
        if (emailVerified) {
            // Create the Firestore user profile after email verification
            const createProfile = async () => {
                await setDoc(doc(db, "users", auth.currentUser.uid), {
                    email,
                    studentId,
                    batch,
                    phoneNumber,
                });
                console.log("User profile created in Firestore after verification");
                // Navigate to dashboard or another route
                navigate('/dashboard');
            };
            createProfile();
        }
    }, [emailVerified, auth.currentUser, email, studentId, batch, phoneNumber, navigate]);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordMatch(newPassword, confirmPassword);
        setPasswordLengthValid(newPassword.length >= 8); // Check password length
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        checkPasswordMatch(password, newConfirmPassword);
    };

    const checkPasswordMatch = (password, confirmPassword) => {
        setPasswordMatch(password === confirmPassword || confirmPassword === '');
    };

    const handleStudentIdChange = (e) => {
        const newStudentId = e.target.value;
        setStudentId(newStudentId);
        validateStudentId(newStudentId);
    };

    const validateStudentId = (id) => {
        const idPattern = /^\d{3}-\d{3}-\d{3}$/; // Pattern for XXX-115-XXX
        const isValid = idPattern.test(id) && id.split('-')[1] === requiredMiddlePart;
        setStudentIdValid(isValid);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordMatch && passwordLengthValid && password && email && studentIdValid && studentId && batch && phoneNumber) {
            try {
                // Create user account first
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("User registered:", userCredential.user);

                // Send verification email
                await sendEmailVerification(userCredential.user);
                console.log("Verification email sent.");

                setFormSubmitted(true);
                setVerificationEmailSent(true); // Set flag to true
            } catch (error) {
                console.error("Error registering user:", error);
            }
        }
    };

    // Function to handle back navigation to login page
    const handleBackClick = () => {
        navigate('/login');
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${img})` }}>
            {/* Back Icon positioned absolutely */}
            <MdArrowBack 
                className="absolute top-5 left-5 text-2xl cursor-pointer text-white z-20" 
                onClick={handleBackClick} 
            />
            <div className="relative z-10 mt-20 bg-white border border-teal-500 p-6 rounded-lg shadow-lg w-full max-w-md">
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
                            <label htmlFor="student-id" className="block text-sm font-medium text-gray-700">Student ID (Format: XXX-XXX-XXX)</label>
                            <input
                                type="text"
                                id="student-id"
                                value={studentId}
                                onChange={handleStudentIdChange}
                                className={`mt-1 block w-full px-3 py-2 border ${studentIdValid ? 'border-teal-500' : 'border-red-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                                required
                            />
                            {!studentIdValid && (
                                <p className="text-red-500 text-sm mt-1">Invalid Student ID format or middle part does not match.</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="batch" className="block text-sm font-medium text-gray-700">Batch</label>
                            <input
                                type="text"
                                id="batch"
                                value={batch}
                                onChange={(e) => setBatch(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-teal-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-teal-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                id="password"
                                className={`mt-1 block w-full px-3 py-2 border ${passwordLengthValid ? 'border-teal-500' : 'border-red-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            {!passwordLengthValid && (
                                <p className="text-red-500 text-sm mt-1">Password must be at least 8 characters long.</p>
                            )}
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
                            {!passwordMatch && (
                                <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                        >
                            Sign Up
                        </button>
                    </form>
                ) : (
                    <div>
                        {verificationEmailSent ? (
                            <p className="text-teal-500">Verification email sent. Please check your inbox and verify your email before proceeding.</p>
                        ) : (
                            <p className="text-red-500">An error occurred while sending the verification email. Please try again.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUp;
