package com.fintech.service;

import com.fintech.model.Gasto;
import com.fintech.repository.GastoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GastoService {

    @Autowired
    private GastoRepository gastoRepository;

    public List<Gasto> listarTodos() {
        return gastoRepository.findAll();
    }

    public Optional<Gasto> buscarPorId(Long id) {
        return gastoRepository.findById(id);
    }

    public Gasto criar(Gasto gasto) {
        return gastoRepository.save(gasto);
    }

    public Optional<Gasto> atualizar(Long id, Gasto gastoDetalhes) {
        return gastoRepository.findById(id).map(gastoExistente -> {
            gastoExistente.setDescricao(gastoDetalhes.getDescricao());
            gastoExistente.setValor(gastoDetalhes.getValor());
            gastoExistente.setData(gastoDetalhes.getData());
            gastoExistente.setCategoria(gastoDetalhes.getCategoria());
            gastoExistente.setUsuario(gastoDetalhes.getUsuario());
            return gastoRepository.save(gastoExistente);
        });
    }

    public boolean deletar(Long id) {
        return gastoRepository.findById(id).map(gasto -> {
            gastoRepository.delete(gasto);
            return true;
        }).orElse(false);
    }
}
