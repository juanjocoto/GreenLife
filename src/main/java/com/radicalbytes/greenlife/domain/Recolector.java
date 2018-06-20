package com.radicalbytes.greenlife.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Recolector.
 */
@Entity
@Table(name = "recolector")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "recolector")
public class Recolector implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Usuario usuario;

    @OneToMany(mappedBy = "recolector")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrdenRecoleccion> ordenes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Recolector usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Set<OrdenRecoleccion> getOrdenes() {
        return ordenes;
    }

    public Recolector ordenes(Set<OrdenRecoleccion> ordenRecoleccions) {
        this.ordenes = ordenRecoleccions;
        return this;
    }

    public Recolector addOrdenes(OrdenRecoleccion ordenRecoleccion) {
        this.ordenes.add(ordenRecoleccion);
        ordenRecoleccion.setRecolector(this);
        return this;
    }

    public Recolector removeOrdenes(OrdenRecoleccion ordenRecoleccion) {
        this.ordenes.remove(ordenRecoleccion);
        ordenRecoleccion.setRecolector(null);
        return this;
    }

    public void setOrdenes(Set<OrdenRecoleccion> ordenRecoleccions) {
        this.ordenes = ordenRecoleccions;
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
        Recolector recolector = (Recolector) o;
        if (recolector.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recolector.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Recolector{" +
            "id=" + getId() +
            "}";
    }
}
