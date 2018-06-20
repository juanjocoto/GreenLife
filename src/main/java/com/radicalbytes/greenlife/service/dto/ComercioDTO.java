package com.radicalbytes.greenlife.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.radicalbytes.greenlife.domain.enumeration.TipoComercio;

/**
 * A DTO for the Comercio entity.
 */
public class ComercioDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate fechaCreacion;

    @NotNull
    @Size(min = 10, max = 10)
    private String cedJuridica;

    @NotNull
    @Size(max = 50)
    private String razonSocial;

    @NotNull
    @Size(max = 50)
    private String nombreComercial;

    private TipoComercio tipo;

    private Long usuarioId;

    private String usuarioNombre;

    private Set<EtiquetaDTO> etiquetas = new HashSet<>();

    private Set<CategoriaAlimentacionDTO> categorias = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getCedJuridica() {
        return cedJuridica;
    }

    public void setCedJuridica(String cedJuridica) {
        this.cedJuridica = cedJuridica;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public String getNombreComercial() {
        return nombreComercial;
    }

    public void setNombreComercial(String nombreComercial) {
        this.nombreComercial = nombreComercial;
    }

    public TipoComercio getTipo() {
        return tipo;
    }

    public void setTipo(TipoComercio tipo) {
        this.tipo = tipo;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getUsuarioNombre() {
        return usuarioNombre;
    }

    public void setUsuarioNombre(String usuarioNombre) {
        this.usuarioNombre = usuarioNombre;
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

        ComercioDTO comercioDTO = (ComercioDTO) o;
        if(comercioDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), comercioDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ComercioDTO{" +
            "id=" + getId() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", cedJuridica='" + getCedJuridica() + "'" +
            ", razonSocial='" + getRazonSocial() + "'" +
            ", nombreComercial='" + getNombreComercial() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
