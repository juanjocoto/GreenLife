package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.CentroAcopio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CentroAcopio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CentroAcopioRepository extends JpaRepository<CentroAcopio, Long> {

}
