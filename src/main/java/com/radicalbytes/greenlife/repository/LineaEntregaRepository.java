package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.LineaEntrega;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the LineaEntrega entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LineaEntregaRepository extends JpaRepository<LineaEntrega, Long> {

}
