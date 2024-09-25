import { useState } from 'react';
import mainImage from '../src/assets/Image.jpg'; 
import logo from '../src/assets/Logo.png';

import { Link } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault(); 
        alert('Login Successful!'); // Placeholder for actual login logic
    };

    return (
        <div className="login-form-container d-flex justify-content-center align-items-center min-vh-100">
            <div className="form-image-container d-flex">
                <div className="form-content p-4" style={{ flex: 1 }}>
                    <img src={logo} alt="Logo" className='logo mb-4'/>
                    <h1>Login!</h1>
                    <div className='mb-4' >Welcome back to Ruix</div>
                    
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
                    
                     <div className="form-check d-flex  mb-3">
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
                        <br/>
                        <button type="submit" className="login mb-3">Login</button>
                        <br/>
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
