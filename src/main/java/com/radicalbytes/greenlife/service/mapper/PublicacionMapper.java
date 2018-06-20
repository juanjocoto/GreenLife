package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.PublicacionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Publicacion and its DTO PublicacionDTO.
 */
@Mapper(componentModel = "spring", uses = {UsuarioMapper.class, EtiquetaMapper.class})
public interface PublicacionMapper extends EntityMapper<PublicacionDTO, Publicacion> {

    @Mapping(source = "usuario.id", target = "usuarioId")
    PublicacionDTO toDto(Publicacion publicacion);

    @Mapping(source = "usuarioId", target = "usuario")
    @Mapping(target = "comentarios", ignore = true)
    @Mapping(target = "fotos", ignore = true)
    Publicacion toEntity(PublicacionDTO publicacionDTO);

    default Publicacion fromId(Long id) {
        if (id == null) {
            return null;
        }
        Publicacion publicacion = new Publicacion();
        publicacion.setId(id);
        return publicacion;
    }
}
