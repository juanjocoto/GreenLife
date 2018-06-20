package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.AdministradorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Administrador and its DTO AdministradorDTO.
 */
@Mapper(componentModel = "spring", uses = {UsuarioMapper.class})
public interface AdministradorMapper extends EntityMapper<AdministradorDTO, Administrador> {

    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "usuario.nombre", target = "usuarioNombre")
    AdministradorDTO toDto(Administrador administrador);

    @Mapping(source = "usuarioId", target = "usuario")
    Administrador toEntity(AdministradorDTO administradorDTO);

    default Administrador fromId(Long id) {
        if (id == null) {
            return null;
        }
        Administrador administrador = new Administrador();
        administrador.setId(id);
        return administrador;
    }
}
