import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaLock, FaBirthdayCake } from 'react-icons/fa';

function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm();
  const [errorTimeouts, setErrorTimeouts] = useState({});

  const onSubmit = data => {
    console.log(data);
  };

  const validateAge = (value) => {
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
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
        }, 5000);

        setErrorTimeouts((prevTimeouts) => ({
          ...prevTimeouts,
          [field]: timeout,
        }));
      }
    });

    return () => {
      Object.values(errorTimeouts).forEach(clearTimeout);
    };
  }, [errors, clearErrors, errorTimeouts]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#352F44] p-4">
      <div className="bg-[#5C5470] w-full max-w-md p-10 rounded-md shadow-md">
        <h2 className="text-2xl text-center text-[#FAF0E6] mb-4">REGISTER</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-[#B9B4C7] mb-2">First Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-[#B9B4C7]" />
              <input
                id="name"
                {...register('name', { required: 'First name is required' })}
                placeholder="First Name"
                className={`w-full bg-[#9B4C7] text-[#B9B4C7] px-10 py-2 rounded-md ${errors.name ? 'border border-red-500' : ''}`}
              />
            </div>
            {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-[#B9B4C7] mb-2">Last Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-[#B9B4C7]" />
              <input
                id="lastName"
                {...register('lastName', { required: 'Last name is required' })}
                placeholder="Last Name"
                className={`w-full bg-[#9B4C7] text-[#B9B4C7] px-10 py-2 rounded-md ${errors.lastName ? 'border border-red-500' : ''}`}
              />
            </div>
            {errors.lastName && <p className="text-red-500 mt-1">{errors.lastName.message}</p>}
          </div>

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
                type="password"
                {...register('password', { required: 'Password is required' })}
                placeholder="Password"
                className={`w-full bg-[#9B4C7] text-[#B9B4C7] px-10 py-2 rounded-md ${errors.password ? 'border border-red-500' : ''}`}
              />
            </div>
            {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="birthdate" className="block text-[#B9B4C7] mb-2">Birthdate</label>
            <div className="relative">
              <FaBirthdayCake className="absolute left-3 top-3 text-[#B9B4C7]" />
              <input
                id="birthdate"
                type="date"
                {...register('birthdate', {
                  required: 'Birthdate is required',
                  validate: value => validateAge(value) || 'You must be at least 18 years old'
                })}
                className={`w-full bg-[#9B4C7] text-[#B9B4C7] px-10 py-2 rounded-md ${errors.birthdate ? 'border border-red-500' : ''}`}
              />
            </div>
            {errors.birthdate && <p className="text-red-500 mt-1">{errors.birthdate.message}</p>}
          </div>

          <button type="submit" className="w-full bg-[#B9B4C7] text-[#413c4e] px-4 py-2 rounded-md hover:bg-[#413c4e] hover:text-[#FAF0E6] transition-colors duration-200">Crear tu Cuenta</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
