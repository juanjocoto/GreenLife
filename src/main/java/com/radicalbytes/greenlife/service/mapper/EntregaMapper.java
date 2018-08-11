package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.Entrega;
import com.radicalbytes.greenlife.service.dto.EntregaDTO;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Entrega and its DTO EntregaDTO.
 */
@Mapper(componentModel = "spring", uses = {SuscripcionMapper.class, PedidoMapper.class, CadenaEntregaMapper.class})
public interface EntregaMapper extends EntityMapper<EntregaDTO, Entrega> {

    @Mapping(source = "suscripcion.id", target = "suscripcionId")
    @Mapping(source = "pedido.id", target = "pedidoId")
    @Mapping(source = "cadena.id", target = "cadenaId")
    EntregaDTO toDto(Entrega entrega);

    @Mapping(source = "suscripcionId", target = "suscripcion")
    @Mapping(source = "pedidoId", target = "pedido")
    @Mapping(source = "cadenaId", target = "cadena")
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
