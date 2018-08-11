package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.Contrato;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Contrato entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContratoRepository extends JpaRepository<Contrato, Long> {
    List<Contrato> findAllByComercio_id(Long id);
    List<Contrato> findByTipo_id(Long id);
    void  deleteContratoByComercio_id(Long id);
}
