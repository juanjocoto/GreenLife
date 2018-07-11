package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.PedidoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Pedido and its DTO PedidoDTO.
 */
@Mapper(componentModel = "spring", uses = {SuscripcionMapper.class, DiaEntregaMapper.class, LocalMapper.class})
public interface PedidoMapper extends EntityMapper<PedidoDTO, Pedido> {

    @Mapping(source = "suscripcion.id", target = "suscripcionId")
    @Mapping(source = "diasEntrega.id", target = "diasEntregaId")
    @Mapping(source = "diasEntrega.nombre", target = "diasEntregaNombre")
    @Mapping(source = "local.id", target = "localId")
    @Mapping(source = "local.nombre", target = "localNombre")
    PedidoDTO toDto(Pedido pedido);

    @Mapping(source = "suscripcionId", target = "suscripcion")
    @Mapping(target = "entregases", ignore = true)
    @Mapping(target = "lineas", ignore = true)
    @Mapping(source = "diasEntregaId", target = "diasEntrega")
    @Mapping(source = "localId", target = "local")
    Pedido toEntity(PedidoDTO pedidoDTO);

    default Pedido fromId(Long id) {
        if (id == null) {
            return null;
        }
        Pedido pedido = new Pedido();
        pedido.setId(id);
        return pedido;
    }
}
