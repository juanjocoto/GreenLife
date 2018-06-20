package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.Permiso;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Permiso entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PermisoRepository extends JpaRepository<Permiso, Long> {

}
