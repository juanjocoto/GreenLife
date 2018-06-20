package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.CategoriaAlimentacion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CategoriaAlimentacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoriaAlimentacionRepository extends JpaRepository<CategoriaAlimentacion, Long> {

}
