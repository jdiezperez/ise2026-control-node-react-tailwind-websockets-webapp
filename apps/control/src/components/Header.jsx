import React from 'react';

const Header = () => {
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px 40px',
            backgroundColor: 'black',
            borderBottom: '1px solid transparent' // Optional, can remove if not needed
        }}>
            <img src="/control/images/framemov_logo.jpg" alt="FRAMEMOV Logo" style={{ width: '200px' }} />
            <div style={{
                fontSize: '18px',
                fontWeight: '400',
                color: '#ffffff'
            }}>
                Master Control
            </div>
        </header>
    );
};

export default Header;
