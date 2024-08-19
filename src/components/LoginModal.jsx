import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ open, onClose, onLoginSuccess }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:3006/api/v1/user/login', { email, password });
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      signIn({ email, password }).then(() => {
        onLoginSuccess();
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={() => {}} fullWidth maxWidth="sm" PaperProps={{ style: { zIndex: 1300 } }}>
      <DialogTitle>Iniciar Sesión</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        {loading && <CircularProgress />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancelar</Button>
        <Button onClick={handleLogin} color="primary" variant="contained">Iniciar Sesión</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
