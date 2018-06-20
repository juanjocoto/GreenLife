package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.ResenaComercio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResenaComercio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResenaComercioRepository extends JpaRepository<ResenaComercio, Long> {

}
