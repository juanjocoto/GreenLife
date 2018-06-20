package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.FotografiaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Fotografia and its DTO FotografiaDTO.
 */
@Mapper(componentModel = "spring", uses = {CentroAcopioMapper.class, ComercioMapper.class, ProductoMapper.class, PublicacionMapper.class, EventoMapper.class, PatrocinadorMapper.class})
public interface FotografiaMapper extends EntityMapper<FotografiaDTO, Fotografia> {

    @Mapping(source = "centroAcopio.id", target = "centroAcopioId")
    @Mapping(source = "comercio.id", target = "comercioId")
    @Mapping(source = "producto.id", target = "productoId")
    @Mapping(source = "publicacion.id", target = "publicacionId")
    @Mapping(source = "evento.id", target = "eventoId")
    @Mapping(source = "patrocinador.id", target = "patrocinadorId")
    FotografiaDTO toDto(Fotografia fotografia);

    @Mapping(source = "centroAcopioId", target = "centroAcopio")
    @Mapping(source = "comercioId", target = "comercio")
    @Mapping(source = "productoId", target = "producto")
    @Mapping(source = "publicacionId", target = "publicacion")
    @Mapping(source = "eventoId", target = "evento")
    @Mapping(source = "patrocinadorId", target = "patrocinador")
    Fotografia toEntity(FotografiaDTO fotografiaDTO);

    default Fotografia fromId(Long id) {
        if (id == null) {
            return null;
        }
        Fotografia fotografia = new Fotografia();
        fotografia.setId(id);
        return fotografia;
    }
}
