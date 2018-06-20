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

import com.radicalbytes.greenlife.domain.enumeration.EstadoSuscripcion;

/**
 * A Suscripcion.
 */
@Entity
@Table(name = "suscripcion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "suscripcion")
public class Suscripcion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 500)
    @Column(name = "detalle", length = 500)
    private String detalle;

    @NotNull
    @Column(name = "fecha_creacion", nullable = false)
    private LocalDate fechaCreacion;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoSuscripcion estado;

    @Column(name = "fecha_cancelacion")
    private LocalDate fechaCancelacion;

    @NotNull
    @Column(name = "fecha_cobro", nullable = false)
    private LocalDate fechaCobro;

    @ManyToOne
    private Cliente cliente;

    @ManyToOne
    private Comercio comercio;

    @OneToMany(mappedBy = "suscripcion")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Pedido> pedidos = new HashSet<>();

    @OneToMany(mappedBy = "suscripcion")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Entrega> historicoEntregases = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDetalle() {
        return detalle;
    }

    public Suscripcion detalle(String detalle) {
        this.detalle = detalle;
        return this;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public Suscripcion fechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public EstadoSuscripcion getEstado() {
        return estado;
    }

    public Suscripcion estado(EstadoSuscripcion estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(EstadoSuscripcion estado) {
        this.estado = estado;
    }

    public LocalDate getFechaCancelacion() {
        return fechaCancelacion;
    }

    public Suscripcion fechaCancelacion(LocalDate fechaCancelacion) {
        this.fechaCancelacion = fechaCancelacion;
        return this;
    }

    public void setFechaCancelacion(LocalDate fechaCancelacion) {
        this.fechaCancelacion = fechaCancelacion;
    }

    public LocalDate getFechaCobro() {
        return fechaCobro;
    }

    public Suscripcion fechaCobro(LocalDate fechaCobro) {
        this.fechaCobro = fechaCobro;
        return this;
    }

    public void setFechaCobro(LocalDate fechaCobro) {
        this.fechaCobro = fechaCobro;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Suscripcion cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Comercio getComercio() {
        return comercio;
    }

    public Suscripcion comercio(Comercio comercio) {
        this.comercio = comercio;
        return this;
    }

    public void setComercio(Comercio comercio) {
        this.comercio = comercio;
    }

    public Set<Pedido> getPedidos() {
        return pedidos;
    }

    public Suscripcion pedidos(Set<Pedido> pedidos) {
        this.pedidos = pedidos;
        return this;
    }

    public Suscripcion addPedidos(Pedido pedido) {
        this.pedidos.add(pedido);
        pedido.setSuscripcion(this);
        return this;
    }

    public Suscripcion removePedidos(Pedido pedido) {
        this.pedidos.remove(pedido);
        pedido.setSuscripcion(null);
        return this;
    }

    public void setPedidos(Set<Pedido> pedidos) {
        this.pedidos = pedidos;
    }

    public Set<Entrega> getHistoricoEntregases() {
        return historicoEntregases;
    }

    public Suscripcion historicoEntregases(Set<Entrega> entregas) {
        this.historicoEntregases = entregas;
        return this;
    }

    public Suscripcion addHistoricoEntregas(Entrega entrega) {
        this.historicoEntregases.add(entrega);
        entrega.setSuscripcion(this);
        return this;
    }

    public Suscripcion removeHistoricoEntregas(Entrega entrega) {
        this.historicoEntregases.remove(entrega);
        entrega.setSuscripcion(null);
        return this;
    }

    public void setHistoricoEntregases(Set<Entrega> entregas) {
        this.historicoEntregases = entregas;
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
        Suscripcion suscripcion = (Suscripcion) o;
        if (suscripcion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), suscripcion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Suscripcion{" +
            "id=" + getId() +
            ", detalle='" + getDetalle() + "'" +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", estado='" + getEstado() + "'" +
            ", fechaCancelacion='" + getFechaCancelacion() + "'" +
            ", fechaCobro='" + getFechaCobro() + "'" +
            "}";
    }
}
