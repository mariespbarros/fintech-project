import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container" style={{textAlign: 'center', marginTop: '50px'}}>
            <h1 style={{fontSize: '72px', color: '#dc3545'}}>404</h1>
            <h2 className="page-title">Página Não Encontrada</h2>
            <p>A página que você está procurando não existe.</p>
            <Link to="/" style={{color: '#007bff', textDecoration: 'none'}}>Voltar para a Página Inicial</Link>
        </div>
    );
};

export default NotFound;
