package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.Recolector;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Recolector entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecolectorRepository extends JpaRepository<Recolector, Long> {

}
