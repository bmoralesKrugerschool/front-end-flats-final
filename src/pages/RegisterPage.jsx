import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaLock, FaBirthdayCake, FaEye, FaEyeSlash, FaAdjust } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, TextField, Typography, Container, Grid, IconButton } from '@mui/material';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [backendMessage, setBackendMessage] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [themeMode, setThemeMode] = useState('auto');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme || (prefersDarkMode ? 'dark' : 'light');

    setThemeMode(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleThemeMode = () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : themeMode === 'dark' ? 'auto' : 'light';
    setThemeMode(newThemeMode);
    document.documentElement.classList.toggle('dark', newThemeMode === 'dark');
    localStorage.setItem('theme', newThemeMode);
  };

  const onSubmit = async (data) => {
    try {
      const formattedBirthdate = data.birthDate.replace(/-/g, '/');
      const modifiedData = { ...data, birthDate: formattedBirthdate };

      const response = await signUp(modifiedData);
      setBackendMessage(response.message);
      if (response.data && response.data.token) {
        navigate('/flats');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setBackendMessage(error.message);
    }
  };

  const validateAge = (value) => {
    const today = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18;
  };

  const goToLogin = () => {
    navigate('/');
  };

  const themeButtonText = {
    light: 'Switch to Dark Mode',
    dark: 'Switch to Light Mode',
    auto: 'Switch to Auto Mode'
  }[themeMode];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 font-sans">
      <Container maxWidth="sm">
        <div className="bg-gray-800 w-full max-w-md p-10 rounded-md shadow-md">
          <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
            REGISTER
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  {...register('name', { required: 'First name is required' })}
                  label="First Name"
                  fullWidth
                  variant="filled"
                  className={`mb-4 ${errors.name ? 'border border-red-500' : ''}`}
                  InputProps={{
                    startAdornment: <FaUser className="text-gray-400" />
                  }}
                  error={!!errors.name}
                  helperText={errors.name && errors.name.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="lastName"
                  {...register('lastName', { required: 'Last name is required' })}
                  label="Last Name"
                  fullWidth
                  variant="filled"
                  className={`mb-4 ${errors.lastName ? 'border border-red-500' : ''}`}
                  InputProps={{
                    startAdornment: <FaUser className="text-gray-400" />
                  }}
                  error={!!errors.lastName}
                  helperText={errors.lastName && errors.lastName.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Invalid email address'
                    }
                  })}
                  label="Email"
                  fullWidth
                  variant="filled"
                  className={`mb-4 ${errors.email ? 'border border-red-500' : ''}`}
                  InputProps={{
                    startAdornment: <FaEnvelope className="text-gray-400" />
                  }}
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long'
                    }
                  })}
                  label="Password"
                  fullWidth
                  variant="filled"
                  className={`mb-4 ${errors.password ? 'border border-red-500' : ''}`}
                  InputProps={{
                    startAdornment: <FaLock className="text-gray-400" />,
                    endAdornment: (
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                      </IconButton>
                    )
                  }}
                  error={!!errors.password}
                  helperText={errors.password && errors.password.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="birthDate"
                  type="date"
                  {...register('birthDate', {
                    required: 'Birthdate is required',
                    validate: value => validateAge(value) || 'You must be at least 18 years old'
                  })}
                  label="Birthdate"
                  fullWidth
                  variant="filled"
                  className={`mb-4 ${errors.birthDate ? 'border border-red-500' : ''}`}
                  InputProps={{
                    startAdornment: <FaBirthdayCake className="text-gray-400" />
                  }}
                  error={!!errors.birthDate}
                  helperText={errors.birthDate && errors.birthDate.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="role"
                  select
                  {...register('role', { required: 'Role is required' })}
                  label="Role"
                  fullWidth
                  variant="filled"
                  className={`mb-4 ${errors.role ? 'border border-red-500' : ''}`}
                  InputProps={{
                    startAdornment: <FaUser className="text-gray-400" />
                  }}
                  error={!!errors.role}
                  helperText={errors.role && errors.role.message}
                >
                  <option value="">Select Role</option>
                  <option value="landlord">Landlord</option>
                  <option value="renter">Renter</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" color="primary">
                  Create your user
                </Button>
              </Grid>
            </Grid>
          </form>
          
          <Button
            type="button"
            fullWidth
            variant="outlined"
            onClick={goToLogin}
            className="mb-4"
          >
            Login
          </Button>
          
          <div className="flex justify-center">
            <Button variant="text" onClick={toggleThemeMode} startIcon={<FaAdjust className="mr-2" />}>
              {themeButtonText}
            </Button>
          </div>
          
          {backendMessage && <Typography variant="body2" color="error" className="mt-4">{backendMessage}</Typography>}
        </div>
      </Container>
    </div>
  );
}

export default RegisterPage;
