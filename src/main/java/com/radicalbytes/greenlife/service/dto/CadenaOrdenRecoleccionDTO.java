package com.radicalbytes.greenlife.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.radicalbytes.greenlife.domain.enumeration.EstadoOrdenRecoleccion;

/**
 * A DTO for the CadenaOrdenRecoleccion entity.
 */
public class CadenaOrdenRecoleccionDTO implements Serializable {

    private Long id;

    private EstadoOrdenRecoleccion estado;

    @NotNull
    @Size(max = 200)
    private String descripcion;

    private Long ordenRecoleccionId;

    private Long previoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EstadoOrdenRecoleccion getEstado() {
        return estado;
    }

    public void setEstado(EstadoOrdenRecoleccion estado) {
        this.estado = estado;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Long getOrdenRecoleccionId() {
        return ordenRecoleccionId;
    }

    public void setOrdenRecoleccionId(Long ordenRecoleccionId) {
        this.ordenRecoleccionId = ordenRecoleccionId;
    }

    public Long getPrevioId() {
        return previoId;
    }

    public void setPrevioId(Long cadenaOrdenRecoleccionId) {
        this.previoId = cadenaOrdenRecoleccionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CadenaOrdenRecoleccionDTO cadenaOrdenRecoleccionDTO = (CadenaOrdenRecoleccionDTO) o;
        if(cadenaOrdenRecoleccionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cadenaOrdenRecoleccionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CadenaOrdenRecoleccionDTO{" +
            "id=" + getId() +
            ", estado='" + getEstado() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
