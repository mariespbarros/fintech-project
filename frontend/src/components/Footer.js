import React from 'react';

const Footer = () => {
    return (
        <footer className="footer" style={{marginTop: '20px'}}>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Fintech FIAP Project</p>
            </div>
        </footer>
    );
};

export default Footer;
