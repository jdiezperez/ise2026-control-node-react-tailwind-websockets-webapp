import React from 'react';

const GlassButton = ({ title, isActive, onClick, className = '', style = {} }) => {
    return (
        <button
            className={`glass-button ${isActive ? 'active' : ''} ${className}`}
            onClick={onClick}
            style={{
                padding: '24px',
                fontSize: '1.5rem',
                fontWeight: '600',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                ...style
            }}
        >
            {title}
        </button>
    );
};

export default GlassButton;
