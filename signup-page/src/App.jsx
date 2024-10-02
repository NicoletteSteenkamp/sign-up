import RegisterForm from './Register'; 
import Home from './Home'; 
import LoginForm from './Login'; 
import NotFound from './NotFound'; 
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; 

function App() {
 
  const isAuthenticated = localStorage.getItem('token'); 

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
        />              
        <Route path="/register" element={<RegisterForm />} /> 
        <Route path="/login" element={<LoginForm />} />  
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
