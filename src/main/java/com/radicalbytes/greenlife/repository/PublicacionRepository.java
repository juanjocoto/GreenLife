package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.Publicacion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Publicacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {
    @Query("select distinct publicacion from Publicacion publicacion left join fetch publicacion.etiquetas")
    List<Publicacion> findAllWithEagerRelationships();

    @Query("select publicacion from Publicacion publicacion left join fetch publicacion.etiquetas where publicacion.id =:id")
    Publicacion findOneWithEagerRelationships(@Param("id") Long id);

}
