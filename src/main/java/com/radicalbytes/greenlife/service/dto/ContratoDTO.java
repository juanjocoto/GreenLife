package com.radicalbytes.greenlife.service.dto;


import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import javax.validation.constraints.NotNull;

/**
 * A DTO for the Contrato entity.
 */
public class ContratoDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate fechaCreacion;

    private Long tipoId;

    private Long comercioId;

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

    public Long getTipoId() {
        return tipoId;
    }

    public void setTipoId(Long tipoContratoId) {
        this.tipoId = tipoContratoId;
    }

    public Long getComercioId() {
        return comercioId;
    }

    public void setComercioId(Long comercioId) {
        this.comercioId = comercioId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ContratoDTO contratoDTO = (ContratoDTO) o;
        if(contratoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contratoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContratoDTO{" +
            "id=" + getId() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            "}";
    }
}
