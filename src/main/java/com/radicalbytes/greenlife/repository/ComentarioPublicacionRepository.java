package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.ComentarioPublicacion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ComentarioPublicacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComentarioPublicacionRepository extends JpaRepository<ComentarioPublicacion, Long> {

}
