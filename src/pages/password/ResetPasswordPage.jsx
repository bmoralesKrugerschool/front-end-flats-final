import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useTheme } from '../../components/ThemeSwitcher';

const ResetPasswordPage = () => {
    const { themeMode } = useTheme();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [timeLeft, setTimeLeft] = useState(600);
    const [backgroundImage, setBackgroundImage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImage = async () => {
            const unsplashClientId = '2eICAWSF-EYZL2BumHCsX9C9DFsug-npLoFPQw01_Ok';
            const unsplashUrl = `https://api.unsplash.com/photos/random?query=house,apartment,indoor&client_id=${unsplashClientId}`;

            try {
                const response = await axios.get(unsplashUrl);
                setBackgroundImage(response.data.urls.regular);
            } catch (error) {
                console.error('Error fetching image from Unsplash:', error);
            }
        };

        fetchImage();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3006/api/v1/user/reset-password', { email, code, newPassword });
            alert('Contraseña restablecida con éxito.');
            navigate('/login');
        } catch (error) {
            alert('Error al restablecer la contraseña.');
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <Container maxWidth="lg" sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6' }}>
            <Box sx={{
                display: 'flex',
                width: '98%',
                height: '70vh',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
                color: themeMode === 'dark' ? '#FAF0E6' : '#352F44',
            }}>
                <Box sx={{
                    width: '50%',
                    height: '100%',
                    borderRadius: '10px 0 0 10px',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }} />

                <Box sx={{
                    width: '50%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                    borderRadius: '0 10px 10px 0',
                    bgcolor: themeMode === 'dark' ? '#5C5470' : '#B9B4C7',
                }}>
                    <Typography variant="h4" component="h1" sx={{ mb: 4, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                        Restablecer Contraseña
                    </Typography>
                    <Box textAlign="center" mb={4}>
                        <Typography variant="h6" sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>Tiempo restante: {formatTime(timeLeft)}</Typography>
                    </Box>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Correo Electrónico"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputLabelProps={{
                                style: { color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }
                            }}
                            InputProps={{
                                style: { color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }
                            }}
                            sx={{ mb: 3 }}
                            required
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Código de Verificación"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            InputLabelProps={{
                                style: { color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }
                            }}
                            InputProps={{
                                style: { color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }
                            }}
                            sx={{ mb: 3 }}
                            required
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Nueva Contraseña"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            InputLabelProps={{
                                style: { color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }
                            }}
                            InputProps={{
                                style: { color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }
                            }}
                            sx={{ mb: 3 }}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={timeLeft === 0}
                        >
                            Restablecer Contraseña
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    );
};

export default ResetPasswordPage;
