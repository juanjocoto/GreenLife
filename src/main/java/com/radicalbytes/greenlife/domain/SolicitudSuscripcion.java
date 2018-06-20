package com.radicalbytes.greenlife.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.radicalbytes.greenlife.domain.enumeration.EstadoSolicitud;

/**
 * A SolicitudSuscripcion.
 */
@Entity
@Table(name = "solicitud_suscripcion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "solicitudsuscripcion")
public class SolicitudSuscripcion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoSolicitud estado;

    @NotNull
    @Size(max = 200)
    @Column(name = "descripcion", length = 200, nullable = false)
    private String descripcion;

    @ManyToOne
    private Cliente solicitante;

    @ManyToOne
    private Comercio comercio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public SolicitudSuscripcion fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public EstadoSolicitud getEstado() {
        return estado;
    }

    public SolicitudSuscripcion estado(EstadoSolicitud estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(EstadoSolicitud estado) {
        this.estado = estado;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public SolicitudSuscripcion descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Cliente getSolicitante() {
        return solicitante;
    }

    public SolicitudSuscripcion solicitante(Cliente cliente) {
        this.solicitante = cliente;
        return this;
    }

    public void setSolicitante(Cliente cliente) {
        this.solicitante = cliente;
    }

    public Comercio getComercio() {
        return comercio;
    }

    public SolicitudSuscripcion comercio(Comercio comercio) {
        this.comercio = comercio;
        return this;
    }

    public void setComercio(Comercio comercio) {
        this.comercio = comercio;
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
        SolicitudSuscripcion solicitudSuscripcion = (SolicitudSuscripcion) o;
        if (solicitudSuscripcion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), solicitudSuscripcion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SolicitudSuscripcion{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", estado='" + getEstado() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
