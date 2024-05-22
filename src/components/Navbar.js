import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/auth'
import { getAuth } from "firebase/auth";

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} sx={{ flexGrow: 1, textDecoration: 'none', color: "inherit"}} to="/">
          Meep Meep 🚗
        </Typography>

        {user ? ( 
          <Button color="inherit" onClick={handleLogout} sx={{ '&:hover': { color: 'primary.main' } }}>Log Off</Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login" sx={{ '&:hover': { color: 'primary.main' } }}>Login</Button>
            <Button color="inherit" component={Link} to="/register" sx={{ '&:hover': { color: 'primary.main' } }}>Register</Button>
          </>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={handleThemeChange}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;