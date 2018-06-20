package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.SolicitudSuscripcionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SolicitudSuscripcion and its DTO SolicitudSuscripcionDTO.
 */
@Mapper(componentModel = "spring", uses = {ClienteMapper.class, ComercioMapper.class})
public interface SolicitudSuscripcionMapper extends EntityMapper<SolicitudSuscripcionDTO, SolicitudSuscripcion> {

    @Mapping(source = "solicitante.id", target = "solicitanteId")
    @Mapping(source = "comercio.id", target = "comercioId")
    SolicitudSuscripcionDTO toDto(SolicitudSuscripcion solicitudSuscripcion);

    @Mapping(source = "solicitanteId", target = "solicitante")
    @Mapping(source = "comercioId", target = "comercio")
    SolicitudSuscripcion toEntity(SolicitudSuscripcionDTO solicitudSuscripcionDTO);

    default SolicitudSuscripcion fromId(Long id) {
        if (id == null) {
            return null;
        }
        SolicitudSuscripcion solicitudSuscripcion = new SolicitudSuscripcion();
        solicitudSuscripcion.setId(id);
        return solicitudSuscripcion;
    }
}
