package com.radicalbytes.greenlife.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Pedido.
 */
@Entity
@Table(name = "pedido")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "pedido")
public class Pedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "hora", nullable = false)
    private String hora;

    @ManyToOne
    private Suscripcion suscripcion;

    @OneToMany(mappedBy = "pedido")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Entrega> entregases = new HashSet<>();

    @OneToMany(mappedBy = "pedido")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LineaProducto> lineas = new HashSet<>();

    @ManyToOne
    private DiaEntrega diasEntrega;

    @ManyToOne
    private Local local;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHora() {
        return hora;
    }

    public Pedido hora(String hora) {
        this.hora = hora;
        return this;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public Suscripcion getSuscripcion() {
        return suscripcion;
    }

    public Pedido suscripcion(Suscripcion suscripcion) {
        this.suscripcion = suscripcion;
        return this;
    }

    public void setSuscripcion(Suscripcion suscripcion) {
        this.suscripcion = suscripcion;
    }

    public Set<Entrega> getEntregases() {
        return entregases;
    }

    public Pedido entregases(Set<Entrega> entregas) {
        this.entregases = entregas;
        return this;
    }

    public Pedido addEntregas(Entrega entrega) {
        this.entregases.add(entrega);
        entrega.setPedido(this);
        return this;
    }

    public Pedido removeEntregas(Entrega entrega) {
        this.entregases.remove(entrega);
        entrega.setPedido(null);
        return this;
    }

    public void setEntregases(Set<Entrega> entregas) {
        this.entregases = entregas;
    }

    public Set<LineaProducto> getLineas() {
        return lineas;
    }

    public Pedido lineas(Set<LineaProducto> lineaProductos) {
        this.lineas = lineaProductos;
        return this;
    }

    public Pedido addLineas(LineaProducto lineaProducto) {
        this.lineas.add(lineaProducto);
        lineaProducto.setPedido(this);
        return this;
    }

    public Pedido removeLineas(LineaProducto lineaProducto) {
        this.lineas.remove(lineaProducto);
        lineaProducto.setPedido(null);
        return this;
    }

    public void setLineas(Set<LineaProducto> lineaProductos) {
        this.lineas = lineaProductos;
    }

    public DiaEntrega getDiasEntrega() {
        return diasEntrega;
    }

    public Pedido diasEntrega(DiaEntrega diaEntrega) {
        this.diasEntrega = diaEntrega;
        return this;
    }

    public void setDiasEntrega(DiaEntrega diaEntrega) {
        this.diasEntrega = diaEntrega;
    }

    public Local getLocal() {
        return local;
    }

    public Pedido local(Local local) {
        this.local = local;
        return this;
    }

    public void setLocal(Local local) {
        this.local = local;
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
        Pedido pedido = (Pedido) o;
        if (pedido.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pedido.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pedido{" +
            "id=" + getId() +
            ", hora='" + getHora() + "'" +
            "}";
    }
}
