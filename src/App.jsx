import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserComponent from './components/UserComponent';
import RegisterForm from './components/RegisterComponent';

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/user" element={<UserComponent />} />
            </Routes>
        </Router>

    );
}

export default App;