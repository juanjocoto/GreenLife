package com.radicalbytes.greenlife.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Pedido entity.
 */
public class PedidoDTO implements Serializable {

    private Long id;

    @NotNull
    private String hora;

    private Long suscripcionId;

    private Long lineasId;

    private Long diasEntregaId;

    private String diasEntregaNombre;

    private Long localId;

    private String localNombre;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public Long getSuscripcionId() {
        return suscripcionId;
    }

    public void setSuscripcionId(Long suscripcionId) {
        this.suscripcionId = suscripcionId;
    }

    public Long getLineasId() {
        return lineasId;
    }

    public void setLineasId(Long lineaProductoId) {
        this.lineasId = lineaProductoId;
    }

    public Long getDiasEntregaId() {
        return diasEntregaId;
    }

    public void setDiasEntregaId(Long diaEntregaId) {
        this.diasEntregaId = diaEntregaId;
    }

    public String getDiasEntregaNombre() {
        return diasEntregaNombre;
    }

    public void setDiasEntregaNombre(String diaEntregaNombre) {
        this.diasEntregaNombre = diaEntregaNombre;
    }

    public Long getLocalId() {
        return localId;
    }

    public void setLocalId(Long localId) {
        this.localId = localId;
    }

    public String getLocalNombre() {
        return localNombre;
    }

    public void setLocalNombre(String localNombre) {
        this.localNombre = localNombre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PedidoDTO pedidoDTO = (PedidoDTO) o;
        if(pedidoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pedidoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PedidoDTO{" +
            "id=" + getId() +
            ", hora='" + getHora() + "'" +
            "}";
    }
}
