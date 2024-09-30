import { useState } from 'react';
import mainImage from '../src/assets/Image.jpg'; 
import logo from '../src/assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(''); // To manage error messages
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Reset error message
    
        try {
            const response = await fetch('http://localhost:8081/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            // Check if the response is ok
            if (response.ok) {
                const data = await response.json();
                // Store the token in local storage
                localStorage.setItem('token', data.token);
                // Redirect to a protected route (e.g., dashboard)
                navigate('/Home'); // Change to your desired route
            } else {
                // If the response was not ok, attempt to parse the error message
                const errorData = await response.json();
                setError(errorData.message || 'Login failed. Please check your credentials.'); // Display the error message from the server
            }
        } catch (error) {
            console.error('Login error:', error); // Log the error to the console for debugging
            setError('An error occurred. Please try again.'); // General error handling message
        }
    };

    return (
        <div className="login-form-container d-flex justify-content-center align-items-center min-vh-100">
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
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
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
                        
                        <button type="submit" className="login mb-3">Login</button>
                        
                        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                        
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
