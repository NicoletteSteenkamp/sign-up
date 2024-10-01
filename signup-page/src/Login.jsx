import { useState } from 'react';
import mainImage from '../src/assets/Image.jpg'; 
import logo from '../src/assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                email,
                password,
            });
            
            const { token } = response.data;

            // Store token based on Remember Me
            if (rememberMe) {
                localStorage.setItem('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }

            // Navigate to home or protected route
            navigate('/home');
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-form-container d-flex justify-content-center align-items-center min-vh-100">
            <ToastContainer />
            <div className="form-image-container d-flex">
                <div className="form-content p-4" style={{ flex: 1 }}>
                    <img src={logo} alt="Logo" className='logo mb-4'/>
                    <h1>Login!</h1>
                    <div className='mb-4'>Welcome back to Ruix</div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input 
                                type="email" 
                                placeholder="E-mail" 
                                id="email" 
                                aria-label="Email address"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)} 
                                className="toggle-password" 
                            >
                                {showPassword ? 'Hide' : 'Show'} 
                            </button>
                        </div>
                    
                        <div className="form-check d-flex mb-3">
                            <input 
                                type="checkbox" 
                                id="rememberMe" 
                                className="form-check-input me-2"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)} 
                            />
                            <label htmlFor="rememberMe" className="form-check-label">
                                Remember Me
                            </label>
                        </div>
                        
                        <button type="submit" className="login mb-3" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                        
                        {error && <p style={{ color: 'red' }}>{error}</p>} 
                        
                        <span>
                            Need an Account? <Link to="/register">Sign up here</Link>
                        </span>
                    </form>
                </div>
                <img src={mainImage} alt="Decorative" className="image" />
            </div>
        </div>
    );
}

export default LoginForm;
