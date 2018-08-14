package com.radicalbytes.greenlife.repository;

import java.util.List;

import com.radicalbytes.greenlife.domain.Pedido;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Pedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findAllByLocal_id(Long id);

	List<Pedido> findAllBySuscripcion_id(Long id);

	List<Pedido> findAllByDiasEntrega_nombre(String dayWeek);

	@Query("SELECT pedido FROM Pedido pedido WHERE pedido.suscripcion.estado = com.radicalbytes.greenlife.domain.enumeration.EstadoSuscripcion.VIGENTE AND pedido.diasEntrega.nombre =:dayWeek")
	List<Pedido> query(@Param("dayWeek") String dayWeek);

}
