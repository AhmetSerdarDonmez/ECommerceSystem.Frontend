import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import RegisterForm from './components/RegisterComponent.jsx';
import LoginForm from './components/LoginForm.jsx';
import StripePaymentWrapper from './components/PaymentComponent.jsx'; // Import the wrapper
import UserComponent from './components/UserComponent.jsx';

createRoot(document.getElementById('root')).render(
   // <StrictMode>
        <Router>
            <Routes>
                <Route path="/*" element={<App />} /> {/* Updated path */}
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/payment" element={<StripePaymentWrapper />} /> {/* Use the wrapper here */}
                <Route path="/user" element={<UserComponent />} />
                <Route path="/login" element={<LoginForm />} />"
                
            </Routes>
        </Router>
    // </StrictMode>
);