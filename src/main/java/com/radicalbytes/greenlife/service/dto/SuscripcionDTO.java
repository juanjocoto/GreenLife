package com.radicalbytes.greenlife.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.radicalbytes.greenlife.domain.enumeration.EstadoSuscripcion;

/**
 * A DTO for the Suscripcion entity.
 */
public class SuscripcionDTO implements Serializable {

    private Long id;

    @Size(max = 500)
    private String detalle;

    @NotNull
    private LocalDate fechaCreacion;

    private EstadoSuscripcion estado;

    private LocalDate fechaCancelacion;

    @NotNull
    private LocalDate fechaCobro;

    private Long usuarioId;

    private Long comercioId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public EstadoSuscripcion getEstado() {
        return estado;
    }

    public void setEstado(EstadoSuscripcion estado) {
        this.estado = estado;
    }

    public LocalDate getFechaCancelacion() {
        return fechaCancelacion;
    }

    public void setFechaCancelacion(LocalDate fechaCancelacion) {
        this.fechaCancelacion = fechaCancelacion;
    }

    public LocalDate getFechaCobro() {
        return fechaCobro;
    }

    public void setFechaCobro(LocalDate fechaCobro) {
        this.fechaCobro = fechaCobro;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
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

        SuscripcionDTO suscripcionDTO = (SuscripcionDTO) o;
        if(suscripcionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), suscripcionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SuscripcionDTO{" +
            "id=" + getId() +
            ", detalle='" + getDetalle() + "'" +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", estado='" + getEstado() + "'" +
            ", fechaCancelacion='" + getFechaCancelacion() + "'" +
            ", fechaCobro='" + getFechaCobro() + "'" +
            "}";
    }
}
