// components/Alert.js
import React, { useState, useEffect } from 'react';
import './Alert.css';

const Alert = ({
    type = 'info',
    message,
    onClose,
    autoClose = false,
    autoCloseTime = 5000
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (autoClose && message) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                if (onClose) onClose();
            }, autoCloseTime);

            return () => clearTimeout(timer);
        }
    }, [autoClose, autoCloseTime, message, onClose]);

    if (!message || !isVisible) return null;

    return (
        <div className={`alert alert-${type}`}>
            <div className="alert-message">{message}</div>
            {onClose && (
                <button className="alert-close" onClick={() => {
                    setIsVisible(false);
                    onClose();
                }}>
                    ×
                </button>
            )}
        </div>
    );
};

export default Alert;