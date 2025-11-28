import React, { useState, useEffect } from 'react';
import api from '../api/api';

const GastoPage = () => {
    const [gastos, setGastos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [gastoEditando, setGastoEditando] = useState(null);

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    useEffect(() => {
        fetchGastos();
        fetchCategorias();
    }, []);

    const fetchGastos = async () => {
        try {
            const response = await api.get('/gastos');
            setGastos(response.data);
        } catch (error) {
            console.error('Erro ao buscar gastos:', error);
            alert('Erro ao carregar gastos.');
        }
    };

    const fetchCategorias = async () => {
        try {
            const response = await api.get('/categorias');
            setCategorias(response.data);
            if (response.data.length > 0) {
                setCategoriaId(response.data[0].id);
            }
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novoGasto = {
            descricao,
            valor: parseFloat(valor),
            data: data || new Date().toISOString().split('T')[0],
            categoria: { id: categoriaId },
            usuario: { id: usuarioLogado.id }
        };

        try {
            if (gastoEditando) {
                await api.put(`/gastos/${gastoEditando.id}`, novoGasto);
                alert('Gasto atualizado com sucesso!');
            } else {
                await api.post('/gastos', novoGasto);
                alert('Gasto criado com sucesso!');
            }
            setDescricao('');
            setValor('');
            setData('');
            setGastoEditando(null);
            fetchGastos();
        } catch (error) {
            console.error('Erro ao salvar gasto:', error);
            alert('Erro ao salvar gasto. Verifique se a Categoria e o Usuário existem.');
        }
    };

    const handleEdit = (gasto) => {
        setGastoEditando(gasto);
        setDescricao(gasto.descricao);
        setValor(gasto.valor.toString());
        setData(gasto.data);
        setCategoriaId(gasto.categoria.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este gasto?')) {
            try {
                await api.delete(`/gastos/${id}`);
                alert('Gasto deletado com sucesso!');
                fetchGastos();
            } catch (error) {
                console.error('Erro ao deletar gasto:', error);
                alert('Erro ao deletar gasto.');
            }
        }
    };

    return (
        <div className="container">
            <h2 className="page-title">Gerenciar Gastos</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h3>{gastoEditando ? 'Editar Gasto' : 'Novo Gasto'}</h3>
                <div className="form-group">
                    <label htmlFor="descricao">Descrição:</label>
                    <input type="text" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="valor">Valor:</label>
                    <input type="number" id="valor" value={valor} onChange={(e) => setValor(e.target.value)} required step="0.01" />
                </div>
                <div className="form-group">
                    <label htmlFor="data">Data:</label>
                    <input type="date" id="data" value={data} onChange={(e) => setData(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="categoria">Categoria:</label>
                    <select id="categoria" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nome}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn-primary">{gastoEditando ? 'Atualizar' : 'Criar'}</button>
                {gastoEditando && (
                    <button type="button" className="btn-primary" style={{backgroundColor: '#6c757d'}} onClick={() => { setGastoEditando(null); setDescricao(''); setValor(''); setData(''); }}>Cancelar</button>
                )}
            </form>

            <h3>Lista de Gastos</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {gastos.map((gasto) => (
                        <tr key={gasto.id}>
                            <td>{gasto.id}</td>
                            <td>R$ {gasto.valor.toFixed(2)}</td>
                            <td>{gasto.data}</td>
                            <td>{gasto.categoria ? gasto.categoria.nome : 'N/A'}</td>
                            <td>
                                <button className="btn-primary" onClick={() => handleEdit(gasto)}>Editar</button>
                                <button className="btn-danger" onClick={() => handleDelete(gasto.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GastoPage;
