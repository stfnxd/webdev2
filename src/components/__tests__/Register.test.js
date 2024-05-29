import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import Login from '../Login';
import { auth } from '../../firebaseConfig';

// Mock the Firebase authentication methods
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  GithubAuthProvider: jest.fn(),
}));

jest.mock('../../firebaseConfig', () => ({
  auth: jest.fn(),
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    // Get all buttons and find the ones we want
    const loginButton = screen.getAllByRole('button').find(button => button.textContent === 'Login');
    const githubLoginButton = screen.getAllByRole('button').find(button => button.textContent === 'Login with GitHub');

    expect(loginButton).toBeInTheDocument();
    expect(githubLoginButton).toBeInTheDocument();
  });

  test('displays error message on failed email login', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid email or password'));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
    
    // Get and click the login button
    const loginButton = screen.getAllByRole('button').find(button => button.textContent === 'Login');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
    });
  });

  test('redirects on successful email login', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });

    // Get and click the login button
    const loginButton = screen.getAllByRole('button').find(button => button.textContent === 'Login');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password');
    });
  });

  test('displays error message on failed GitHub login', async () => {
    signInWithPopup.mockRejectedValueOnce(new Error('GitHub login failed'));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Get and click the GitHub login button
    const githubLoginButton = screen.getAllByRole('button').find(button => button.textContent === 'Login with GitHub');
    fireEvent.click(githubLoginButton);

    await waitFor(() => {
      expect(screen.getByText(/GitHub login failed/i)).toBeInTheDocument();
    });
  });

  test('redirects on successful GitHub login', async () => {
    signInWithPopup.mockResolvedValueOnce();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Get and click the GitHub login button
    const githubLoginButton = screen.getAllByRole('button').find(button => button.textContent === 'Login with GitHub');
    fireEvent.click(githubLoginButton);

    await waitFor(() => {
      expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(GithubAuthProvider));
    });
  });
});