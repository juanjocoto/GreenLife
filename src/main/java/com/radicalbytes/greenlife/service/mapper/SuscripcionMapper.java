package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.SuscripcionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Suscripcion and its DTO SuscripcionDTO.
 */
@Mapper(componentModel = "spring", uses = {ClienteMapper.class, ComercioMapper.class})
public interface SuscripcionMapper extends EntityMapper<SuscripcionDTO, Suscripcion> {

    @Mapping(source = "cliente.id", target = "clienteId")
    @Mapping(source = "comercio.id", target = "comercioId")
    SuscripcionDTO toDto(Suscripcion suscripcion);

    @Mapping(source = "clienteId", target = "cliente")
    @Mapping(source = "comercioId", target = "comercio")
    @Mapping(target = "pedidos", ignore = true)
    @Mapping(target = "historicoEntregases", ignore = true)
    Suscripcion toEntity(SuscripcionDTO suscripcionDTO);

    default Suscripcion fromId(Long id) {
        if (id == null) {
            return null;
        }
        Suscripcion suscripcion = new Suscripcion();
        suscripcion.setId(id);
        return suscripcion;
    }
}
