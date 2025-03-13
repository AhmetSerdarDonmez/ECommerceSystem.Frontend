import './App.css'
import React from 'react';
import UserComponent from './components/UserComponent';

const App = () => {
    const userId = 2; // Example user ID

    return (
        <div>
            <UserComponent userId={userId} />
        </div>
    );
};

export default App;