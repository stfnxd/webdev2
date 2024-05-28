import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Button, TextField, Typography, Container, Box, Alert } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    const handleEmailLogin = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } catch (err) {
        setError(err.message);
      }
    };
  
    const handleGithubLogin = async () => {
      const provider = new GithubAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        navigate("/", {replace: true});
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">Login</Typography>
          {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleEmailLogin} sx={{ mt: 3, width: '100%' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box>
              <Typography color="secondary" variant="body2" component={Link} to="/forgot-password">
                Forgot Password?
              </Typography>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 1 }}
              startIcon={<GitHubIcon />}
              onClick={handleGithubLogin}
            >
              Login with GitHub
            </Button>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" align="center">
                Don't have an account? <Typography color="secondary" variant="body2" component={Link} to="/register">Register</Typography>
              </Typography>
            </Box>
          </Box>

        </Box>
      </Container>
    );
  };
  
export default Login;