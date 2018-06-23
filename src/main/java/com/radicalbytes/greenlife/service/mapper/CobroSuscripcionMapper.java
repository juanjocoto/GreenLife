package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.CobroSuscripcionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CobroSuscripcion and its DTO CobroSuscripcionDTO.
 */
@Mapper(componentModel = "spring", uses = {PagoMapper.class, UsuarioMapper.class, ComercioMapper.class, SuscripcionMapper.class})
public interface CobroSuscripcionMapper extends EntityMapper<CobroSuscripcionDTO, CobroSuscripcion> {

    @Mapping(source = "pago.id", target = "pagoId")
    @Mapping(source = "cliente.id", target = "clienteId")
    @Mapping(source = "comercio.id", target = "comercioId")
    @Mapping(source = "suscripcion.id", target = "suscripcionId")
    CobroSuscripcionDTO toDto(CobroSuscripcion cobroSuscripcion);

    @Mapping(source = "pagoId", target = "pago")
    @Mapping(source = "clienteId", target = "cliente")
    @Mapping(source = "comercioId", target = "comercio")
    @Mapping(source = "suscripcionId", target = "suscripcion")
    CobroSuscripcion toEntity(CobroSuscripcionDTO cobroSuscripcionDTO);

    default CobroSuscripcion fromId(Long id) {
        if (id == null) {
            return null;
        }
        CobroSuscripcion cobroSuscripcion = new CobroSuscripcion();
        cobroSuscripcion.setId(id);
        return cobroSuscripcion;
    }
}
