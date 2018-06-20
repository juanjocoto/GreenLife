package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.OrdenRecoleccion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OrdenRecoleccion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdenRecoleccionRepository extends JpaRepository<OrdenRecoleccion, Long> {

}
