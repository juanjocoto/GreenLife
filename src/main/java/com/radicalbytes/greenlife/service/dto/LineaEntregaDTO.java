package com.radicalbytes.greenlife.service.dto;

import java.io.Serializable;
import java.util.Objects;

import javax.validation.constraints.NotNull;

/**
 * A DTO for the LineaEntrega entity.
 */
public class LineaEntregaDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer cantidad;

    private Long productoId;

    private Long entregaId;

    private ProductoDTO producto;

    public Long getId() {
        return id;
    }

    /**
     * @return the producto
     */
    public ProductoDTO getProducto() {
        return producto;
    }

    /**
     * @param producto the producto to set
     */
    public void setProducto(ProductoDTO producto) {
        this.producto = producto;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public Long getEntregaId() {
        return entregaId;
    }

    public void setEntregaId(Long entregaId) {
        this.entregaId = entregaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LineaEntregaDTO lineaEntregaDTO = (LineaEntregaDTO) o;
        if (lineaEntregaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lineaEntregaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LineaEntregaDTO{" + "id=" + getId() + ", cantidad=" + getCantidad() + "}";
    }
}
