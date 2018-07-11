package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.LineaProductoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity LineaProducto and its DTO LineaProductoDTO.
 */
@Mapper(componentModel = "spring", uses = {PedidoMapper.class, ProductoMapper.class})
public interface LineaProductoMapper extends EntityMapper<LineaProductoDTO, LineaProducto> {

    @Mapping(source = "pedido.id", target = "pedidoId")
    @Mapping(source = "producto.id", target = "productoId")
    LineaProductoDTO toDto(LineaProducto lineaProducto);

    @Mapping(source = "pedidoId", target = "pedido")
    @Mapping(source = "productoId", target = "producto")
    LineaProducto toEntity(LineaProductoDTO lineaProductoDTO);

    default LineaProducto fromId(Long id) {
        if (id == null) {
            return null;
        }
        LineaProducto lineaProducto = new LineaProducto();
        lineaProducto.setId(id);
        return lineaProducto;
    }
}
