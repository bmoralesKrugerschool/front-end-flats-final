// src/pages/SendCodePage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const SendCodePage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3006/api/v1/user/send-verification-code', { email });
            alert('Código de verificación enviado a su correo.');
            navigate('/reset-password');
        } catch (error) {
            alert('Error al enviar el código de verificación.');
        }
    };

    return (
        <Container maxWidth="sm" className="mt-10 p-4 bg-white rounded shadow">
            <Box textAlign="center" mb={4}>
                <Typography variant="h4">Enviar Código de Verificación</Typography>
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
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Enviar Código
                </Button>
            </form>
        </Container>
    );
};

export default SendCodePage;
