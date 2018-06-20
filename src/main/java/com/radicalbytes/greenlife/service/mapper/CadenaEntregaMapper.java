package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.CadenaEntregaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CadenaEntrega and its DTO CadenaEntregaDTO.
 */
@Mapper(componentModel = "spring", uses = {EntregaMapper.class})
public interface CadenaEntregaMapper extends EntityMapper<CadenaEntregaDTO, CadenaEntrega> {

    @Mapping(source = "entrega.id", target = "entregaId")
    @Mapping(source = "previo.id", target = "previoId")
    CadenaEntregaDTO toDto(CadenaEntrega cadenaEntrega);

    @Mapping(source = "entregaId", target = "entrega")
    @Mapping(source = "previoId", target = "previo")
    CadenaEntrega toEntity(CadenaEntregaDTO cadenaEntregaDTO);

    default CadenaEntrega fromId(Long id) {
        if (id == null) {
            return null;
        }
        CadenaEntrega cadenaEntrega = new CadenaEntrega();
        cadenaEntrega.setId(id);
        return cadenaEntrega;
    }
}
