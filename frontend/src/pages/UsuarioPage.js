import React, { useState, useEffect } from 'react';
import api from '../api/api';

const UsuarioPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await api.get('/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            alert('Erro ao carregar usuários.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novoUsuario = { nome, email, senha };

        try {
            if (usuarioEditando) {
                await api.put(`/usuarios/${usuarioEditando.id}`, novoUsuario);
                alert('Usuário atualizado com sucesso!');
            } else {
                await api.post('/usuarios', novoUsuario);
                alert('Usuário criado com sucesso!');
            }
            setNome('');
            setEmail('');
            setSenha('');
            setUsuarioEditando(null);
            fetchUsuarios();
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
            alert('Erro ao salvar usuário.');
        }
    };

    const handleEdit = (usuario) => {
        setUsuarioEditando(usuario);
        setNome(usuario.nome);
        setEmail(usuario.email);
        setSenha('');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
            try {
                await api.delete(`/usuarios/${id}`);
                alert('Usuário deletado com sucesso!');
                fetchUsuarios();
            } catch (error) {
                console.error('Erro ao deletar usuário:', error);
                alert('Erro ao deletar usuário.');
            }
        }
    };

    return (
        <div className="container">
            <h2 className="page-title">Gerenciar Usuários (CRUD)</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h3>{usuarioEditando ? 'Editar Usuário' : 'Novo Usuário'}</h3>
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required={!usuarioEditando} />
                </div>
                <button type="submit" className="btn-primary">{usuarioEditando ? 'Atualizar' : 'Criar'}</button>
                {usuarioEditando && (
                    <button type="button" className="btn-primary" style={{backgroundColor: '#6c757d'}} onClick={() => { setUsuarioEditando(null); setNome(''); setEmail(''); setSenha(''); }}>Cancelar</button>
                )}
            </form>

            <h3>Lista de Usuários</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.nome}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn-primary" onClick={() => handleEdit(user)}>Editar</button>
                                <button className="btn-danger" onClick={() => handleDelete(user.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsuarioPage;
