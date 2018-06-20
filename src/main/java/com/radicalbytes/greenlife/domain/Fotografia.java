package com.radicalbytes.greenlife.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Fotografia.
 */
@Entity
@Table(name = "fotografia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "fotografia")
public class Fotografia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "url_image", nullable = false)
    private String urlImage;

    @ManyToOne
    private CentroAcopio centroAcopio;

    @ManyToOne
    private Comercio comercio;

    @ManyToOne
    private Producto producto;

    @ManyToOne
    private Publicacion publicacion;

    @ManyToOne
    private Evento evento;

    @ManyToOne
    private Patrocinador patrocinador;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public Fotografia urlImage(String urlImage) {
        this.urlImage = urlImage;
        return this;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public CentroAcopio getCentroAcopio() {
        return centroAcopio;
    }

    public Fotografia centroAcopio(CentroAcopio centroAcopio) {
        this.centroAcopio = centroAcopio;
        return this;
    }

    public void setCentroAcopio(CentroAcopio centroAcopio) {
        this.centroAcopio = centroAcopio;
    }

    public Comercio getComercio() {
        return comercio;
    }

    public Fotografia comercio(Comercio comercio) {
        this.comercio = comercio;
        return this;
    }

    public void setComercio(Comercio comercio) {
        this.comercio = comercio;
    }

    public Producto getProducto() {
        return producto;
    }

    public Fotografia producto(Producto producto) {
        this.producto = producto;
        return this;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Publicacion getPublicacion() {
        return publicacion;
    }

    public Fotografia publicacion(Publicacion publicacion) {
        this.publicacion = publicacion;
        return this;
    }

    public void setPublicacion(Publicacion publicacion) {
        this.publicacion = publicacion;
    }

    public Evento getEvento() {
        return evento;
    }

    public Fotografia evento(Evento evento) {
        this.evento = evento;
        return this;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public Patrocinador getPatrocinador() {
        return patrocinador;
    }

    public Fotografia patrocinador(Patrocinador patrocinador) {
        this.patrocinador = patrocinador;
        return this;
    }

    public void setPatrocinador(Patrocinador patrocinador) {
        this.patrocinador = patrocinador;
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
        Fotografia fotografia = (Fotografia) o;
        if (fotografia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fotografia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Fotografia{" +
            "id=" + getId() +
            ", urlImage='" + getUrlImage() + "'" +
            "}";
    }
}
