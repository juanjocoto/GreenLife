package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.ComercioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Comercio and its DTO ComercioDTO.
 */
@Mapper(componentModel = "spring", uses = {UsuarioMapper.class, EtiquetaMapper.class, CategoriaAlimentacionMapper.class})
public interface ComercioMapper extends EntityMapper<ComercioDTO, Comercio> {

    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "usuario.nombre", target = "usuarioNombre")
    ComercioDTO toDto(Comercio comercio);

    @Mapping(source = "usuarioId", target = "usuario")
    @Mapping(target = "resenasClientes", ignore = true)
    @Mapping(target = "resenasPropias", ignore = true)
    @Mapping(target = "productos", ignore = true)
    @Mapping(target = "locales", ignore = true)
    @Mapping(target = "suscriptores", ignore = true)
    @Mapping(target = "fotos", ignore = true)
    @Mapping(target = "contratos", ignore = true)
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
