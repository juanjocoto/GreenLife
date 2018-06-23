package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.PatrocinadorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Patrocinador and its DTO PatrocinadorDTO.
 */
@Mapper(componentModel = "spring", uses = {EventoMapper.class})
public interface PatrocinadorMapper extends EntityMapper<PatrocinadorDTO, Patrocinador> {


    @Mapping(target = "fotos", ignore = true)
    Patrocinador toEntity(PatrocinadorDTO patrocinadorDTO);

    default Patrocinador fromId(Long id) {
        if (id == null) {
            return null;
        }
        Patrocinador patrocinador = new Patrocinador();
        patrocinador.setId(id);
        return patrocinador;
    }
}
