import RegisterForm from './Register'; 
import Home from './Home';
import LoginForm from './Login';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />              
        <Route path="/register" element={<RegisterForm />} /> 
        <Route path="/login" element={<LoginForm />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
