package com.radicalbytes.greenlife.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

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

    @OneToOne
    @JoinColumn(unique = true)
    private CadenaEntrega cadena;

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

    public CadenaEntrega getCadena() {
        return cadena;
    }

    public Entrega cadena(CadenaEntrega cadenaEntrega) {
        this.cadena = cadenaEntrega;
        return this;
    }

    public void setCadena(CadenaEntrega cadenaEntrega) {
        this.cadena = cadenaEntrega;
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
