// src/pages/SendCodePage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Snackbar, Alert } from '@mui/material';
import { useTheme } from '../../components/ThemeSwitcher'; // Ajusta la ruta según tu estructura de carpetas

const SendCodePage = () => {
    const [email, setEmail] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' or 'error'
    const navigate = useNavigate();
    const { themeMode } = useTheme(); // Obtener el modo de tema actual

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3006/api/v1/user/send-verification-code', { email });
            setAlertMessage('Código de verificación enviado a su correo.');
            setAlertSeverity('success');
        } catch (error) {
            setAlertMessage('Error al enviar el código de verificación.');
            setAlertSeverity('error');
        }
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        if (alertSeverity === 'success') {
            navigate('/reset-password');
        }
    };

    // Definir colores según el modo de tema
    const containerBgColor = themeMode === 'dark' ? '#5C5470' : '#B9B4C7';
    const textColor = themeMode === 'dark' ? '#FAF0E6' : '#352F44';
    const buttonColor = themeMode === 'dark' ? '#FAF0E6' : '#352F44';
    const buttonHoverColor = themeMode === 'dark' ? '#E5D4ED' : '#5C5470';

    return (
        <Container
            maxWidth="sm"
            sx={{
                mt: 10,
                p: 4,
                bgcolor: containerBgColor,
                borderRadius: 2,
                boxShadow: 3,
                color: textColor,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
            }}
        >
            <Box textAlign="center" mb={4}>
                <Typography variant="h4" sx={{ color: textColor }}>
                    Enviar Código de Verificación
                </Typography>
            </Box>
            <form onSubmit={handleSubmit} className="space-y-4" style={{ width: '100%' }}>
                <TextField
                    label="Correo Electrónico"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    InputProps={{
                        sx: { color: textColor }, // Ajusta el color del texto del campo
                    }}
                    InputLabelProps={{
                        sx: { color: textColor }, // Ajusta el color de la etiqueta del campo
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: textColor,
                            },
                            '&:hover fieldset': {
                                borderColor: buttonHoverColor,
                            },
                        },
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        bgcolor: buttonColor,
                        color: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
                        '&:hover': {
                            bgcolor: buttonHoverColor,
                        },
                    }}
                    fullWidth
                >
                    Enviar Código
                </Button>
            </form>

            {/* Snackbar para mostrar alertas */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                action={
                    <Button color="inherit" onClick={handleCloseSnackbar}>
                        Cerrar
                    </Button>
                }
            >
                <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default SendCodePage;
