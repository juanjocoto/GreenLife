package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.CobroSuscripcion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CobroSuscripcion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CobroSuscripcionRepository extends JpaRepository<CobroSuscripcion, Long> {

}
