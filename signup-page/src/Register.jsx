import { useState } from 'react';
import mainImage from '../src/assets/Image.jpg'; 
import separatorImage from '../src/assets/Seperator.png'; 
import logo from '../src/assets/Logo.png';
import Heading from '../src/assets/Heading.png'
import { Link } from 'react-router-dom';



function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault(); 
        alert('Registration Successful!'); // Placeholder for actual registration logic
    };

    return (
        <div className="register-form-container">
            <div className="form-image-container">
               
                <div className="form-content">
                <img src={logo} alt="Logo" className='logo'/>
                <br/>
                <img src={Heading} alt="Logo" className='heading'/>
                     <button type="button" className="google-button">Continue with Google</button>
                     <br/>
                    <img src={separatorImage} alt="Separator" className="separator" />
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
