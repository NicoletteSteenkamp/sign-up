import { useState } from 'react';
import mainImage from '../src/assets/Image.jpg'; 
import separatorImage from '../src/assets/Seperator.png'; 
import logo from '../src/assets/Logo.png';
import Heading from '../src/assets/Heading.png';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Reset error message
        setSuccessMessage(''); // Reset success message
    
        try {
            const response = await fetch('https://sign-up-page-qmay.onrender.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: Name, email, password }),
            });
    
            // Check if the response is ok (status code 200-299)
            if (response.ok) {
                const data = await response.json();
    
                // Set success message and extract token
                setSuccessMessage(data.message || 'Registration Successful!');
                
                // Save token if you need to store it for authentication purposes
                localStorage.setItem('token', data.token);
    
                navigate('/login'); 
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('An error occurred. Please try again.');
        }
    };
    

    return (
        <div className="register-form-container">
            <div className="form-image-container">
                <div className="form-content">
                    <img src={logo} alt="Logo" className='logo'/>
                    <br/>
                    <img src={Heading} alt="Heading" className='heading'/>
                    <button type="button" className="google-button">Continue with Google</button>
                    <br/>
                    <img src={separatorImage} alt="Separator" className="separator" />
                    
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input 
                                type="text" 
                                id="firstName" 
                                placeholder="First Name" 
                                value={Name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </div>
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
                        <button type="submit" className="register mb-3">Register</button>
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
