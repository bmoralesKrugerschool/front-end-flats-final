// src/pages/SendCodePage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h1>Enviar Código de Verificación</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Enviar Código</button>
            </form>
        </div>
    );
};

export default SendCodePage;
