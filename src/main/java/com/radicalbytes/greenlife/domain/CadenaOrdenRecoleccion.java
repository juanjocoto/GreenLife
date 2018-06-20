package com.radicalbytes.greenlife.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import com.radicalbytes.greenlife.domain.enumeration.EstadoOrdenRecoleccion;

/**
 * A CadenaOrdenRecoleccion.
 */
@Entity
@Table(name = "cadena_orden_recoleccion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "cadenaordenrecoleccion")
public class CadenaOrdenRecoleccion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoOrdenRecoleccion estado;

    @NotNull
    @Size(max = 200)
    @Column(name = "descripcion", length = 200, nullable = false)
    private String descripcion;

    @ManyToOne
    private OrdenRecoleccion ordenRecoleccion;

    @OneToOne
    @JoinColumn(unique = true)
    private CadenaOrdenRecoleccion previo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EstadoOrdenRecoleccion getEstado() {
        return estado;
    }

    public CadenaOrdenRecoleccion estado(EstadoOrdenRecoleccion estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(EstadoOrdenRecoleccion estado) {
        this.estado = estado;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public CadenaOrdenRecoleccion descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public OrdenRecoleccion getOrdenRecoleccion() {
        return ordenRecoleccion;
    }

    public CadenaOrdenRecoleccion ordenRecoleccion(OrdenRecoleccion ordenRecoleccion) {
        this.ordenRecoleccion = ordenRecoleccion;
        return this;
    }

    public void setOrdenRecoleccion(OrdenRecoleccion ordenRecoleccion) {
        this.ordenRecoleccion = ordenRecoleccion;
    }

    public CadenaOrdenRecoleccion getPrevio() {
        return previo;
    }

    public CadenaOrdenRecoleccion previo(CadenaOrdenRecoleccion cadenaOrdenRecoleccion) {
        this.previo = cadenaOrdenRecoleccion;
        return this;
    }

    public void setPrevio(CadenaOrdenRecoleccion cadenaOrdenRecoleccion) {
        this.previo = cadenaOrdenRecoleccion;
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
        CadenaOrdenRecoleccion cadenaOrdenRecoleccion = (CadenaOrdenRecoleccion) o;
        if (cadenaOrdenRecoleccion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cadenaOrdenRecoleccion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CadenaOrdenRecoleccion{" +
            "id=" + getId() +
            ", estado='" + getEstado() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
