package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.CentroAcopioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CentroAcopio and its DTO CentroAcopioDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CentroAcopioMapper extends EntityMapper<CentroAcopioDTO, CentroAcopio> {


    @Mapping(target = "fotos", ignore = true)
    CentroAcopio toEntity(CentroAcopioDTO centroAcopioDTO);

    default CentroAcopio fromId(Long id) {
        if (id == null) {
            return null;
        }
        CentroAcopio centroAcopio = new CentroAcopio();
        centroAcopio.setId(id);
        return centroAcopio;
    }
}
