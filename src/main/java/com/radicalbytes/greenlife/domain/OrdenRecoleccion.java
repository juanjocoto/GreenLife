package com.radicalbytes.greenlife.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A OrdenRecoleccion.
 */
@Entity
@Table(name = "orden_recoleccion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "ordenrecoleccion")
public class OrdenRecoleccion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha_crecion", nullable = false)
    private LocalDate fechaCrecion;

    @NotNull
    @Column(name = "fecha_solicitud", nullable = false)
    private LocalDate fechaSolicitud;

    @OneToMany(mappedBy = "ordenRecoleccion")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CadenaOrdenRecoleccion> estados = new HashSet<>();

    @ManyToOne
    private Usuario solicitante;

    @ManyToOne
    private Usuario recolector;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaCrecion() {
        return fechaCrecion;
    }

    public OrdenRecoleccion fechaCrecion(LocalDate fechaCrecion) {
        this.fechaCrecion = fechaCrecion;
        return this;
    }

    public void setFechaCrecion(LocalDate fechaCrecion) {
        this.fechaCrecion = fechaCrecion;
    }

    public LocalDate getFechaSolicitud() {
        return fechaSolicitud;
    }

    public OrdenRecoleccion fechaSolicitud(LocalDate fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
        return this;
    }

    public void setFechaSolicitud(LocalDate fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    public Set<CadenaOrdenRecoleccion> getEstados() {
        return estados;
    }

    public OrdenRecoleccion estados(Set<CadenaOrdenRecoleccion> cadenaOrdenRecoleccions) {
        this.estados = cadenaOrdenRecoleccions;
        return this;
    }

    public OrdenRecoleccion addEstado(CadenaOrdenRecoleccion cadenaOrdenRecoleccion) {
        this.estados.add(cadenaOrdenRecoleccion);
        cadenaOrdenRecoleccion.setOrdenRecoleccion(this);
        return this;
    }

    public OrdenRecoleccion removeEstado(CadenaOrdenRecoleccion cadenaOrdenRecoleccion) {
        this.estados.remove(cadenaOrdenRecoleccion);
        cadenaOrdenRecoleccion.setOrdenRecoleccion(null);
        return this;
    }

    public void setEstados(Set<CadenaOrdenRecoleccion> cadenaOrdenRecoleccions) {
        this.estados = cadenaOrdenRecoleccions;
    }

    public Usuario getSolicitante() {
        return solicitante;
    }

    public OrdenRecoleccion solicitante(Usuario usuario) {
        this.solicitante = usuario;
        return this;
    }

    public void setSolicitante(Usuario usuario) {
        this.solicitante = usuario;
    }

    public Usuario getRecolector() {
        return recolector;
    }

    public OrdenRecoleccion recolector(Usuario usuario) {
        this.recolector = usuario;
        return this;
    }

    public void setRecolector(Usuario usuario) {
        this.recolector = usuario;
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
        OrdenRecoleccion ordenRecoleccion = (OrdenRecoleccion) o;
        if (ordenRecoleccion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ordenRecoleccion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrdenRecoleccion{" +
            "id=" + getId() +
            ", fechaCrecion='" + getFechaCrecion() + "'" +
            ", fechaSolicitud='" + getFechaSolicitud() + "'" +
            "}";
    }
}
