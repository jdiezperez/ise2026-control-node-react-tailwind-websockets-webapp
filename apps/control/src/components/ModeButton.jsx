import React from 'react';

const ModeButton = ({ title, isActive, onClick, color = 'primary' }) => {
    const bgColor = color === 'primary' ? 'var(--purple-primary)' : 'var(--purple-secondary)';

    return (
        <button
            onClick={onClick}
            style={{
                flex: 1,
                padding: '20px',
                background: isActive ? bgColor : 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '32px',
                fontWeight: '800',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isActive ? 1 : 0.5, // Dim inactive buttons? Or keep them black? 
                // The design implies colored blocks. If inactive, maybe just outlined or dimmed.
                // Looking at the reference, they look like solid blocks. Let's assume solid when active, maybe grey/black when not?
                // The reference shows BOTH active-looking or maybe just labels. 
                // Wait, "PRESENTATION" is dark purple, "EXPERIENCE" is light purple.
                // Maybe they are always colored but change opacity?
                // Let's stick to opacity change for active state indication as per original code, 
                // but use the specific colors.
            }}
        >
            {title}
        </button>
    );
};

export default ModeButton;
