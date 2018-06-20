package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.Producto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Producto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    @Query("select distinct producto from Producto producto left join fetch producto.etiquetas left join fetch producto.categorias")
    List<Producto> findAllWithEagerRelationships();

    @Query("select producto from Producto producto left join fetch producto.etiquetas left join fetch producto.categorias where producto.id =:id")
    Producto findOneWithEagerRelationships(@Param("id") Long id);

}
