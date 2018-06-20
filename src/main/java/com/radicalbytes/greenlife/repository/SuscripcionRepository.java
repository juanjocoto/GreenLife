package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.Suscripcion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Suscripcion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SuscripcionRepository extends JpaRepository<Suscripcion, Long> {

}
