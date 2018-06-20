package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.Configuracion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Configuracion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConfiguracionRepository extends JpaRepository<Configuracion, Long> {

}
