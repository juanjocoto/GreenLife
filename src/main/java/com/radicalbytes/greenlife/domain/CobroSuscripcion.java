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
 * A CobroSuscripcion.
 */
@Entity
@Table(name = "cobro_suscripcion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "cobrosuscripcion")
public class CobroSuscripcion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @OneToOne
    @JoinColumn(unique = true)
    private Pago pago;

    @ManyToOne
    private Usuario cliente;

    @ManyToOne
    private Comercio comercio;

    @ManyToOne
    private Suscripcion suscripcion;

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

    public CobroSuscripcion fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Pago getPago() {
        return pago;
    }

    public CobroSuscripcion pago(Pago pago) {
        this.pago = pago;
        return this;
    }

    public void setPago(Pago pago) {
        this.pago = pago;
    }

    public Usuario getCliente() {
        return cliente;
    }

    public CobroSuscripcion cliente(Usuario usuario) {
        this.cliente = usuario;
        return this;
    }

    public void setCliente(Usuario usuario) {
        this.cliente = usuario;
    }

    public Comercio getComercio() {
        return comercio;
    }

    public CobroSuscripcion comercio(Comercio comercio) {
        this.comercio = comercio;
        return this;
    }

    public void setComercio(Comercio comercio) {
        this.comercio = comercio;
    }

    public Suscripcion getSuscripcion() {
        return suscripcion;
    }

    public CobroSuscripcion suscripcion(Suscripcion suscripcion) {
        this.suscripcion = suscripcion;
        return this;
    }

    public void setSuscripcion(Suscripcion suscripcion) {
        this.suscripcion = suscripcion;
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
        CobroSuscripcion cobroSuscripcion = (CobroSuscripcion) o;
        if (cobroSuscripcion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cobroSuscripcion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CobroSuscripcion{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
