package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.EtiquetaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Etiqueta and its DTO EtiquetaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EtiquetaMapper extends EntityMapper<EtiquetaDTO, Etiqueta> {

    default Etiqueta fromId(Long id) {
        if (id == null) {
            return null;
        }
        Etiqueta etiqueta = new Etiqueta();
        etiqueta.setId(id);
        return etiqueta;
    }
}
