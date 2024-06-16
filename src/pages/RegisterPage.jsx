import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm();
  const [errorTimeouts, setErrorTimeouts] = useState({});

  const onSubmit = data => {
    console.log(data);
  };

  useEffect(() => {
    Object.keys(errors).forEach((field) => {
      if (!errorTimeouts[field]) {
        const timeout = setTimeout(() => {
          clearErrors(field);
          setErrorTimeouts((prevTimeouts) => {
            const updatedTimeouts = { ...prevTimeouts };
            delete updatedTimeouts[field];
            return updatedTimeouts;
          });
        }, 1000);
        
        setErrorTimeouts((prevTimeouts) => ({
          ...prevTimeouts,
          [field]: timeout,
        }));
      }
    });

    // Clear timeouts on unmount
    return () => {
      Object.values(errorTimeouts).forEach(clearTimeout);
    };
  }, [errors, clearErrors, errorTimeouts]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-900 p-4">
      <div className="bg-zinc-800 w-full max-w-md p-10 rounded-md shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white mb-2">First Name</label>
            <input 
              id="name"
              {...register('name', { required: 'First name is required' })}
              placeholder="First Name"
              className={`w-full bg-zinc-700 text-white px-4 py-2 rounded-md ${errors.name ? 'border border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-white mb-2">Last Name</label>
            <input 
              id="lastName"
              {...register('lastName', { required: 'Last name is required' })}
              placeholder="Last Name"
              className={`w-full bg-zinc-700 text-white px-4 py-2 rounded-md ${errors.lastName ? 'border border-red-500' : ''}`}
            />
            {errors.lastName && <p className="text-red-500 mt-1">{errors.lastName.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">Email</label>
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
              className={`w-full bg-zinc-700 text-white px-4 py-2 rounded-md ${errors.email ? 'border border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-2">Password</label>
            <input 
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              placeholder="Password"
              className={`w-full bg-zinc-700 text-white px-4 py-2 rounded-md ${errors.password ? 'border border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-900 transition-colors duration-200">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
