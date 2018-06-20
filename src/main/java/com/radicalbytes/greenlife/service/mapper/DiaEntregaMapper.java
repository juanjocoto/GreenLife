package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.DiaEntregaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DiaEntrega and its DTO DiaEntregaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DiaEntregaMapper extends EntityMapper<DiaEntregaDTO, DiaEntrega> {



    default DiaEntrega fromId(Long id) {
        if (id == null) {
            return null;
        }
        DiaEntrega diaEntrega = new DiaEntrega();
        diaEntrega.setId(id);
        return diaEntrega;
    }
}
