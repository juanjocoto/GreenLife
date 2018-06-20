package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.ResenaCliente;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResenaCliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResenaClienteRepository extends JpaRepository<ResenaCliente, Long> {

}
