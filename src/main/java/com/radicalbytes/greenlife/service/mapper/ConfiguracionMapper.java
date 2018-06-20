package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.ConfiguracionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Configuracion and its DTO ConfiguracionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ConfiguracionMapper extends EntityMapper<ConfiguracionDTO, Configuracion> {



    default Configuracion fromId(Long id) {
        if (id == null) {
            return null;
        }
        Configuracion configuracion = new Configuracion();
        configuracion.setId(id);
        return configuracion;
    }
}
