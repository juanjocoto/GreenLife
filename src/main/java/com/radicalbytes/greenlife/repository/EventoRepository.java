package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.Evento;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Evento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    @Query("select distinct evento from Evento evento left join fetch evento.etiquetas")
    List<Evento> findAllWithEagerRelationships();

    @Query("select evento from Evento evento left join fetch evento.etiquetas where evento.id =:id")
    Evento findOneWithEagerRelationships(@Param("id") Long id);

}
