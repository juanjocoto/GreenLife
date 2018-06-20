package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.CadenaEntrega;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CadenaEntrega entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CadenaEntregaRepository extends JpaRepository<CadenaEntrega, Long> {

}
