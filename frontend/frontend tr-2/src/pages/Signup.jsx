import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Signup.css'; // Your existing CSS
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define the Zod schema
const schema = z.object({
  name: z.string().min(1, "Name is required").max(40, "Name cannot exceed 40 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone must be 10 digits").max(10, "Phone cannot exceed 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters long").regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  ),
});

function AuthForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema), // Connect Zod with react-hook-form
  });
  const [isSignUp, setIsSignUp] = useState(false);

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleForgotPassword = () => {
    alert('A password reset link has been sent to your email.');
  };

  return (
    
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input {...register('name')} type="text" placeholder="Name" />
          {errors.name && <p className='err-p'>{errors.name.message}</p>}

          <input {...register('email')} type="email" placeholder="Email" />
          {errors.email && <p className='err-p'>{errors.email.message}</p>}

          <input {...register('phone')} type="text" placeholder="Phone" />
          {errors.phone && <p className='err-p'>{errors.phone.message}</p>}

          <input {...register('password')} type="password" placeholder="Password" />
          {errors.password && <p className='err-p'>{errors.password.message}</p>}

          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <input {...register('email')} type="email" placeholder="Email" />
          {errors.email && <p className='err-p'>{errors.email.message}</p>}

          <input {...register('password')} type="password" placeholder="Password" />
          {errors.password && <p className='err-p'>{errors.password.message}</p>}

          <a href="#" id="forgotPassword" onClick={handleForgotPassword}>Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p className='par'>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p className='par'>Enter your personal details and start your journey with us</p>
            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
