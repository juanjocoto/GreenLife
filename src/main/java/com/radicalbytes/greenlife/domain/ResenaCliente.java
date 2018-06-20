package com.radicalbytes.greenlife.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A ResenaCliente.
 */
@Entity
@Table(name = "resena_cliente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "resenacliente")
public class ResenaCliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha_creacion", nullable = false)
    private LocalDate fechaCreacion;

    @NotNull
    @Column(name = "calificacion", nullable = false)
    private Integer calificacion;

    @NotNull
    @Size(max = 200)
    @Column(name = "comentario", length = 200, nullable = false)
    private String comentario;

    @ManyToOne
    private Comercio comercio;

    @ManyToOne
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public ResenaCliente fechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Integer getCalificacion() {
        return calificacion;
    }

    public ResenaCliente calificacion(Integer calificacion) {
        this.calificacion = calificacion;
        return this;
    }

    public void setCalificacion(Integer calificacion) {
        this.calificacion = calificacion;
    }

    public String getComentario() {
        return comentario;
    }

    public ResenaCliente comentario(String comentario) {
        this.comentario = comentario;
        return this;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Comercio getComercio() {
        return comercio;
    }

    public ResenaCliente comercio(Comercio comercio) {
        this.comercio = comercio;
        return this;
    }

    public void setComercio(Comercio comercio) {
        this.comercio = comercio;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public ResenaCliente cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ResenaCliente resenaCliente = (ResenaCliente) o;
        if (resenaCliente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), resenaCliente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ResenaCliente{" +
            "id=" + getId() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", calificacion=" + getCalificacion() +
            ", comentario='" + getComentario() + "'" +
            "}";
    }
}
