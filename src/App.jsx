import './App.css';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom'; // Removed BrowserRouter as Router
import UserComponent from './components/UserComponent';
import RegisterForm from './components/RegisterComponent';
import PaymentForm from './components/PaymentComponent'; // Ensure this is the correct import

function App() {
    return (
        <div>
            <h1>Welcome to the App</h1>
            <nav>
                <ul>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/payment">Make a Payment</Link></li>
                    <li><Link to="/user">User</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/payment" element={<PaymentForm />} /> {/* The route for payment */}
                <Route path="/user" element={<UserComponent />} />
            </Routes>
        </div>
    );
}

export default App;