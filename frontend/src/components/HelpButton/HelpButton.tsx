// nusc-prediction-market/frontend/src/components/HelpButton/HelpButton.tsx
import React from 'react';
import './HelpButton.css';

interface HelpButtonProps {
    text: string;
    onClick?: () => void;
}

const HelpButton: React.FC<HelpButtonProps> = ({ text, onClick }) => (
    <div className="help-button-container" onClick={onClick}>
        <div className="help-button-background-dark"></div>
        <div className="help-button-background-light"></div>
        <div className="help-button-content">
            <div className="help-button-text">{text}</div>
        </div>
    </div>
);

export default HelpButton;