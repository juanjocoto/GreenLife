package com.radicalbytes.greenlife.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the CobroSuscripcion entity.
 */
public class CobroSuscripcionDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate fecha;

    private Long pagoId;

    private Long clienteId;

    private Long comercioId;

    private Long suscripcionId;

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

    public Long getPagoId() {
        return pagoId;
    }

    public void setPagoId(Long pagoId) {
        this.pagoId = pagoId;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long usuarioId) {
        this.clienteId = usuarioId;
    }

    public Long getComercioId() {
        return comercioId;
    }

    public void setComercioId(Long comercioId) {
        this.comercioId = comercioId;
    }

    public Long getSuscripcionId() {
        return suscripcionId;
    }

    public void setSuscripcionId(Long suscripcionId) {
        this.suscripcionId = suscripcionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CobroSuscripcionDTO cobroSuscripcionDTO = (CobroSuscripcionDTO) o;
        if(cobroSuscripcionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cobroSuscripcionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CobroSuscripcionDTO{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
