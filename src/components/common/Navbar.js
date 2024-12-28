import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

const Navbar = () => {

  const {role, updateRole} = useAppContext();
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
        </Typography>
        <Box>
          <Button color="inherit" sx={{ ml: 2 }} onClick={()=>{
            updateRole(null)
            navigate("/")
          }}>
            Sign Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
