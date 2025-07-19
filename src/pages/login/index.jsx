import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Checkbox from '../../components/ui/Checkbox'; // For "Remember me"

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        console.log("Logging in with data:", { email: formData.email, password: '***', rememberMe: formData.rememberMe });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock login logic
        if (formData.email === "user@example.com" && formData.password === "password123") {
            alert("Login successful! Welcome back to Zimba! (Simulation)");
            // In a real app, set auth context/token here
            // For now, assume a default role and redirect
            // This redirection logic would be more sophisticated based on actual user role from backend
            const mockUserRole = "renter"; // Could also be 'landlord', 'admin'
            if (mockUserRole === 'landlord') {
                navigate('/landlord-dashboard');
            } else if (mockUserRole === 'admin') {
                navigate('/admin/commissions'); // Example admin route
            }
            else {
                navigate('/dashboard'); // Default renter/buyer dashboard
            }
        } else {
            setError("Invalid email or password. Please try again or reset your password.");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block mb-4">
                        {/* Replace with Zimba Logo if available */}
                        <Icon name="Home" size={48} className="text-primary" />
                    </Link>
                    <h1 className="text-3xl font-bold text-foreground">Welcome Back to Zimba!</h1>
                    <p className="text-muted-foreground mt-1">Sign in to continue your journey with us.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 bg-card p-8 rounded-2xl shadow-2xl">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground" htmlFor="email">Email Address</label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-medium text-muted-foreground" htmlFor="password">Password</label>
                            <Link to="/forgot-password" tabIndex={-1} className="text-xs text-primary hover:underline"> {/* Placeholder route */}
                                Forgot Password?
                            </Link>
                        </div>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Remember Me - Placeholder, actual functionality needs secure token storage */}
                    {/* <div className="flex items-center justify-between">
                        <label htmlFor="rememberMe" className="flex items-center space-x-2 cursor-pointer text-sm text-muted-foreground">
                            <Checkbox
                                id="rememberMe"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onCheckedChange={(checked) => setFormData(prev => ({...prev, rememberMe: checked}))}
                            />
                            <span>Remember me</span>
                        </label>
                    </div> */}

                    {error && (
                        <p className="text-sm text-red-500 bg-red-50 p-3 rounded-md flex items-center">
                            <Icon name="AlertTriangle" size={16} className="mr-2"/>
                            {error}
                        </p>
                    )}

                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? <Icon name="LoaderCircle" className="animate-spin mr-2"/> : null}
                        Log In
                    </Button>

                    {/* Placeholder for Language Toggle */}
                    <div className="text-center text-xs text-muted-foreground pt-2">
                        <button type="button" className="hover:underline">
                            <Icon name="Languages" size={14} className="inline mr-1"/> English (Change)
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-8">
                    Don't have an account yet?{' '}
                    <Link to="/signup" className="font-semibold text-primary hover:underline">
                        Sign Up for Zimba
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
