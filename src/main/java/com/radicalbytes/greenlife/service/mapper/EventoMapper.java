package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.EventoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Evento and its DTO EventoDTO.
 */
@Mapper(componentModel = "spring", uses = {EtiquetaMapper.class})
public interface EventoMapper extends EntityMapper<EventoDTO, Evento> {


    @Mapping(target = "fotos", ignore = true)
    Evento toEntity(EventoDTO eventoDTO);

    default Evento fromId(Long id) {
        if (id == null) {
            return null;
        }
        Evento evento = new Evento();
        evento.setId(id);
        return evento;
    }
}
