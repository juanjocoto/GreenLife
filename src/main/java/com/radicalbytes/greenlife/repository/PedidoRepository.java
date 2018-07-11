package com.radicalbytes.greenlife.repository;

import java.util.List;

import com.radicalbytes.greenlife.domain.Pedido;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Pedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

	List<Pedido> findAllBySuscripcion_id(Long id);

}
