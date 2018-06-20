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
 * A Producto.
 */
@Entity
@Table(name = "producto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "producto")
public class Producto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;

    @NotNull
    @Size(max = 200)
    @Column(name = "descripcion", length = 200, nullable = false)
    private String descripcion;

    @NotNull
    @Column(name = "precio", nullable = false)
    private Float precio;

    @NotNull
    @Column(name = "fecha_creacion", nullable = false)
    private LocalDate fechaCreacion;

    @ManyToOne
    private Comercio comercio;

    @OneToMany(mappedBy = "producto")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Fotografia> fotos = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "producto_etiquetas",
               joinColumns = @JoinColumn(name="productos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="etiquetas_id", referencedColumnName="id"))
    private Set<Etiqueta> etiquetas = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "producto_categoria",
               joinColumns = @JoinColumn(name="productos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="categorias_id", referencedColumnName="id"))
    private Set<CategoriaAlimentacion> categorias = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Producto nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Producto descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Float getPrecio() {
        return precio;
    }

    public Producto precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public Producto fechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Comercio getComercio() {
        return comercio;
    }

    public Producto comercio(Comercio comercio) {
        this.comercio = comercio;
        return this;
    }

    public void setComercio(Comercio comercio) {
        this.comercio = comercio;
    }

    public Set<Fotografia> getFotos() {
        return fotos;
    }

    public Producto fotos(Set<Fotografia> fotografias) {
        this.fotos = fotografias;
        return this;
    }

    public Producto addFotos(Fotografia fotografia) {
        this.fotos.add(fotografia);
        fotografia.setProducto(this);
        return this;
    }

    public Producto removeFotos(Fotografia fotografia) {
        this.fotos.remove(fotografia);
        fotografia.setProducto(null);
        return this;
    }

    public void setFotos(Set<Fotografia> fotografias) {
        this.fotos = fotografias;
    }

    public Set<Etiqueta> getEtiquetas() {
        return etiquetas;
    }

    public Producto etiquetas(Set<Etiqueta> etiquetas) {
        this.etiquetas = etiquetas;
        return this;
    }

    public Producto addEtiquetas(Etiqueta etiqueta) {
        this.etiquetas.add(etiqueta);
        return this;
    }

    public Producto removeEtiquetas(Etiqueta etiqueta) {
        this.etiquetas.remove(etiqueta);
        return this;
    }

    public void setEtiquetas(Set<Etiqueta> etiquetas) {
        this.etiquetas = etiquetas;
    }

    public Set<CategoriaAlimentacion> getCategorias() {
        return categorias;
    }

    public Producto categorias(Set<CategoriaAlimentacion> categoriaAlimentacions) {
        this.categorias = categoriaAlimentacions;
        return this;
    }

    public Producto addCategoria(CategoriaAlimentacion categoriaAlimentacion) {
        this.categorias.add(categoriaAlimentacion);
        return this;
    }

    public Producto removeCategoria(CategoriaAlimentacion categoriaAlimentacion) {
        this.categorias.remove(categoriaAlimentacion);
        return this;
    }

    public void setCategorias(Set<CategoriaAlimentacion> categoriaAlimentacions) {
        this.categorias = categoriaAlimentacions;
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
        Producto producto = (Producto) o;
        if (producto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), producto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Producto{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", precio=" + getPrecio() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            "}";
    }
}
