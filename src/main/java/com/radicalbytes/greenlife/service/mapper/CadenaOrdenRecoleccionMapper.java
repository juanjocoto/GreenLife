package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.CadenaOrdenRecoleccionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CadenaOrdenRecoleccion and its DTO CadenaOrdenRecoleccionDTO.
 */
@Mapper(componentModel = "spring", uses = {OrdenRecoleccionMapper.class})
public interface CadenaOrdenRecoleccionMapper extends EntityMapper<CadenaOrdenRecoleccionDTO, CadenaOrdenRecoleccion> {

    @Mapping(source = "ordenRecoleccion.id", target = "ordenRecoleccionId")
    @Mapping(source = "previo.id", target = "previoId")
    CadenaOrdenRecoleccionDTO toDto(CadenaOrdenRecoleccion cadenaOrdenRecoleccion);

    @Mapping(source = "ordenRecoleccionId", target = "ordenRecoleccion")
    @Mapping(source = "previoId", target = "previo")
    CadenaOrdenRecoleccion toEntity(CadenaOrdenRecoleccionDTO cadenaOrdenRecoleccionDTO);

    default CadenaOrdenRecoleccion fromId(Long id) {
        if (id == null) {
            return null;
        }
        CadenaOrdenRecoleccion cadenaOrdenRecoleccion = new CadenaOrdenRecoleccion();
        cadenaOrdenRecoleccion.setId(id);
        return cadenaOrdenRecoleccion;
    }
}
