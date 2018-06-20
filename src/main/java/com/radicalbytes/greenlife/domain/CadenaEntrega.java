package com.radicalbytes.greenlife.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.radicalbytes.greenlife.domain.enumeration.EstadoCadena;

/**
 * A CadenaEntrega.
 */
@Entity
@Table(name = "cadena_entrega")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "cadenaentrega")
public class CadenaEntrega implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 200)
    @Column(name = "info", length = 200, nullable = false)
    private String info;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoCadena estado;

    @ManyToOne
    private Entrega entrega;

    @OneToOne
    @JoinColumn(unique = true)
    private CadenaEntrega previo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInfo() {
        return info;
    }

    public CadenaEntrega info(String info) {
        this.info = info;
        return this;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public CadenaEntrega fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public EstadoCadena getEstado() {
        return estado;
    }

    public CadenaEntrega estado(EstadoCadena estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(EstadoCadena estado) {
        this.estado = estado;
    }

    public Entrega getEntrega() {
        return entrega;
    }

    public CadenaEntrega entrega(Entrega entrega) {
        this.entrega = entrega;
        return this;
    }

    public void setEntrega(Entrega entrega) {
        this.entrega = entrega;
    }

    public CadenaEntrega getPrevio() {
        return previo;
    }

    public CadenaEntrega previo(CadenaEntrega cadenaEntrega) {
        this.previo = cadenaEntrega;
        return this;
    }

    public void setPrevio(CadenaEntrega cadenaEntrega) {
        this.previo = cadenaEntrega;
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
        CadenaEntrega cadenaEntrega = (CadenaEntrega) o;
        if (cadenaEntrega.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cadenaEntrega.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CadenaEntrega{" +
            "id=" + getId() +
            ", info='" + getInfo() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
