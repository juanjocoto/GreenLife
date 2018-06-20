package com.radicalbytes.greenlife.service.mapper;

import com.radicalbytes.greenlife.domain.*;
import com.radicalbytes.greenlife.service.dto.ResenaClienteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ResenaCliente and its DTO ResenaClienteDTO.
 */
@Mapper(componentModel = "spring", uses = {ComercioMapper.class, ClienteMapper.class})
public interface ResenaClienteMapper extends EntityMapper<ResenaClienteDTO, ResenaCliente> {

    @Mapping(source = "comercio.id", target = "comercioId")
    @Mapping(source = "cliente.id", target = "clienteId")
    ResenaClienteDTO toDto(ResenaCliente resenaCliente);

    @Mapping(source = "comercioId", target = "comercio")
    @Mapping(source = "clienteId", target = "cliente")
    ResenaCliente toEntity(ResenaClienteDTO resenaClienteDTO);

    default ResenaCliente fromId(Long id) {
        if (id == null) {
            return null;
        }
        ResenaCliente resenaCliente = new ResenaCliente();
        resenaCliente.setId(id);
        return resenaCliente;
    }
}
