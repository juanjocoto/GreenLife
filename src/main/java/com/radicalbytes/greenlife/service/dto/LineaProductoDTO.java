package com.radicalbytes.greenlife.service.dto;


import java.io.Serializable;
import java.util.Objects;

import javax.validation.constraints.NotNull;

/**
 * A DTO for the LineaProducto entity.
 */
public class LineaProductoDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer cantidad;

    private Long productoId;

    public Long getId() {
        return id;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LineaProductoDTO lineaProductoDTO = (LineaProductoDTO) o;
        if(lineaProductoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lineaProductoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LineaProductoDTO{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            "}";
    }
}
