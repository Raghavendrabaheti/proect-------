import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; // Zod schema validation library
import axios from 'axios'; // For handling API requests
import { toast } from 'sonner'; // For notifications
import { useDispatch } from 'react-redux'; // For dispatching Redux actions
import { Signup, Register } from '../redux/userSlice'; // Redux actions
import './Signup.css'; // Your CSS file for styling

// Define the Zod schema for validation
const schema = z.object({
    name: z.string().min(1, "Name is required").max(40, "Name can't exceed 40 characters"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(10, "Phone is required"),
    password: z.string().min(8, "Password is too short")
        .regex(/[0-9]/, "Password must contain a number")
        .regex(/[a-z]/, "Password must have a lowercase letter")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/[\w_]/, "Password must contain a special symbol")
});

function AuthForm() {
    // Hook to manage form switching (Sign In / Sign Up)
    const [isSignUp, setIsSignUp] = useState(false);

    // Redux dispatch to send actions
    const dispatch = useDispatch();

    // React Hook Form setup with Zod resolver for validation
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema), // Connects Zod schema to form
    });

    // Handle sign-up form submission
    const onSubmitSignUp = (data) => {
        try {
            dispatch(Signup(data)); // Dispatch signup action to Redux
            toast.success('Registration successful!'); // Show success message
            reset(); // Clear form after submission
        } catch (error) {
            toast.error('Registration failed!'); // Show error message
        }
    };

    // Handle sign-in form submission
    const onSubmitSignIn = async (data) => {
        try {
            const res = await axios.post('http://localhost:3000/api/login', data); // Post request for login
            toast.success('Login successful!'); // Show success message
            reset(); // Clear form after successful login
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed!'); // Show error message
        }
    };

    // Switch to Sign-Up form
    const handleSignUpClick = () => {
        setIsSignUp(true); // Update state to show sign-up form
    };

    // Switch to Sign-In form
    const handleSignInClick = () => {
        setIsSignUp(false); // Update state to show sign-in form
    };

    // Handle forgot password action
    const handleForgotPassword = () => {
        alert('A password reset link has been sent to your email.');
    };

    return (
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
            {/* Sign Up form */}
            <div className="form-container sign-up-container">
                <form onSubmit={handleSubmit(onSubmitSignUp)}>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>

                    {/* Name input */}
                    <input {...register('name')} type="text" placeholder="Name" />
                    {errors.name && <p className="err-p">{errors.name.message}</p>}

                    {/* Email input */}
                    <input {...register('email')} type="email" placeholder="Email" />
                    {errors.email && <p className="err-p">{errors.email.message}</p>}

                    {/* Phone input */}
                    <input {...register('phone')} type="text" placeholder="Phone" />
                    {errors.phone && <p className="err-p">{errors.phone.message}</p>}

                    {/* Password input */}
                    <input {...register('password')} type="password" placeholder="Password" />
                    {errors.password && <p className="err-p">{errors.password.message}</p>}

                    {/* Submit button for sign-up */}
                    <button type="submit">Sign Up</button>
                </form>
            </div>

            {/* Sign In form */}
            <div className="form-container sign-in-container">
                <form onSubmit={handleSubmit(onSubmitSignIn)}>
                    <h1>Sign In</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your account</span>

                    {/* Email input */}
                    <input {...register('email')} type="email" placeholder="Email" />
                    {errors.email && <p className="err-p">{errors.email.message}</p>}

                    {/* Password input */}
                    <input {...register('password')} type="password" placeholder="Password" />
                    {errors.password && <p className="err-p">{errors.password.message}</p>}

                    <a href="#" onClick={handleForgotPassword}>Forgot your password?</a>
                    <button type="submit">Sign In</button>
                </form>
            </div>

            {/* Overlay for switching between Sign In and Sign Up */}
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p className="par">To keep connected with us please login with your personal info</p>
                        <button className="ghost" onClick={handleSignInClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p className="par">Enter your personal details and start your journey with us</p>
                        <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
