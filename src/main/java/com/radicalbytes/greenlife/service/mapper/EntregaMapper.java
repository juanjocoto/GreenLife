package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.EntregaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Entrega and its DTO EntregaDTO.
 */
@Mapper(componentModel = "spring", uses = {SuscripcionMapper.class, PedidoMapper.class})
public interface EntregaMapper extends EntityMapper<EntregaDTO, Entrega> {

    @Mapping(source = "suscripcion.id", target = "suscripcionId")
    @Mapping(source = "pedido.id", target = "pedidoId")
    EntregaDTO toDto(Entrega entrega);

    @Mapping(source = "suscripcionId", target = "suscripcion")
    @Mapping(source = "pedidoId", target = "pedido")
    @Mapping(target = "cadenas", ignore = true)
    @Mapping(target = "lineas", ignore = true)
    Entrega toEntity(EntregaDTO entregaDTO);

    default Entrega fromId(Long id) {
        if (id == null) {
            return null;
        }
        Entrega entrega = new Entrega();
        entrega.setId(id);
        return entrega;
    }
}
