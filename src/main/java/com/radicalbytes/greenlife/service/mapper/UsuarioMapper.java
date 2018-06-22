package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.UsuarioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Usuario and its DTO UsuarioDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface UsuarioMapper extends EntityMapper<UsuarioDTO, Usuario> {

    @Mapping(source = "userDetail.id", target = "userDetailId")
    UsuarioDTO toDto(Usuario usuario);

    @Mapping(source = "userDetailId", target = "userDetail")
    @Mapping(target = "resenasComercios", ignore = true)
    @Mapping(target = "suscripciones", ignore = true)
    @Mapping(target = "solicitudesRecoleccions", ignore = true)
    @Mapping(target = "ordenes", ignore = true)
    @Mapping(target = "publicaciones", ignore = true)
    @Mapping(target = "comentarios", ignore = true)
    @Mapping(target = "comercios", ignore = true)
    Usuario toEntity(UsuarioDTO usuarioDTO);

    default Usuario fromId(Long id) {
        if (id == null) {
            return null;
        }
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }
}
