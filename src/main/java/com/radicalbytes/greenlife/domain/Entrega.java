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
 * A Entrega.
 */
@Entity
@Table(name = "entrega")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "entrega")
public class Entrega implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @ManyToOne
    private Suscripcion suscripcion;

    @ManyToOne
    private Pedido pedido;

    @OneToMany(mappedBy = "entrega")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CadenaEntrega> cadenas = new HashSet<>();

    @OneToMany(mappedBy = "entrega")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LineaEntrega> lineas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public Entrega fechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
        return this;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Suscripcion getSuscripcion() {
        return suscripcion;
    }

    public Entrega suscripcion(Suscripcion suscripcion) {
        this.suscripcion = suscripcion;
        return this;
    }

    public void setSuscripcion(Suscripcion suscripcion) {
        this.suscripcion = suscripcion;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public Entrega pedido(Pedido pedido) {
        this.pedido = pedido;
        return this;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public Set<CadenaEntrega> getCadenas() {
        return cadenas;
    }

    public Entrega cadenas(Set<CadenaEntrega> cadenaEntregas) {
        this.cadenas = cadenaEntregas;
        return this;
    }

    public Entrega addCadena(CadenaEntrega cadenaEntrega) {
        this.cadenas.add(cadenaEntrega);
        cadenaEntrega.setEntrega(this);
        return this;
    }

    public Entrega removeCadena(CadenaEntrega cadenaEntrega) {
        this.cadenas.remove(cadenaEntrega);
        cadenaEntrega.setEntrega(null);
        return this;
    }

    public void setCadenas(Set<CadenaEntrega> cadenaEntregas) {
        this.cadenas = cadenaEntregas;
    }

    public Set<LineaEntrega> getLineas() {
        return lineas;
    }

    public Entrega lineas(Set<LineaEntrega> lineaEntregas) {
        this.lineas = lineaEntregas;
        return this;
    }

    public Entrega addLineas(LineaEntrega lineaEntrega) {
        this.lineas.add(lineaEntrega);
        lineaEntrega.setEntrega(this);
        return this;
    }

    public Entrega removeLineas(LineaEntrega lineaEntrega) {
        this.lineas.remove(lineaEntrega);
        lineaEntrega.setEntrega(null);
        return this;
    }

    public void setLineas(Set<LineaEntrega> lineaEntregas) {
        this.lineas = lineaEntregas;
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
        Entrega entrega = (Entrega) o;
        if (entrega.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), entrega.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Entrega{" +
            "id=" + getId() +
            ", fechaInicio='" + getFechaInicio() + "'" +
            "}";
    }
}
