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
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "cliente")
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Usuario usuario;

    @OneToMany(mappedBy = "cliente")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ResenaComercio> resenas = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Suscripcion> suscripciones = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrdenRecoleccion> solicitudesRecoleccions = new HashSet<>();

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

    public Cliente usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Set<ResenaComercio> getResenas() {
        return resenas;
    }

    public Cliente resenas(Set<ResenaComercio> resenaComercios) {
        this.resenas = resenaComercios;
        return this;
    }

    public Cliente addResena(ResenaComercio resenaComercio) {
        this.resenas.add(resenaComercio);
        resenaComercio.setCliente(this);
        return this;
    }

    public Cliente removeResena(ResenaComercio resenaComercio) {
        this.resenas.remove(resenaComercio);
        resenaComercio.setCliente(null);
        return this;
    }

    public void setResenas(Set<ResenaComercio> resenaComercios) {
        this.resenas = resenaComercios;
    }

    public Set<Suscripcion> getSuscripciones() {
        return suscripciones;
    }

    public Cliente suscripciones(Set<Suscripcion> suscripcions) {
        this.suscripciones = suscripcions;
        return this;
    }

    public Cliente addSuscripciones(Suscripcion suscripcion) {
        this.suscripciones.add(suscripcion);
        suscripcion.setCliente(this);
        return this;
    }

    public Cliente removeSuscripciones(Suscripcion suscripcion) {
        this.suscripciones.remove(suscripcion);
        suscripcion.setCliente(null);
        return this;
    }

    public void setSuscripciones(Set<Suscripcion> suscripcions) {
        this.suscripciones = suscripcions;
    }

    public Set<OrdenRecoleccion> getSolicitudesRecoleccions() {
        return solicitudesRecoleccions;
    }

    public Cliente solicitudesRecoleccions(Set<OrdenRecoleccion> ordenRecoleccions) {
        this.solicitudesRecoleccions = ordenRecoleccions;
        return this;
    }

    public Cliente addSolicitudesRecoleccion(OrdenRecoleccion ordenRecoleccion) {
        this.solicitudesRecoleccions.add(ordenRecoleccion);
        ordenRecoleccion.setCliente(this);
        return this;
    }

    public Cliente removeSolicitudesRecoleccion(OrdenRecoleccion ordenRecoleccion) {
        this.solicitudesRecoleccions.remove(ordenRecoleccion);
        ordenRecoleccion.setCliente(null);
        return this;
    }

    public void setSolicitudesRecoleccions(Set<OrdenRecoleccion> ordenRecoleccions) {
        this.solicitudesRecoleccions = ordenRecoleccions;
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
        Cliente cliente = (Cliente) o;
        if (cliente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cliente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            "}";
    }
}
