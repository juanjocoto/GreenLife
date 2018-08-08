package com.radicalbytes.greenlife.repository;

import java.util.List;

import javax.transaction.Transactional;

import com.radicalbytes.greenlife.domain.Producto;
import com.radicalbytes.greenlife.domain.ResenaComercio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;


/**
 * Spring Data JPA repository for the ResenaComercio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResenaComercioRepository extends JpaRepository<ResenaComercio, Long> {

    @Query("SELECT COALESCE(AVG(calificacion), 0) FROM ResenaComercio WHERE comercio.id=:id")
    float getCalificacion(@Param("id") Long id);

}
