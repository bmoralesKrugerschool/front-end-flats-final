import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [timeLeft, setTimeLeft] = useState(600); // 600 seconds = 10 minutes
    const navigate = useNavigate();

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
        <Container maxWidth="sm" className="mt-10 p-4 bg-white rounded shadow">
            <Box textAlign="center" mb={4}>
                <Typography variant="h4">Restablecer Contraseña</Typography>
            </Box>
            <Box textAlign="center" mb={4}>
                <Typography variant="h6">Tiempo restante: {formatTime(timeLeft)}</Typography>
            </Box>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    label="Correo Electrónico"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Código de Verificación"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
                <TextField
                    label="Nueva Contraseña"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
        </Container>
    );
};

export default ResetPasswordPage;
