package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.CobroMensualidadDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CobroMensualidad and its DTO CobroMensualidadDTO.
 */
@Mapper(componentModel = "spring", uses = {PagoMapper.class, ContratoMapper.class})
public interface CobroMensualidadMapper extends EntityMapper<CobroMensualidadDTO, CobroMensualidad> {

    @Mapping(source = "pago.id", target = "pagoId")
    @Mapping(source = "contrato.id", target = "contratoId")
    CobroMensualidadDTO toDto(CobroMensualidad cobroMensualidad);

    @Mapping(source = "pagoId", target = "pago")
    @Mapping(source = "contratoId", target = "contrato")
    CobroMensualidad toEntity(CobroMensualidadDTO cobroMensualidadDTO);

    default CobroMensualidad fromId(Long id) {
        if (id == null) {
            return null;
        }
        CobroMensualidad cobroMensualidad = new CobroMensualidad();
        cobroMensualidad.setId(id);
        return cobroMensualidad;
    }
}
