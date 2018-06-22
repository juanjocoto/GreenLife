package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.ResenaComercioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ResenaComercio and its DTO ResenaComercioDTO.
 */
@Mapper(componentModel = "spring", uses = {UsuarioMapper.class, ComercioMapper.class})
public interface ResenaComercioMapper extends EntityMapper<ResenaComercioDTO, ResenaComercio> {

    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "comercio.id", target = "comercioId")
    ResenaComercioDTO toDto(ResenaComercio resenaComercio);

    @Mapping(source = "usuarioId", target = "usuario")
    @Mapping(source = "comercioId", target = "comercio")
    ResenaComercio toEntity(ResenaComercioDTO resenaComercioDTO);

    default ResenaComercio fromId(Long id) {
        if (id == null) {
            return null;
        }
        ResenaComercio resenaComercio = new ResenaComercio();
        resenaComercio.setId(id);
        return resenaComercio;
    }
}
