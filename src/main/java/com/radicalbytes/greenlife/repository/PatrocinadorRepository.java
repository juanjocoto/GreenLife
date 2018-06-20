package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.Patrocinador;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Patrocinador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PatrocinadorRepository extends JpaRepository<Patrocinador, Long> {
    @Query("select distinct patrocinador from Patrocinador patrocinador left join fetch patrocinador.eventos")
    List<Patrocinador> findAllWithEagerRelationships();

    @Query("select patrocinador from Patrocinador patrocinador left join fetch patrocinador.eventos where patrocinador.id =:id")
    Patrocinador findOneWithEagerRelationships(@Param("id") Long id);

}
