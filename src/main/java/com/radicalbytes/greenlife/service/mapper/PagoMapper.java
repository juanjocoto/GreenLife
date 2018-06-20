package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.PagoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Pago and its DTO PagoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PagoMapper extends EntityMapper<PagoDTO, Pago> {



    default Pago fromId(Long id) {
        if (id == null) {
            return null;
        }
        Pago pago = new Pago();
        pago.setId(id);
        return pago;
    }
}
