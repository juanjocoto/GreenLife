package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.UsuarioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Usuario and its DTO UsuarioDTO.
 */
@Mapper(componentModel = "spring", uses = {FotografiaMapper.class, UserMapper.class, RolMapper.class})
public interface UsuarioMapper extends EntityMapper<UsuarioDTO, Usuario> {

    @Mapping(source = "foto.id", target = "fotoId")
    @Mapping(source = "userDetail.id", target = "userDetailId")
    @Mapping(source = "rol.id", target = "rolId")
    @Mapping(source = "rol.nombre", target = "rolNombre")
    UsuarioDTO toDto(Usuario usuario);

    @Mapping(source = "fotoId", target = "foto")
    @Mapping(source = "userDetailId", target = "userDetail")
    @Mapping(target = "publicaciones", ignore = true)
    @Mapping(target = "comentarios", ignore = true)
    @Mapping(source = "rolId", target = "rol")
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
