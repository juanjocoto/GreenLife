package com.radicalbytes.greenlife.repository;

import java.util.List;

import com.radicalbytes.greenlife.domain.Entrega;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Entrega entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntregaRepository extends JpaRepository<Entrega, Long> {

    @Query("SELECT entrega FROM Entrega AS entrega INNER JOIN Suscripcion AS s ON entrega.suscripcion_id = s.id WHERE s.comercio_id = ?")
    List<Entrega> queryFindByComercioId(long id);
}
