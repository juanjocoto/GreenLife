package com.radicalbytes.greenlife.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the DiaEntrega entity.
 */
public class DiaEntregaDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 20)
    private String nombre;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DiaEntregaDTO diaEntregaDTO = (DiaEntregaDTO) o;
        if(diaEntregaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), diaEntregaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DiaEntregaDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
