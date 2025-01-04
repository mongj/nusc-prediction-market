// nusc-prediction-market/frontend/src/components/Button/Button.tsx
import React from 'react';
import './Button.css';

interface ButtonProps {
    text: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => (
    <div className="button-container" onClick={onClick}>
        <div className="button-background-dark"></div>
        <div className="button-background-light"></div>
        <div className="button-content">
            <div className="button-text">{text}</div>
        </div>
    </div>
);

export default Button;