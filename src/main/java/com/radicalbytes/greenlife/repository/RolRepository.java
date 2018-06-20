package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.Rol;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Rol entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {
    @Query("select distinct rol from Rol rol left join fetch rol.permisos")
    List<Rol> findAllWithEagerRelationships();

    @Query("select rol from Rol rol left join fetch rol.permisos where rol.id =:id")
    Rol findOneWithEagerRelationships(@Param("id") Long id);

}
