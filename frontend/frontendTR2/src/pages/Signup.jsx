import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Signup.css'; // Make sure this has your CSS
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'sonner';
import { Signup } from '../redux/userSlice';

// Define the Zod schema for validation
const schema = z.object({
    name: z.string().min(1, "Name is required").max(40, "Name can not exceed 40 characters"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(10, "Phone is required"),
    password: z.string().min(8, "Password is too short")
        .regex(/[0-9]/, "Password must contain a number")
        .regex(/[a-z]/, "Password must have one lowercase")
        .regex(/[A-Z]/, "Password must contain an uppercase")
        .regex(/[\w_]/, "Password must contain a special symbol")
});

function AuthForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema), // Connect Zod with react-hook-form
    });
    const [isSignUp, setIsSignUp] = useState(false);

    // Handle the sign-up form submission
        const onSubmit =(data) => {
            console.log('submit is running');
            dispatch(Signup(data));
    };

    // Handle the sign-in form submission
    const onSubmitSignIn = async (data) => {
        try {
            console.log(data);
            const res = await axios.post('http://localhost:3000/api/login', data);
            console.log(res);
            toast.success('Login successful');
            reset(); // Clear form after successful login
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    // Handle switching between Sign-In and Sign-Up forms
    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    const handleSignInClick = () => {
        setIsSignUp(false); // Fix: Set to false to switch to Sign-In form
    };

    // Handle forgot password click
    const handleForgotPassword = () => {
        alert('A password reset link has been sent to your email.');
    };

    return (
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={handleSubmit(onSubmitSignUp)}>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    
                    {/* Name Field */}
                    <input {...register('name')} type="text" placeholder="Name" />
                    {errors.name && <p className="err-p">{errors.name.message}</p>}
                    
                    {/* Email Field */}
                    <input {...register('email')} type="email" placeholder="Email" />
                    {errors.email && <p className="err-p">{errors.email.message}</p>}
                    
                    {/* Phone Field */}
                    <input {...register('phone')} type="text" placeholder="Phone" />
                    {errors.phone && <p className="err-p">{errors.phone.message}</p>}
                    
                    {/* Password Field */}
                    <input {...register('password')} type="password" placeholder="Password" />
                    {errors.password && <p className="err-p">{errors.password.message}</p>}
                    
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            
            <div className="form-container sign-in-container">
                <form onSubmit={handleSubmit(onSubmitSignIn)}>
                    <h1>Sign In</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your account</span>
                    
                    {/* Email Field */}
                    <input {...register('email')} type="email" placeholder="Email" />
                    {errors.email && <p className="err-p">{errors.email.message}</p>}
                    
                    {/* Password Field */}
                    <input {...register('password')} type="password" placeholder="Password" />
                    {errors.password && <p className="err-p">{errors.password.message}</p>}
                    
                    <a href="#" id="forgotPassword" onClick={handleForgotPassword}>Forgot your password?</a>
                    <button type="submit">Sign In</button>
                </form>
            </div>
            
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p className="par">To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p className="par">Enter your personal details and start your journey with us</p>
                        <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
