package com.radicalbytes.greenlife.service.dto;


import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import javax.validation.constraints.NotNull;

/**
 * A DTO for the Entrega entity.
 */
public class EntregaDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate fechaInicio;

    private Long suscripcionId;

    private Long pedidoId;

    private Long cadenaId;

    private CadenaEntregaDTO cadena;

    private List<LineaEntregaDTO> lineas;

    public Long getId() {
        return id;
    }

    /**
	 * @return the cadenaId
	 */
	public Long getCadenaId() {
		return cadenaId;
	}

	/**
	 * @param cadenaId the cadenaId to set
	 */
	public void setCadenaId(Long cadenaId) {
		this.cadenaId = cadenaId;
	}

	/**
	 * @return the cadena
	 */
	public CadenaEntregaDTO getCadena() {
		return cadena;
	}

	/**
	 * @param cadena the cadena to set
	 */
	public void setCadena(CadenaEntregaDTO cadena) {
		this.cadena = cadena;
	}

	/**
	 * @return the lineas
	 */
	public List<LineaEntregaDTO> getLineas() {
		return lineas;
	}

	/**
	 * @param lineas the lineas to set
	 */
	public void setLineas(List<LineaEntregaDTO> lineas) {
		this.lineas = lineas;
	}

	public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Long getSuscripcionId() {
        return suscripcionId;
    }

    public void setSuscripcionId(Long suscripcionId) {
        this.suscripcionId = suscripcionId;
    }

    public Long getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(Long pedidoId) {
        this.pedidoId = pedidoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EntregaDTO entregaDTO = (EntregaDTO) o;
        if(entregaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), entregaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EntregaDTO{" +
            "id=" + getId() +
            ", fechaInicio='" + getFechaInicio() + "'" +
            "}";
    }
}
