package com.radicalbytes.greenlife.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.LineaProducto;
import com.radicalbytes.greenlife.repository.LineaProductoRepository;
import com.radicalbytes.greenlife.repository.search.LineaProductoSearchRepository;
import com.radicalbytes.greenlife.service.dto.LineaProductoDTO;
import com.radicalbytes.greenlife.service.mapper.LineaProductoMapper;
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

import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing LineaProducto.
 */
@RestController
@RequestMapping("/api")
public class LineaProductoResource {

    private final Logger log = LoggerFactory.getLogger(LineaProductoResource.class);

    private static final String ENTITY_NAME = "lineaProducto";

    private final LineaProductoRepository lineaProductoRepository;

    private final LineaProductoMapper lineaProductoMapper;

    private final LineaProductoSearchRepository lineaProductoSearchRepository;

    public LineaProductoResource(LineaProductoRepository lineaProductoRepository,
            LineaProductoMapper lineaProductoMapper, LineaProductoSearchRepository lineaProductoSearchRepository) {
        this.lineaProductoRepository = lineaProductoRepository;
        this.lineaProductoMapper = lineaProductoMapper;
        this.lineaProductoSearchRepository = lineaProductoSearchRepository;
    }

    /**
     * POST /linea-productos : Create a new lineaProducto.
     *
     * @param lineaProductoDTO the lineaProductoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new
     *         lineaProductoDTO, or with status 400 (Bad Request) if the
     *         lineaProducto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/linea-productos")
    @Timed
    public ResponseEntity<LineaProductoDTO> createLineaProducto(@Valid @RequestBody LineaProductoDTO lineaProductoDTO)
            throws URISyntaxException {
        log.debug("REST request to save LineaProducto : {}", lineaProductoDTO);
        if (lineaProductoDTO.getId() != null) {
            throw new BadRequestAlertException("A new lineaProducto cannot already have an ID", ENTITY_NAME,
                    "idexists");
        }
        LineaProducto lineaProducto = lineaProductoMapper.toEntity(lineaProductoDTO);
        lineaProducto = lineaProductoRepository.save(lineaProducto);
        LineaProductoDTO result = lineaProductoMapper.toDto(lineaProducto);
        lineaProductoSearchRepository.save(lineaProducto);
        return ResponseEntity.created(new URI("/api/linea-productos/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    @PostMapping("/linea-productos/bulk")
    @Timed
    public ResponseEntity<List<LineaProductoDTO>> createMultiLineaProducto(
            @Valid @RequestBody List<LineaProductoDTO> lineaProductoDTOList) throws URISyntaxException {
        List<LineaProductoDTO> results = new ArrayList<LineaProductoDTO>();
        for (LineaProductoDTO lineaProductoDTO : lineaProductoDTOList) {
            log.debug("REST request to save LineaProducto : {}", lineaProductoDTO);
            if (lineaProductoDTO.getId() != null) {
                throw new BadRequestAlertException("A new lineaProducto cannot already have an ID", ENTITY_NAME,
                        "idexists");
            }
            LineaProducto lineaProducto = lineaProductoMapper.toEntity(lineaProductoDTO);
            lineaProducto = lineaProductoRepository.save(lineaProducto);
            LineaProductoDTO result = lineaProductoMapper.toDto(lineaProducto);
            lineaProductoSearchRepository.save(lineaProducto);
            results.add(result);
        }

        return ResponseEntity.created(new URI("/api/linea-productos/"))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, "")).body(results);
    }

    /**
     * PUT /linea-productos : Updates an existing lineaProducto.
     *
     * @param lineaProductoDTO the lineaProductoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     *         lineaProductoDTO, or with status 400 (Bad Request) if the
     *         lineaProductoDTO is not valid, or with status 500 (Internal Server
     *         Error) if the lineaProductoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/linea-productos")
    @Timed
    public ResponseEntity<LineaProductoDTO> updateLineaProducto(@Valid @RequestBody LineaProductoDTO lineaProductoDTO)
            throws URISyntaxException {
        log.debug("REST request to update LineaProducto : {}", lineaProductoDTO);
        if (lineaProductoDTO.getId() == null) {
            return createLineaProducto(lineaProductoDTO);
        }
        LineaProducto lineaProducto = lineaProductoMapper.toEntity(lineaProductoDTO);
        lineaProducto = lineaProductoRepository.save(lineaProducto);
        LineaProductoDTO result = lineaProductoMapper.toDto(lineaProducto);
        lineaProductoSearchRepository.save(lineaProducto);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lineaProductoDTO.getId().toString()))
                .body(result);
    }

    @PutMapping("/linea-productos/bulk")
    @Timed
    @Transactional
    public ResponseEntity<List<LineaProductoDTO>> updateMultiLineaProducto(
            @Valid @RequestBody List<LineaProductoDTO> lineaProductoDTOList) throws URISyntaxException {
        List<LineaProductoDTO> results = new ArrayList<LineaProductoDTO>();
        for (LineaProductoDTO lineaProductoDTO : lineaProductoDTOList) {
            log.debug("REST request to save LineaProducto : {}", lineaProductoDTO);
            if (lineaProductoDTO.getId() == null) {
                results.add(createLineaProducto(lineaProductoDTO).getBody());
            } else {
                LineaProducto lineaProducto = lineaProductoMapper.toEntity(lineaProductoDTO);
                lineaProducto = lineaProductoRepository.save(lineaProducto);
                LineaProductoDTO result = lineaProductoMapper.toDto(lineaProducto);
                lineaProductoSearchRepository.save(lineaProducto);
                results.add(result);
            }
        }

        return ResponseEntity.ok().headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, "")).body(results);
    }

    /**
     * GET /linea-productos : get all the lineaProductos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of
     *         lineaProductos in body
     */
    @GetMapping("/linea-productos")
    @Timed
    public List<LineaProductoDTO> getAllLineaProductos() {
        log.debug("REST request to get all LineaProductos");
        List<LineaProducto> lineaProductos = lineaProductoRepository.findAll();
        return lineaProductoMapper.toDto(lineaProductos);
    }

    @GetMapping("/linea-productos/pedido/{pedidoId}")
    @Timed
    @Transactional
    public List<LineaProductoDTO> getLineaProductosByPedidoId(@PathVariable long pedidoId) {
        log.debug("REST request to get all LineaProductos");
        List<LineaProducto> lineaProductos = lineaProductoRepository.findAllByPedido_id(pedidoId);
        return lineaProductoMapper.toDto(lineaProductos);
    }

    /**
     * GET /linea-productos/:id : get the "id" lineaProducto.
     *
     * @param id the id of the lineaProductoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the
     *         lineaProductoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/linea-productos/{id}")
    @Timed
    public ResponseEntity<LineaProductoDTO> getLineaProducto(@PathVariable Long id) {
        log.debug("REST request to get LineaProducto : {}", id);
        LineaProducto lineaProducto = lineaProductoRepository.findOne(id);
        LineaProductoDTO lineaProductoDTO = lineaProductoMapper.toDto(lineaProducto);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(lineaProductoDTO));
    }

    /**
     * DELETE /linea-productos/:id : delete the "id" lineaProducto.
     *
     * @param id the id of the lineaProductoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/linea-productos/{id}")
    @Timed
    public ResponseEntity<Void> deleteLineaProducto(@PathVariable Long id) {
        log.debug("REST request to delete LineaProducto : {}", id);
        lineaProductoRepository.delete(id);
        lineaProductoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @DeleteMapping("/linea-productos/{ids}/bulk")
    @Timed
    public ResponseEntity<Void> deleteMultipleLineaProducto(@PathVariable String ids) {
        String[] idsArray = ids.split("-");

        String deletedIds = "";
        for (String id : idsArray) {
            log.debug("REST request to delete LineaProducto : {}", id);
            lineaProductoRepository.delete(Long.parseLong(id));
            lineaProductoSearchRepository.delete(Long.parseLong(id));
            deletedIds += id + " ";
        }
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, deletedIds)).build();
    }

    /**
     * SEARCH /_search/linea-productos?query=:query : search for the lineaProducto
     * corresponding to the query.
     *
     * @param query the query of the lineaProducto search
     * @return the result of the search
     */
    @GetMapping("/_search/linea-productos")
    @Timed
    public List<LineaProductoDTO> searchLineaProductos(@RequestParam String query) {
        log.debug("REST request to search LineaProductos for query {}", query);
        return StreamSupport.stream(lineaProductoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
                .map(lineaProductoMapper::toDto).collect(Collectors.toList());
    }

}
