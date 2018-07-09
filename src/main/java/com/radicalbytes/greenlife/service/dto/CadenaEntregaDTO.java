package com.radicalbytes.greenlife.service.dto;


import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.radicalbytes.greenlife.domain.enumeration.EstadoCadena;

/**
 * A DTO for the CadenaEntrega entity.
 */
public class CadenaEntregaDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 200)
    private String info;

    @NotNull
    private LocalDate fecha;

    private EstadoCadena estado;

    private Long entregaId;

    private Long previoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public EstadoCadena getEstado() {
        return estado;
    }

    public void setEstado(EstadoCadena estado) {
        this.estado = estado;
    }

    public Long getEntregaId() {
        return entregaId;
    }

    public void setEntregaId(Long entregaId) {
        this.entregaId = entregaId;
    }

    public Long getPrevioId() {
        return previoId;
    }

    public void setPrevioId(Long cadenaEntregaId) {
        this.previoId = cadenaEntregaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CadenaEntregaDTO cadenaEntregaDTO = (CadenaEntregaDTO) o;
        if(cadenaEntregaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cadenaEntregaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CadenaEntregaDTO{" +
            "id=" + getId() +
            ", info='" + getInfo() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
