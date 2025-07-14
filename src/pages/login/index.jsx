import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const LanguageContext = React.createContext({ language: 'en' });

const LoginPage = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const t = {
    en: {
      title: "Login",
      username: "Username",
      password: "Password",
      login: "Login",
      register: "Don't have an account? Register",
    },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.accessToken);
        navigate('/profile');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-card">
          <h1 className="text-2xl font-bold text-center">{t.en.title}</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label={t.en.username}
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              label={t.en.password}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : t.en.login}
            </Button>
          </form>
          <p className="text-center text-sm">
            <a href="/user-registration-authentication" className="text-primary hover:underline">
              {t.en.register}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
