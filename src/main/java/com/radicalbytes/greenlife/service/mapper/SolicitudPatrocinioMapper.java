package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.SolicitudPatrocinioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SolicitudPatrocinio and its DTO SolicitudPatrocinioDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SolicitudPatrocinioMapper extends EntityMapper<SolicitudPatrocinioDTO, SolicitudPatrocinio> {



    default SolicitudPatrocinio fromId(Long id) {
        if (id == null) {
            return null;
        }
        SolicitudPatrocinio solicitudPatrocinio = new SolicitudPatrocinio();
        solicitudPatrocinio.setId(id);
        return solicitudPatrocinio;
    }
}
