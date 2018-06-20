package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.CadenaOrdenRecoleccion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CadenaOrdenRecoleccion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CadenaOrdenRecoleccionRepository extends JpaRepository<CadenaOrdenRecoleccion, Long> {

}
