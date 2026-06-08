import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div className="layout-container" style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--bg-color)',
            overflow: 'hidden'
        }}>
            <Header />
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                gap: '20px',
                position: 'relative'
            }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
