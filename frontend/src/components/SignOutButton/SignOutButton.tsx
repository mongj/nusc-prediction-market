// nusc-prediction-market/frontend/src/components/SignOutButton/SignOutButton.tsx
import React from 'react';
import './SignOutButton.css';

interface SignOutButtonProps {
    text: string;
    onClick?: () => void;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ text, onClick }) => (
    <div className="signout-button-container" onClick={onClick}>
        <div className="signout-button-background-dark"></div>
        <div className="signout-button-background-light"></div>
        <div className="signout-button-content">
            <div className="signout-button-text">{text}</div>
        </div>
    </div>
);

export default SignOutButton;