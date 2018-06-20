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
 * A CobroMensualidad.
 */
@Entity
@Table(name = "cobro_mensualidad")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "cobromensualidad")
public class CobroMensualidad implements Serializable {

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
    private Contrato contrato;

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

    public CobroMensualidad fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Pago getPago() {
        return pago;
    }

    public CobroMensualidad pago(Pago pago) {
        this.pago = pago;
        return this;
    }

    public void setPago(Pago pago) {
        this.pago = pago;
    }

    public Contrato getContrato() {
        return contrato;
    }

    public CobroMensualidad contrato(Contrato contrato) {
        this.contrato = contrato;
        return this;
    }

    public void setContrato(Contrato contrato) {
        this.contrato = contrato;
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
        CobroMensualidad cobroMensualidad = (CobroMensualidad) o;
        if (cobroMensualidad.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cobroMensualidad.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CobroMensualidad{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
