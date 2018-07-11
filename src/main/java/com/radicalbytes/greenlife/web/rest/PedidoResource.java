package com.radicalbytes.greenlife.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.validation.Valid;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Pedido;
import com.radicalbytes.greenlife.repository.PedidoRepository;
import com.radicalbytes.greenlife.repository.search.PedidoSearchRepository;
import com.radicalbytes.greenlife.service.dto.PedidoDTO;
import com.radicalbytes.greenlife.service.mapper.PedidoMapper;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing Pedido.
 */
@RestController
@RequestMapping("/api")
public class PedidoResource {

    private final Logger log = LoggerFactory.getLogger(PedidoResource.class);

    private static final String ENTITY_NAME = "pedido";

    private final PedidoRepository pedidoRepository;

    private final PedidoMapper pedidoMapper;

    private final PedidoSearchRepository pedidoSearchRepository;

    public PedidoResource(PedidoRepository pedidoRepository, PedidoMapper pedidoMapper,
            PedidoSearchRepository pedidoSearchRepository) {
        this.pedidoRepository = pedidoRepository;
        this.pedidoMapper = pedidoMapper;
        this.pedidoSearchRepository = pedidoSearchRepository;
    }

    /**
     * POST /pedidos : Create a new pedido.
     *
     * @param pedidoDTO the pedidoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new
     *         pedidoDTO, or with status 400 (Bad Request) if the pedido has already
     *         an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pedidos")
    @Timed
    public ResponseEntity<PedidoDTO> createPedido(@Valid @RequestBody PedidoDTO pedidoDTO) throws URISyntaxException {
        log.debug("REST request to save Pedido : {}", pedidoDTO);
        if (pedidoDTO.getId() != null) {
            throw new BadRequestAlertException("A new pedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pedido pedido = pedidoMapper.toEntity(pedidoDTO);
        pedido = pedidoRepository.save(pedido);
        PedidoDTO result = pedidoMapper.toDto(pedido);
        pedidoSearchRepository.save(pedido);
        return ResponseEntity.created(new URI("/api/pedidos/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT /pedidos : Updates an existing pedido.
     *
     * @param pedidoDTO the pedidoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     *         pedidoDTO, or with status 400 (Bad Request) if the pedidoDTO is not
     *         valid, or with status 500 (Internal Server Error) if the pedidoDTO
     *         couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pedidos")
    @Timed
    public ResponseEntity<PedidoDTO> updatePedido(@Valid @RequestBody PedidoDTO pedidoDTO) throws URISyntaxException {
        log.debug("REST request to update Pedido : {}", pedidoDTO);
        if (pedidoDTO.getId() == null) {
            return createPedido(pedidoDTO);
        }
        Pedido pedido = pedidoMapper.toEntity(pedidoDTO);
        pedido = pedidoRepository.save(pedido);
        PedidoDTO result = pedidoMapper.toDto(pedido);
        pedidoSearchRepository.save(pedido);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pedidoDTO.getId().toString())).body(result);
    }

    /**
     * GET /pedidos : get all the pedidos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pedidos in
     *         body
     */
    @GetMapping("/pedidos")
    @Timed
    public List<PedidoDTO> getAllPedidos() {
        log.debug("REST request to get all Pedidos");
        List<Pedido> pedidos = pedidoRepository.findAll();
        return pedidoMapper.toDto(pedidos);
    }

    /**
     * GET /pedidos/:id : get the "id" pedido.
     *
     * @param id the id of the pedidoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pedidoDTO,
     *         or with status 404 (Not Found)
     */
    @GetMapping("/pedidos/{id}")
    @Timed
    public ResponseEntity<PedidoDTO> getPedido(@PathVariable Long id) {
        log.debug("REST request to get Pedido : {}", id);
        Pedido pedido = pedidoRepository.findOne(id);
        PedidoDTO pedidoDTO = pedidoMapper.toDto(pedido);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pedidoDTO));
    }

    @GetMapping("/pedidos/local/{id}")
    @Timed
    @Transactional
    public ResponseEntity<List<PedidoDTO>> getProductoByComercio(@PathVariable Long id) {
        log.debug("REST request to get Producto : {}", id);
        List<Pedido> pedidos = pedidoRepository.findAllByLocal_id(id);
        List<PedidoDTO> pedidosDTO = pedidoMapper.toDto(pedidos);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pedidosDTO));
    }

    @GetMapping("/pedidos/suscripcion/{id}")
    @Timed
    public ResponseEntity<List<PedidoDTO>> getPedidoBySucripcionId(@PathVariable Long id) {
        log.debug("REST request to get Pedido : {}", id);
        List<Pedido> pedidos = pedidoRepository.findAllBySuscripcion_id(id);
        List<PedidoDTO> pedidosDTO = pedidoMapper.toDto(pedidos);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pedidosDTO));
        // return ResponseEntity.ok().body(pedidos);
    }

    /**
     * DELETE /pedidos/:id : delete the "id" pedido.
     *
     * @param id the id of the pedidoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pedidos/{id}")
    @Timed
    public ResponseEntity<Void> deletePedido(@PathVariable Long id) {
        log.debug("REST request to delete Pedido : {}", id);
        pedidoRepository.delete(id);
        pedidoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH /_search/pedidos?query=:query : search for the pedido corresponding to
     * the query.
     *
     * @param query the query of the pedido search
     * @return the result of the search
     */
    @GetMapping("/_search/pedidos")
    @Timed
    public List<PedidoDTO> searchPedidos(@RequestParam String query) {
        log.debug("REST request to search Pedidos for query {}", query);
        return StreamSupport.stream(pedidoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
                .map(pedidoMapper::toDto).collect(Collectors.toList());
    }

}
