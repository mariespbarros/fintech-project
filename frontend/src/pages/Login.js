import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Login = () => {
    const [email, setEmail] = useState('RM561351@fiap.com.br');
    const [senha, setSenha] = useState('310703');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            try {
                await api.post('/usuarios', {
                    nome: 'Usuario Teste FIAP',
                    email: 'RM561351@fiap.com.br',
                    senha: '310703'
                });
            } catch (createError) {
            }

            const response = await api.post('/usuarios/login', { email, senha });

            if (response.status === 200) {
                localStorage.setItem('usuarioLogado', JSON.stringify(response.data));
                navigate('/');
            } else {
                setErro('Credenciais inválidas.');
            }
        } catch (error) {
            setErro('Erro ao tentar conectar ou autenticar. Verifique se o Backend está rodando e se as credenciais do Oracle estão corretas.');
            console.error('Erro de Login:', error);
        }
    };

    return (
        <div className="container">
            <h2 className="page-title">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                {erro && <p style={{ color: 'red' }}>{erro}</p>}
                <button type="submit" className="btn-primary">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
