package com.radicalbytes.greenlife.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the OrdenRecoleccion entity.
 */
public class OrdenRecoleccionDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate fechaCrecion;

    @NotNull
    private LocalDate fechaSolicitud;

    private Long clienteId;

    private Long recolectorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaCrecion() {
        return fechaCrecion;
    }

    public void setFechaCrecion(LocalDate fechaCrecion) {
        this.fechaCrecion = fechaCrecion;
    }

    public LocalDate getFechaSolicitud() {
        return fechaSolicitud;
    }

    public void setFechaSolicitud(LocalDate fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public Long getRecolectorId() {
        return recolectorId;
    }

    public void setRecolectorId(Long recolectorId) {
        this.recolectorId = recolectorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrdenRecoleccionDTO ordenRecoleccionDTO = (OrdenRecoleccionDTO) o;
        if(ordenRecoleccionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ordenRecoleccionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrdenRecoleccionDTO{" +
            "id=" + getId() +
            ", fechaCrecion='" + getFechaCrecion() + "'" +
            ", fechaSolicitud='" + getFechaSolicitud() + "'" +
            "}";
    }
}
