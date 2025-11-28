package com.fintech.service;

import com.fintech.model.Usuario;
import com.fintech.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario criar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> atualizar(Long id, Usuario usuarioDetalhes) {
        return usuarioRepository.findById(id).map(usuarioExistente -> {
            usuarioExistente.setNome(usuarioDetalhes.getNome());
            usuarioExistente.setEmail(usuarioDetalhes.getEmail());
            if (usuarioDetalhes.getSenha() != null && !usuarioDetalhes.getSenha().isEmpty()) {
                usuarioExistente.setSenha(usuarioDetalhes.getSenha());
            }
            return usuarioRepository.save(usuarioExistente);
        });
    }

    public boolean deletar(Long id) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuarioRepository.delete(usuario);
            return true;
        }).orElse(false);
    }

    public Optional<Usuario> autenticar(String email, String senha) {
        return usuarioRepository.findByEmail(email)
                .filter(usuario -> usuario.getSenha().equals(senha));
    }
}
