package com.radicalbytes.greenlife.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.radicalbytes.greenlife.domain.enumeration.EstadoSolicitud;

/**
 * A DTO for the SolicitudSuscripcion entity.
 */
public class SolicitudSuscripcionDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate fecha;

    private EstadoSolicitud estado;

    @NotNull
    @Size(max = 200)
    private String descripcion;

    private Long solicitanteId;

    private Long comercioId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public EstadoSolicitud getEstado() {
        return estado;
    }

    public void setEstado(EstadoSolicitud estado) {
        this.estado = estado;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Long getSolicitanteId() {
        return solicitanteId;
    }

    public void setSolicitanteId(Long clienteId) {
        this.solicitanteId = clienteId;
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

        SolicitudSuscripcionDTO solicitudSuscripcionDTO = (SolicitudSuscripcionDTO) o;
        if(solicitudSuscripcionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), solicitudSuscripcionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SolicitudSuscripcionDTO{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", estado='" + getEstado() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
