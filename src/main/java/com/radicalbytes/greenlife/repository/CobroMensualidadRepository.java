package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.CobroMensualidad;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CobroMensualidad entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CobroMensualidadRepository extends JpaRepository<CobroMensualidad, Long> {

}
