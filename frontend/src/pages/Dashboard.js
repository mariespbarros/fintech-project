import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioLogado = localStorage.getItem('usuarioLogado');
        if (usuarioLogado) {
            setUsuario(JSON.parse(usuarioLogado));
        }
    }, []);

    return (
        <div className="container">
            <h2 className="page-title">Página Inicial - Dashboard</h2>
            {usuario ? (
                <div>
                    <p>Bem-vindo, **{usuario.nome}**!</p>
                    <p>Este é o painel de controle do seu projeto Fintech.</p>
                    <p>Navegue pelos links acima para gerenciar: **Categorias** e **Gastos**.</p>
                    <div style={{marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px'}}>
                        <h3>Status do Projeto:</h3>
                        <ul>
                            <li>**Backend (Spring Boot):** Implementado para 6 entidades. CRUD completo para Usuário, Categoria e Gasto.</li>
                            <li>**Banco de Dados:** Configurado para o Oracle da FIAP (Host: oracle.fiap.com.br, Porta: 1521, SID: ORCL).</li>
                            <li>**Frontend (ReactJS):** Implementado com Rotas (SPA), Autenticação (Login) e CRUD para Categoria e Gasto.</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Carregando informações do usuário...</p>
            )}
        </div>
    );
};

export default Dashboard;
