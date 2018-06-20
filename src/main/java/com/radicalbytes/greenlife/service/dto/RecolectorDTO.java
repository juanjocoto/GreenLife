package com.radicalbytes.greenlife.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Recolector entity.
 */
public class RecolectorDTO implements Serializable {

    private Long id;

    private Long usuarioId;

    private String usuarioNombre;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RecolectorDTO recolectorDTO = (RecolectorDTO) o;
        if(recolectorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recolectorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RecolectorDTO{" +
            "id=" + getId() +
            "}";
    }
}
