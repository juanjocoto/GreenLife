package com.radicalbytes.greenlife.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Producto entity.
 */
public class ProductoDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 50)
    private String nombre;

    @NotNull
    @Size(max = 200)
    private String descripcion;

    @NotNull
    private Float precio;

    @NotNull
    private LocalDate fechaCreacion;

    private Long comercioId;

    private Set<EtiquetaDTO> etiquetas = new HashSet<>();

    private Set<CategoriaAlimentacionDTO> categorias = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Float getPrecio() {
        return precio;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Long getComercioId() {
        return comercioId;
    }

    public void setComercioId(Long comercioId) {
        this.comercioId = comercioId;
    }

    public Set<EtiquetaDTO> getEtiquetas() {
        return etiquetas;
    }

    public void setEtiquetas(Set<EtiquetaDTO> etiquetas) {
        this.etiquetas = etiquetas;
    }

    public Set<CategoriaAlimentacionDTO> getCategorias() {
        return categorias;
    }

    public void setCategorias(Set<CategoriaAlimentacionDTO> categoriaAlimentacions) {
        this.categorias = categoriaAlimentacions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductoDTO productoDTO = (ProductoDTO) o;
        if(productoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductoDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", precio=" + getPrecio() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            "}";
    }
}
