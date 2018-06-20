package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.SolicitudPatrocinio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SolicitudPatrocinio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolicitudPatrocinioRepository extends JpaRepository<SolicitudPatrocinio, Long> {

}
