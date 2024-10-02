import { useState } from 'react';
import mainImage from '../src/assets/Image.jpg'; 
import separatorImage from '../src/assets/Seperator.png'; 
import logo from '../src/assets/Logo.png';
import Heading from '../src/assets/Heading.png';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // For error messages
    const [successMessage, setSuccessMessage] = useState(''); // For success messages
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Reset error message
        setSuccessMessage(''); // Reset success message
    
        try {
            const response = await fetch('https://sign-up-t5un.onrender.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, email, password }),
            });
    
            // Check if the response is ok
            if (response.ok) {
                // Registration was successful
                const data = await response.json(); // This should now work without issue
                setSuccessMessage(data.message || 'Registration Successful!'); // Show success message
                navigate('/login'); // Redirect to the login page
            } else {
                // Handle errors from the server
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed. Please try again.'); // Show error message
            }
        } catch (error) {
            console.error('Registration error:', error); // Log the error for debugging
            setError('An error occurred. Please try again.'); // General error handling
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
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
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