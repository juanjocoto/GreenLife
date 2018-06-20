package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.DiaEntrega;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DiaEntrega entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiaEntregaRepository extends JpaRepository<DiaEntrega, Long> {

}
