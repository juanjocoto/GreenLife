package com.radicalbytes.greenlife.repository;

import java.util.List;

import com.radicalbytes.greenlife.domain.LineaProducto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the LineaProducto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LineaProductoRepository extends JpaRepository<LineaProducto, Long> {

	List<LineaProducto> findAllByPedido_id(long pedidoId);

}
