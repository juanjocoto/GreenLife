package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.TipoContratoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TipoContrato and its DTO TipoContratoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TipoContratoMapper extends EntityMapper<TipoContratoDTO, TipoContrato> {



    default TipoContrato fromId(Long id) {
        if (id == null) {
            return null;
        }
        TipoContrato tipoContrato = new TipoContrato();
        tipoContrato.setId(id);
        return tipoContrato;
    }
}
