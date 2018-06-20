package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.LocalDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Local and its DTO LocalDTO.
 */
@Mapper(componentModel = "spring", uses = {FotografiaMapper.class, ComercioMapper.class})
public interface LocalMapper extends EntityMapper<LocalDTO, Local> {

    @Mapping(source = "fachada.id", target = "fachadaId")
    @Mapping(source = "comercio.id", target = "comercioId")
    @Mapping(source = "comercio.razonSocial", target = "comercioRazonSocial")
    LocalDTO toDto(Local local);

    @Mapping(source = "fachadaId", target = "fachada")
    @Mapping(source = "comercioId", target = "comercio")
    Local toEntity(LocalDTO localDTO);

    default Local fromId(Long id) {
        if (id == null) {
            return null;
        }
        Local local = new Local();
        local.setId(id);
        return local;
    }
}
