import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import img from '../components/Assets/33.avif';

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
    const [emailVerified, setEmailVerified] = useState(false);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    const requiredMiddlePart = '115';

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user && formSubmitted) {
                await user.reload();
                setEmailVerified(user.emailVerified);
            }
        });

        return () => unsubscribe();
    }, [auth, formSubmitted]);

    useEffect(() => {
        if (emailVerified && auth.currentUser) {
            const createProfile = async () => {
                await setDoc(doc(db, "users", auth.currentUser.uid), {
                    email,
                    studentId,
                    batch,
                    phoneNumber,
                    name
                });
                console.log("User profile created in Firestore after verification");
                navigate('/dashboard');
            };
            createProfile();
        }
    }, [emailVerified, auth.currentUser, email, studentId, batch, phoneNumber, name, navigate, db]); // Include db here

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordMatch(newPassword, confirmPassword);
        setPasswordLengthValid(newPassword.length >= 8);
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
        const idPattern = /^\d{3}-\d{3}-\d{3}$/;
        const isValid = idPattern.test(id) && id.split('-')[1] === requiredMiddlePart;
        setStudentIdValid(isValid);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordMatch && passwordLengthValid && password && email && studentIdValid && studentId && batch && phoneNumber) {
            try {
                setLoading(true);
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("User registered:", userCredential.user);

                // Send user data to your MongoDB backend
                await fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        studentId,
                        batch,
                        phoneNumber,
                        name
                    }),
                });

                // Send verification email
                await sendEmailVerification(userCredential.user);
                console.log("Verification email sent.");

                setFormSubmitted(true);
                setVerificationEmailSent(true);
            } catch (error) {
                console.error("Error registering user:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleBackClick = () => {
        navigate('/login');
    };

    return (
        <section className="relative bg-gradient-to-r from-blue-500 to-teal-500 py-20 text-white overflow-hidden flex items-center justify-center min-h-screen">
            <div className="absolute inset-0 bg-cover bg-center opacity-30">
                <img src={img} alt="background img" className="h-full w-full object-cover" style={{ minHeight: '100vh' }} />
            </div>
            
            <div className="relative z-10 bg-black bg-opacity-20 border border-teal-500 p-6 rounded-lg shadow-lg w-full max-w-md h-fit overflow-hidden">
                <MdArrowBack 
                    className="text-black text-2xl cursor-pointer mb-4 hover:scale-110 transition-transform" 
                    onClick={handleBackClick}
                />
                
                <h1 className="text-2xl font-bold text-white text-center">Sign Up</h1>
                <p className="mb-1 text-black font-bold text-center">Create your account</p>
                {!formSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-white">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block text-black w-full px-3 py-2 border border-teal-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block text-black w-full px-3 py-2 border border-teal-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="student-id" className="block text-sm font-medium text-white">Student ID (Format: XXX-XXX-XXX)</label>
                            <input
                                type="text"
                                id="student-id"
                                value={studentId}
                                onChange={handleStudentIdChange}
                                className={`mt-1 block text-black w-full px-3 py-2 border ${studentIdValid ? 'border-teal-500' : 'border-red-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                                required
                            />
                            {!studentIdValid && (
                                <p className="text-red-500 text-sm mt-1">You are not selected for Registration.</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="batch" className="block text-sm font-medium text-white">Batch</label>
                            <input
                                type="text"
                                id="batch"
                                value={batch}
                                onChange={(e) => setBatch(e.target.value)}
                                className="mt-1 block text-black w-full px-3 py-2 border border-teal-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone-number" className="block text-sm font-medium text-white">Phone Number</label>
                            <input
                                type="text"
                                id="phone-number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="mt-1 block text-black w-full px-3 py-2 border border-teal-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={`mt-1 block text-black w-full px-3 py-2 border ${!passwordLengthValid ? 'border-red-500' : 'border-teal-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                                required
                            />
                            {!passwordLengthValid && (
                                <p className="text-red-500 text-sm mt-1">Password must be at least 8 characters.</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-white">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className={`mt-1 block text-black w-full px-3 py-2 border ${!passwordMatch && confirmPassword ? 'border-red-500' : 'border-teal-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                                required
                            />
                            {!passwordMatch && (
                                <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Sign Up'}
                        </button>
                    </form>
                ) : (
                    <div className="relative flex items-center justify-center h-full z-20">
                        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${img})`, minHeight: '100vh' }} />
                        <div className="relative z-10 p-4 bg-white rounded-lg shadow-lg max-w-md w-full">
                            <p className="text-gray-700">Verification email sent!</p>
                            {verificationEmailSent && (
                                <p className="text-gray-700 mt-2">Please check {email} to verify your account. Verify your email before logging in.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SignUp;
