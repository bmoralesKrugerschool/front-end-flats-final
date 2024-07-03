import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { login as loginUser } from '../servers/auth';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [backendMessage, setBackendMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      console.log(response);

      if (response.code === 200) {
        navigate('/profile');
        setBackendMessage(response.message);
        localStorage.setItem('token', response.token);
      } else {
        console.log('ingreso', response);
        setBackendMessage(response.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setBackendMessage('An error occurred during login. Please try again.');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#352F44] p-4">
      <div className="bg-[#5C5470] w-full max-w-md p-10 rounded-md shadow-md">
        <h2 className="text-2xl text-center text-[#FAF0E6] mb-4">LOGIN</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#B9B4C7] mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-[#B9B4C7]" />
              <input
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Invalid email address'
                  }
                })}
                placeholder="Email"
                className={`w-full bg-[#9B4C7] text-[#B9B4C7] px-10 py-2 rounded-md ${errors.email ? 'border border-red-500' : ''}`}
              />
            </div>
            {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-[#B9B4C7] mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-[#B9B4C7]" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                })}
                placeholder="Password"
                className={`w-full bg-[#9B4C7] text-[#B9B4C7] px-10 py-2 rounded-md ${errors.password ? 'border border-red-500' : ''}`}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-[#B9B4C7]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full bg-[#B9B4C7] text-[#413c4e] px-4 py-2 rounded-md hover:bg-[#413c4e] hover:text-[#FAF0E6] transition-colors duration-200">Login</button>
        </form>
        
        <button
          type="button"
          className="w-full mt-4 bg-[#B9B4C7] text-[#413c4e] px-4 py-2 rounded-md hover:bg-[#413c4e] hover:text-[#FAF0E6] transition-colors duration-200"
          onClick={goToRegister}
        >
          Register
        </button>
        {backendMessage && <p className="text-red-500 mt-4">{backendMessage}</p>}
      </div>
      
    </div>
  );
}

export default LoginPage;
