package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.SolicitudSuscripcion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SolicitudSuscripcion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolicitudSuscripcionRepository extends JpaRepository<SolicitudSuscripcion, Long> {

}
