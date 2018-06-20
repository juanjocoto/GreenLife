package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.CategoriaAlimentacionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CategoriaAlimentacion and its DTO CategoriaAlimentacionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CategoriaAlimentacionMapper extends EntityMapper<CategoriaAlimentacionDTO, CategoriaAlimentacion> {



    default CategoriaAlimentacion fromId(Long id) {
        if (id == null) {
            return null;
        }
        CategoriaAlimentacion categoriaAlimentacion = new CategoriaAlimentacion();
        categoriaAlimentacion.setId(id);
        return categoriaAlimentacion;
    }
}
