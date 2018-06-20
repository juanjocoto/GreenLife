package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.ComentarioPublicacionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ComentarioPublicacion and its DTO ComentarioPublicacionDTO.
 */
@Mapper(componentModel = "spring", uses = {UsuarioMapper.class, PublicacionMapper.class})
public interface ComentarioPublicacionMapper extends EntityMapper<ComentarioPublicacionDTO, ComentarioPublicacion> {

    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "publicacion.id", target = "publicacionId")
    ComentarioPublicacionDTO toDto(ComentarioPublicacion comentarioPublicacion);

    @Mapping(source = "usuarioId", target = "usuario")
    @Mapping(source = "publicacionId", target = "publicacion")
    ComentarioPublicacion toEntity(ComentarioPublicacionDTO comentarioPublicacionDTO);

    default ComentarioPublicacion fromId(Long id) {
        if (id == null) {
            return null;
        }
        ComentarioPublicacion comentarioPublicacion = new ComentarioPublicacion();
        comentarioPublicacion.setId(id);
        return comentarioPublicacion;
    }
}
