package com.radicalbytes.greenlife.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TipoContrato entity.
 */
public class TipoContratoDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 20)
    private String nombre;

    @NotNull
    @Size(max = 200)
    private String descripcion;

    @NotNull
    private Double costo;

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

    public Double getCosto() {
        return costo;
    }

    public void setCosto(Double costo) {
        this.costo = costo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TipoContratoDTO tipoContratoDTO = (TipoContratoDTO) o;
        if(tipoContratoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoContratoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoContratoDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", costo=" + getCosto() +
            "}";
    }
}
