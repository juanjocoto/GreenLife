package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.LineaEntregaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity LineaEntrega and its DTO LineaEntregaDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductoMapper.class, EntregaMapper.class})
public interface LineaEntregaMapper extends EntityMapper<LineaEntregaDTO, LineaEntrega> {

    @Mapping(source = "producto.id", target = "productoId")
    @Mapping(source = "entrega.id", target = "entregaId")
    LineaEntregaDTO toDto(LineaEntrega lineaEntrega);

    @Mapping(source = "productoId", target = "producto")
    @Mapping(source = "entregaId", target = "entrega")
    LineaEntrega toEntity(LineaEntregaDTO lineaEntregaDTO);

    default LineaEntrega fromId(Long id) {
        if (id == null) {
            return null;
        }
        LineaEntrega lineaEntrega = new LineaEntrega();
        lineaEntrega.setId(id);
        return lineaEntrega;
    }
}
