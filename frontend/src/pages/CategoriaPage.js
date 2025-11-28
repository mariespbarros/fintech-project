import React, { useState, useEffect } from 'react';
import api from '../api/api';

const CategoriaPage = () => {
    const [categorias, setCategorias] = useState([]);
    const [nome, setNome] = useState('');
    const [categoriaEditando, setCategoriaEditando] = useState(null);

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        try {
            const response = await api.get('/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            alert('Erro ao carregar categorias.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novaCategoria = { nome };

        try {
            if (categoriaEditando) {
                await api.put(`/categorias/${categoriaEditando.id}`, novaCategoria);
                alert('Categoria atualizada com sucesso!');
            } else {
                await api.post('/categorias', novaCategoria);
                alert('Categoria criada com sucesso!');
            }
            setNome('');
            setCategoriaEditando(null);
            fetchCategorias();
        } catch (error) {
            console.error('Erro ao salvar categoria:', error);
            alert('Erro ao salvar categoria.');
        }
    };

    const handleEdit = (categoria) => {
        setCategoriaEditando(categoria);
        setNome(categoria.nome);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar esta categoria?')) {
            try {
                await api.delete(`/categorias/${id}`);
                alert('Categoria deletada com sucesso!');
                fetchCategorias();
            } catch (error) {
                console.error('Erro ao deletar categoria:', error);
                alert('Erro ao deletar categoria.');
            }
        }
    };

    return (
        <div className="container">
            <h2 className="page-title">Gerenciar Categorias</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h3>{categoriaEditando ? 'Editar Categoria' : 'Nova Categoria'}</h3>
                <div className="form-group">
                    <label htmlFor="nome">Nome da Categoria:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-primary">{categoriaEditando ? 'Atualizar' : 'Criar'}</button>
                {categoriaEditando && (
                    <button type="button" className="btn-primary" style={{backgroundColor: '#6c757d'}} onClick={() => { setCategoriaEditando(null); setNome(''); }}>Cancelar</button>
                )}
            </form>

            <h3>Lista de Categorias</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((cat) => (
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.nome}</td>
                            <td>
                                <button className="btn-primary" onClick={() => handleEdit(cat)}>Editar</button>
                                <button className="btn-danger" onClick={() => handleDelete(cat.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoriaPage;
