package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.TipoContrato;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TipoContrato entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoContratoRepository extends JpaRepository<TipoContrato, Long> {

}
