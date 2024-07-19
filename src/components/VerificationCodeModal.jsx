import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const VerificationCodeModal = ({ open, onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3006/api/v1/user/send-verification-code', { email });
            setMessage('Verification code sent to your email.');
        } catch (error) {
            setMessage('Error sending verification code.');
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="verification-code-modal-title"
            aria-describedby="verification-code-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
            }}>
                <Typography id="verification-code-modal-title" variant="h6" component="h2">
                    Request Verification Code
                </Typography>
                <form onSubmit={handleSubmit} style={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Send Code
                    </Button>
                    {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
                </form>
            </Box>
        </Modal>
    );
};

export default VerificationCodeModal;
