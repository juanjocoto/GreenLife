package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.ComercioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Comercio and its DTO ComercioDTO.
 */
@Mapper(componentModel = "spring", uses = {EtiquetaMapper.class, CategoriaAlimentacionMapper.class, UsuarioMapper.class})
public interface ComercioMapper extends EntityMapper<ComercioDTO, Comercio> {

    @Mapping(source = "dueno.id", target = "duenoId")
    ComercioDTO toDto(Comercio comercio);

    @Mapping(target = "resenasClientes", ignore = true)
    @Mapping(target = "resenasPropias", ignore = true)
    @Mapping(target = "productos", ignore = true)
    @Mapping(target = "locales", ignore = true)
    @Mapping(target = "suscriptores", ignore = true)
    @Mapping(target = "fotos", ignore = true)
    @Mapping(target = "contratos", ignore = true)
    @Mapping(source = "duenoId", target = "dueno")
    Comercio toEntity(ComercioDTO comercioDTO);

    default Comercio fromId(Long id) {
        if (id == null) {
            return null;
        }
        Comercio comercio = new Comercio();
        comercio.setId(id);
        return comercio;
    }
}
