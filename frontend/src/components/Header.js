import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('usuarioLogado') !== null;

    const handleLogout = () => {
        localStorage.removeItem('usuarioLogado');
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="container">
                <h1>Fintech FIAP</h1>
                {isAuthenticated && (
                    <nav>
                        <Link to="/">Dashboard</Link>
                        <Link to="/categorias">Categorias</Link>
                        <Link to="/gastos">Gastos</Link>
                        <button onClick={handleLogout} style={{marginLeft: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}>Sair</button>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
