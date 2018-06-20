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
 * A Publicacion.
 */
@Entity
@Table(name = "publicacion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "publicacion")
public class Publicacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha_creacion", nullable = false)
    private LocalDate fechaCreacion;

    @NotNull
    @Size(max = 50)
    @Column(name = "titulo", length = 50, nullable = false)
    private String titulo;

    @NotNull
    @Size(max = 2000)
    @Column(name = "texto", length = 2000, nullable = false)
    private String texto;

    @ManyToOne
    private Usuario usuario;

    @OneToMany(mappedBy = "publicacion")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ComentarioPublicacion> comentarios = new HashSet<>();

    @OneToMany(mappedBy = "publicacion")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Fotografia> fotos = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "publicacion_etiquetas",
               joinColumns = @JoinColumn(name="publicacions_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="etiquetas_id", referencedColumnName="id"))
    private Set<Etiqueta> etiquetas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public Publicacion fechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getTitulo() {
        return titulo;
    }

    public Publicacion titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTexto() {
        return texto;
    }

    public Publicacion texto(String texto) {
        this.texto = texto;
        return this;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Publicacion usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Set<ComentarioPublicacion> getComentarios() {
        return comentarios;
    }

    public Publicacion comentarios(Set<ComentarioPublicacion> comentarioPublicacions) {
        this.comentarios = comentarioPublicacions;
        return this;
    }

    public Publicacion addComentarios(ComentarioPublicacion comentarioPublicacion) {
        this.comentarios.add(comentarioPublicacion);
        comentarioPublicacion.setPublicacion(this);
        return this;
    }

    public Publicacion removeComentarios(ComentarioPublicacion comentarioPublicacion) {
        this.comentarios.remove(comentarioPublicacion);
        comentarioPublicacion.setPublicacion(null);
        return this;
    }

    public void setComentarios(Set<ComentarioPublicacion> comentarioPublicacions) {
        this.comentarios = comentarioPublicacions;
    }

    public Set<Fotografia> getFotos() {
        return fotos;
    }

    public Publicacion fotos(Set<Fotografia> fotografias) {
        this.fotos = fotografias;
        return this;
    }

    public Publicacion addFotos(Fotografia fotografia) {
        this.fotos.add(fotografia);
        fotografia.setPublicacion(this);
        return this;
    }

    public Publicacion removeFotos(Fotografia fotografia) {
        this.fotos.remove(fotografia);
        fotografia.setPublicacion(null);
        return this;
    }

    public void setFotos(Set<Fotografia> fotografias) {
        this.fotos = fotografias;
    }

    public Set<Etiqueta> getEtiquetas() {
        return etiquetas;
    }

    public Publicacion etiquetas(Set<Etiqueta> etiquetas) {
        this.etiquetas = etiquetas;
        return this;
    }

    public Publicacion addEtiquetas(Etiqueta etiqueta) {
        this.etiquetas.add(etiqueta);
        return this;
    }

    public Publicacion removeEtiquetas(Etiqueta etiqueta) {
        this.etiquetas.remove(etiqueta);
        return this;
    }

    public void setEtiquetas(Set<Etiqueta> etiquetas) {
        this.etiquetas = etiquetas;
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
        Publicacion publicacion = (Publicacion) o;
        if (publicacion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), publicacion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Publicacion{" +
            "id=" + getId() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", titulo='" + getTitulo() + "'" +
            ", texto='" + getTexto() + "'" +
            "}";
    }
}
