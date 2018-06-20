package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.OrdenRecoleccionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrdenRecoleccion and its DTO OrdenRecoleccionDTO.
 */
@Mapper(componentModel = "spring", uses = {ClienteMapper.class, RecolectorMapper.class})
public interface OrdenRecoleccionMapper extends EntityMapper<OrdenRecoleccionDTO, OrdenRecoleccion> {

    @Mapping(source = "cliente.id", target = "clienteId")
    @Mapping(source = "recolector.id", target = "recolectorId")
    OrdenRecoleccionDTO toDto(OrdenRecoleccion ordenRecoleccion);

    @Mapping(source = "clienteId", target = "cliente")
    @Mapping(source = "recolectorId", target = "recolector")
    @Mapping(target = "estados", ignore = true)
    OrdenRecoleccion toEntity(OrdenRecoleccionDTO ordenRecoleccionDTO);

    default OrdenRecoleccion fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrdenRecoleccion ordenRecoleccion = new OrdenRecoleccion();
        ordenRecoleccion.setId(id);
        return ordenRecoleccion;
    }
}
