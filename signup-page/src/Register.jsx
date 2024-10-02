import { useState } from 'react';
import mainImage from '../src/assets/Image.jpg'; 
import separatorImage from '../src/assets/Seperator.png'; 
import logo from '../src/assets/Logo.png';
import Heading from '../src/assets/Heading.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setSuccessMessage(''); // Clear success message on input change
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Reset error message
        setSuccessMessage(''); // Reset success message
        setIsLoading(true); // Set loading state

        try {
            const response = await axios.post(`${apiUrl}/api/register`, {
                name: firstName,
                email,
                password,
            });

            setSuccessMessage(response.data.message || 'Registration Successful!');
            setTimeout(() => {
                navigate('/login'); // Navigate after 2 seconds
            }, 2000);
        } catch (error) {
            console.error('Registration error:', error); // Log the error
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false); // Reset loading state in both success and failure cases
        }
    };

    return (
        <div className="register-form-container">
            <div className="form-image-container">
                <div className="form-content">
                    <img src={logo} alt="Logo" className='logo'/><br/>
                    <img src={Heading} alt="Heading" className='heading'/>
                    <button type="button" className="google-button">Continue with Google</button><br/>
                    <img src={separatorImage} alt="Separator" className="separator" />
                    
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input 
                                type="text" 
                                id="firstName" 
                                placeholder="First Name" 
                                value={firstName} 
                                onChange={handleInputChange(setFirstName)} 
                                required 
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input 
                                type="email" 
                                placeholder="E-mail" 
                                id="email" 
                                value={email} 
                                onChange={handleInputChange(setEmail)} 
                                required 
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                id="password" 
                                value={password} 
                                onChange={handleInputChange(setPassword)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="register mb-3" disabled={isLoading}>
                            {isLoading ? 'Registering...' : 'Register'}
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

