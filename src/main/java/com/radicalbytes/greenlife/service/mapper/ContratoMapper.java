package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.ContratoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Contrato and its DTO ContratoDTO.
 */
@Mapper(componentModel = "spring", uses = {TipoContratoMapper.class, ComercioMapper.class})
public interface ContratoMapper extends EntityMapper<ContratoDTO, Contrato> {

    @Mapping(source = "tipo.id", target = "tipoId")
    @Mapping(source = "comercio.id", target = "comercioId")
    ContratoDTO toDto(Contrato contrato);

    @Mapping(source = "tipoId", target = "tipo")
    @Mapping(source = "comercioId", target = "comercio")
    Contrato toEntity(ContratoDTO contratoDTO);

    default Contrato fromId(Long id) {
        if (id == null) {
            return null;
        }
        Contrato contrato = new Contrato();
        contrato.setId(id);
        return contrato;
    }
}
