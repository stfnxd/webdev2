import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };


  return (
    <AppBar position="static" to="/">
      <Toolbar>
        <Typography variant="h6" component={Link} sx={{ flexGrow: 1, textDecoration: 'none', color: "white"}} to="/">
          Meep Meep 🚗
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ ml: 1 }} color="inherit" onClick={handleThemeChange}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;