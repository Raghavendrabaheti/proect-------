import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'sonner';
import './Signup.css';
import { useDispatch , useSelector} from 'react-redux';
import { Signup } from '../redux/userSlice';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// Define Zod schemas for validation
const registerSchema = z.object({
    name: z.string().min(1, "Name is required").max(40, "Name can't exceed 40 characters"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(10, "Phone is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

function AuthForm() {
    const [isRegistering, setIsRegistering] = useState(false);

    // Choose the schema based on isRegistering state
    const schema = isRegistering ? registerSchema : loginSchema;

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
    });

    // Unified submit handler
    const onSubmit = async (data) => {
        // console.log(data);
          if (schema==loginSchema) {
            try {
              const response = await axios.post('http://localhost:3000/api/login',data);
              toast.success("User Logged in Successfully");
            //   navigate("/");
            } catch (error) {
              toast.error(error.response.data);
            }
          }
          else if (schema==registerSchema){
            try {
              const response = await axios.post('http://localhost:3000/api/register',data);
              toast.success("User registered Successfully");
            //   navigate("/");
            } catch (error) {
              toast.error(error.response.data);
            }
          }
      };

    // Toggle between Sign In and Sign Up form
    const handleToggle = () => {
        setIsRegistering(!isRegistering);
        reset(); // Reset form fields when toggling forms
    };

    return (
        <div className={`container ${isRegistering ? 'right-panel-active' : ''}`} id="container">
            {/* Sign Up Form */}
            <div className="form-container sign-up-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Create Account</h1>
                    <span>or use your email for registration</span>

                    {isRegistering && (
                        <>
                            <input {...register('name')} type="text" placeholder="Name" />
                            {errors.name && <p className="err-p">{errors.name.message}</p>}

                            <input {...register('phone')} type="text" placeholder="Phone" />
                            {errors.phone && <p className="err-p">{errors.phone.message}</p>}
                        </>
                    )}

                    <input {...register('email')} type="email" placeholder="Email" />
                    {errors.email && <p className="err-p">{errors.email.message}</p>}

                    <input {...register('password')} type="password" placeholder="Password" />
                    {errors.password && <p className="err-p">{errors.password.message}</p>}

                    <button type="submit">{isRegistering ? "Sign Up" : "Sign In"}</button>
                </form>
            </div>

            {/* Sign In Form */}
            <div className="form-container sign-in-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Sign In</h1>
                    <span>or use your account</span>

                    {!isRegistering && (
                        <>
                            <input {...register('email')} type="email" placeholder="Email" />
                            {errors.email && <p className="err-p">{errors.email.message}</p>}

                            <input {...register('password')} type="password" placeholder="Password" />
                            {errors.password && <p className="err-p">{errors.password.message}</p>}
                        </>
                    )}

                    <button type="submit">{isRegistering ? "Sign Up" : "Sign In"}</button>
                </form>
            </div>

            {/* Toggle Button */}
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" onClick={handleToggle}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start your journey with us</p>
                        <button className="ghost" onClick={handleToggle}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
