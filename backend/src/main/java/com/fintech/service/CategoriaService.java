package com.fintech.service;

import com.fintech.model.Categoria;
import com.fintech.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }

    public Optional<Categoria> buscarPorId(Long id) {
        return categoriaRepository.findById(id);
    }

    public Categoria criar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public Optional<Categoria> atualizar(Long id, Categoria categoriaDetalhes) {
        return categoriaRepository.findById(id).map(categoriaExistente -> {
            categoriaExistente.setNome(categoriaDetalhes.getNome());
            return categoriaRepository.save(categoriaExistente);
        });
    }

    public boolean deletar(Long id) {
        return categoriaRepository.findById(id).map(categoria -> {
            categoriaRepository.delete(categoria);
            return true;
        }).orElse(false);
    }
}
