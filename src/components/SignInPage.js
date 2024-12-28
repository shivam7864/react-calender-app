import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Switch, FormControlLabel } from '@mui/material';
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const { updateRole } = useAppContext();

  const handleToggle = () => {
    setIsAdmin((prev) => !prev);
    setUsername('');
    setPassword('');
  };

  const handleSignIn = () => {
    const validAdmin = username === 'admin' && password === 'admin';
    const validUser = username === 'user' && password === 'user';

    if (isAdmin && validAdmin) {
      alert('Logged in as Admin');
      updateRole('admin');
      navigate('/admin');
    } else if (!isAdmin && validUser) {
      alert('Logged in as User');
      updateRole('user');
      navigate('/user');
    } else {
      alert('Invalid username or password!');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: '#f9f9f9',
        marginTop: -15,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {isAdmin ? 'Admin Sign In' : 'User Sign In'}
      </Typography>
      <FormControlLabel
        control={<Switch checked={isAdmin} onChange={handleToggle} />}
        label="Admin Mode"
      />
      <Box
        component="form"
        sx={{
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          bgcolor: 'white',
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Typography variant="caption" color="textSecondary" textAlign="center">
          <strong>Username: {isAdmin ? 'admin' : 'user'}, Password: {isAdmin ? 'admin' : 'user'}</strong>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignInPage;
