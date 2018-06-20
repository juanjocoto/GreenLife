package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.RecolectorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Recolector and its DTO RecolectorDTO.
 */
@Mapper(componentModel = "spring", uses = {UsuarioMapper.class})
public interface RecolectorMapper extends EntityMapper<RecolectorDTO, Recolector> {

    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "usuario.nombre", target = "usuarioNombre")
    RecolectorDTO toDto(Recolector recolector);

    @Mapping(source = "usuarioId", target = "usuario")
    @Mapping(target = "ordenes", ignore = true)
    Recolector toEntity(RecolectorDTO recolectorDTO);

    default Recolector fromId(Long id) {
        if (id == null) {
            return null;
        }
        Recolector recolector = new Recolector();
        recolector.setId(id);
        return recolector;
    }
}
