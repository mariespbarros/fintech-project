package com.fintech.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "TB_RECEITA")
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "receita_seq")
    @SequenceGenerator(name = "receita_seq", sequenceName = "RECEITA_SEQ", allocationSize = 1)
    private Long id;

    private String descricao;

    private Double valor;

    private LocalDate data;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    public Receita() {
        this.data = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
