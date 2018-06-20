package com.radicalbytes.greenlife.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Etiqueta entity.
 */
public class EtiquetaDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 20)
    private String nombre;

    @NotNull
    private Boolean disponible;

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

    public Boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EtiquetaDTO etiquetaDTO = (EtiquetaDTO) o;
        if(etiquetaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), etiquetaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EtiquetaDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", disponible='" + isDisponible() + "'" +
            "}";
    }
}
