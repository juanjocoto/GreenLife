package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.Comercio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Comercio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComercioRepository extends JpaRepository<Comercio, Long> {
    @Query("select distinct comercio from Comercio comercio left join fetch comercio.etiquetas left join fetch comercio.categorias")
    List<Comercio> findAllWithEagerRelationships();

    @Query("select comercio from Comercio comercio left join fetch comercio.etiquetas left join fetch comercio.categorias where comercio.id =:id")
    Comercio findOneWithEagerRelationships(@Param("id") Long id);

    List<Comercio> findAllByDueno_id(Long id);
}
