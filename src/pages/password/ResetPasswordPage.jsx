// src/pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3006/api/v1/user/reset-password', { email, code, newPassword });
            alert('Contraseña restablecida con éxito.');
        } catch (error) {
            alert('Error al restablecer la contraseña.');
        }
    };

    return (
        <div>
            <h1>Restablecer Contraseña</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Ingrese el código de verificación"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Ingrese su nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Restablecer Contraseña</button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
