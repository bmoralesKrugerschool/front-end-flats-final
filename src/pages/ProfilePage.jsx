import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Box, Typography, TextField, Button, Avatar, Link, Grid, MenuItem, Select, InputLabel } from '@mui/material';
import { useTheme } from '../components/ThemeSwitcher';
import VerificationCodeModal from '../components/VerificationCodeModal';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { themeMode } = useTheme();
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        birthDate: '',
        role: '',
        avatar: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                lastName: user.lastName || '',
                email: user.email || '',
                birthDate: user.birthDate || '',
                role: user.role || '',
                avatar: user.avatar || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'avatar' && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prevState => ({ ...prevState, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            await updateProfile(formData);
            setIsEditing(false);
            setErrors({});
        } catch (error) {
            console.error('Failed to update profile:', error);
            // Manejo de errores adicionales si es necesario
        }
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleChangePassword = () => navigate('/send-code'); // Redirige a SendCodePage

    return (
        <Container maxWidth="sm" sx={{ 
            bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
        }}>
            <Box sx={{ p: 4, bgcolor: themeMode === 'dark' ? '#5C5470' : '#B9B4C7', borderRadius: 2, boxShadow: 3, width: '100%', maxWidth: '600px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar src={formData.avatar} sx={{ width: 100, height: 100, mr: 2 }} />
                    {isEditing ? (
                        <input type="file" name="avatar" accept="image/*" onChange={handleChange} />
                    ) : (
                        <Typography variant="h6" sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                            User ID: {user?.id}
                        </Typography>
                    )}
                </Box>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="First Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                sx={{ mb: 3 }}
                                disabled={!isEditing}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                sx={{ mb: 3 }}
                                disabled={!isEditing}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                sx={{ mb: 3 }}
                                disabled={!isEditing}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button onClick={handleChangePassword} variant="outlined" color="primary" sx={{ mb: 3 }} disabled={!isEditing}>
                                Change Password
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Birth Date"
                                name="birthDate"
                                type="date"
                                value={formData.birthDate}
                                onChange={handleChange}
                                sx={{ mb: 3 }}
                                InputLabelProps={{ shrink: true }}
                                disabled={!isEditing}
                                error={!!errors.birthDate}
                                helperText={errors.birthDate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Role</InputLabel>
                            <Select
                                fullWidth
                                variant="outlined"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                sx={{ mb: 3 }}
                                disabled={!isEditing}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="landlord">Landlord</MenuItem>
                                <MenuItem value="renter">Renter</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    {isEditing ? (
                        <Button type="submit" variant="contained" color="primary" sx={{ mb: 3 }}>
                            Save Changes
                        </Button>
                    ) : (
                        <Button onClick={() => setIsEditing(true)} variant="contained" color="secondary" sx={{ mb: 3 }}>
                            Edit Profile
                        </Button>
                    )}
                </form>
                {user?.role === 'admin' && (
                    <Link href="/admin" variant="body2" sx={{ display: 'block', mb: 3, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                        Go to Admin Panel
                    </Link>
                )}
                <Button onClick={handleOpenModal} variant="outlined" color="error">
                    Delete Account
                </Button>
            </Box>
            <VerificationCodeModal open={openModal} onClose={handleCloseModal} />
        </Container>
    );
};

export default ProfilePage;
