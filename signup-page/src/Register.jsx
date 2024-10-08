import { useState } from 'react';
import mainImage from '../src/assets/Image.jpg'; 
import separatorImage from '../src/assets/Seperator.png'; 
import logo from '../src/assets/Logo.png';
import Heading from '../src/assets/Heading.png';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Reset error message
        setSuccessMessage(''); // Reset success message
        setLoading(true); // Set loading to true
    
        try {
            const response = await fetch('https://sign-up-page-qmay.onrender.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(data.message || 'Registration Successful!');
    
                // Optionally, store token in localStorage or handle it with cookies
                localStorage.setItem('token', data.token);
                
                // Reset fields after success
                setName('');
                setEmail('');
                setPassword('');
    
                navigate('/login'); 
            } else if (response.status === 409) { // Handle 409 Conflict
                const errorData = await response.text(); // Read as text
                setError(errorData || 'Registration failed. Please try again.');
            } else {
                const errorData = await response.json(); // For other error types, handle as JSON
                setError(errorData.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    

    return (
        <div className="register-form-container">
            <div className="form-image-container">
                <div className="form-content">
                    <img src={logo} alt="Logo" className='logo'/>
                    <br/>
                    <img src={Heading} alt="Heading" className='heading'/>
                    <button 
                        type="button" 
                        className="google-button" 
                        disabled={loading}
                        onClick={() => {/* Handle Google login */}}
                    >
                        Continue with Google
                    </button>
                    <br/>
                    <img src={separatorImage} alt="Separator" className="separator" />
                    
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input 
                                type="text" 
                                placeholder="First Name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input 
                                type="email" 
                                placeholder="E-mail" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="register mb-3" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                        <br/>
                        <span>
                            Already Have an Account? <Link to="/login">Log in here</Link>
                        </span>
                    </form>
                </div>
                <img src={mainImage} alt="Decorative" className="image" />
            </div>
        </div>
    );
}

export default RegisterForm;
