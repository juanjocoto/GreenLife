package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.RolDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Rol and its DTO RolDTO.
 */
@Mapper(componentModel = "spring", uses = {PermisoMapper.class})
public interface RolMapper extends EntityMapper<RolDTO, Rol> {



    default Rol fromId(Long id) {
        if (id == null) {
            return null;
        }
        Rol rol = new Rol();
        rol.setId(id);
        return rol;
    }
}
