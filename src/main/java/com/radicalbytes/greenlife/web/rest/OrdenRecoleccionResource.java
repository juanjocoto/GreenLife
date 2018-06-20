package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.OrdenRecoleccion;

import com.radicalbytes.greenlife.repository.OrdenRecoleccionRepository;
import com.radicalbytes.greenlife.repository.search.OrdenRecoleccionSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.OrdenRecoleccionDTO;
import com.radicalbytes.greenlife.service.mapper.OrdenRecoleccionMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing OrdenRecoleccion.
 */
@RestController
@RequestMapping("/api")
public class OrdenRecoleccionResource {

    private final Logger log = LoggerFactory.getLogger(OrdenRecoleccionResource.class);

    private static final String ENTITY_NAME = "ordenRecoleccion";

    private final OrdenRecoleccionRepository ordenRecoleccionRepository;

    private final OrdenRecoleccionMapper ordenRecoleccionMapper;

    private final OrdenRecoleccionSearchRepository ordenRecoleccionSearchRepository;

    public OrdenRecoleccionResource(OrdenRecoleccionRepository ordenRecoleccionRepository, OrdenRecoleccionMapper ordenRecoleccionMapper, OrdenRecoleccionSearchRepository ordenRecoleccionSearchRepository) {
        this.ordenRecoleccionRepository = ordenRecoleccionRepository;
        this.ordenRecoleccionMapper = ordenRecoleccionMapper;
        this.ordenRecoleccionSearchRepository = ordenRecoleccionSearchRepository;
    }

    /**
     * POST  /orden-recoleccions : Create a new ordenRecoleccion.
     *
     * @param ordenRecoleccionDTO the ordenRecoleccionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ordenRecoleccionDTO, or with status 400 (Bad Request) if the ordenRecoleccion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/orden-recoleccions")
    @Timed
    public ResponseEntity<OrdenRecoleccionDTO> createOrdenRecoleccion(@Valid @RequestBody OrdenRecoleccionDTO ordenRecoleccionDTO) throws URISyntaxException {
        log.debug("REST request to save OrdenRecoleccion : {}", ordenRecoleccionDTO);
        if (ordenRecoleccionDTO.getId() != null) {
            throw new BadRequestAlertException("A new ordenRecoleccion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrdenRecoleccion ordenRecoleccion = ordenRecoleccionMapper.toEntity(ordenRecoleccionDTO);
        ordenRecoleccion = ordenRecoleccionRepository.save(ordenRecoleccion);
        OrdenRecoleccionDTO result = ordenRecoleccionMapper.toDto(ordenRecoleccion);
        ordenRecoleccionSearchRepository.save(ordenRecoleccion);
        return ResponseEntity.created(new URI("/api/orden-recoleccions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /orden-recoleccions : Updates an existing ordenRecoleccion.
     *
     * @param ordenRecoleccionDTO the ordenRecoleccionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ordenRecoleccionDTO,
     * or with status 400 (Bad Request) if the ordenRecoleccionDTO is not valid,
     * or with status 500 (Internal Server Error) if the ordenRecoleccionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/orden-recoleccions")
    @Timed
    public ResponseEntity<OrdenRecoleccionDTO> updateOrdenRecoleccion(@Valid @RequestBody OrdenRecoleccionDTO ordenRecoleccionDTO) throws URISyntaxException {
        log.debug("REST request to update OrdenRecoleccion : {}", ordenRecoleccionDTO);
        if (ordenRecoleccionDTO.getId() == null) {
            return createOrdenRecoleccion(ordenRecoleccionDTO);
        }
        OrdenRecoleccion ordenRecoleccion = ordenRecoleccionMapper.toEntity(ordenRecoleccionDTO);
        ordenRecoleccion = ordenRecoleccionRepository.save(ordenRecoleccion);
        OrdenRecoleccionDTO result = ordenRecoleccionMapper.toDto(ordenRecoleccion);
        ordenRecoleccionSearchRepository.save(ordenRecoleccion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ordenRecoleccionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /orden-recoleccions : get all the ordenRecoleccions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ordenRecoleccions in body
     */
    @GetMapping("/orden-recoleccions")
    @Timed
    public List<OrdenRecoleccionDTO> getAllOrdenRecoleccions() {
        log.debug("REST request to get all OrdenRecoleccions");
        List<OrdenRecoleccion> ordenRecoleccions = ordenRecoleccionRepository.findAll();
        return ordenRecoleccionMapper.toDto(ordenRecoleccions);
        }

    /**
     * GET  /orden-recoleccions/:id : get the "id" ordenRecoleccion.
     *
     * @param id the id of the ordenRecoleccionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ordenRecoleccionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/orden-recoleccions/{id}")
    @Timed
    public ResponseEntity<OrdenRecoleccionDTO> getOrdenRecoleccion(@PathVariable Long id) {
        log.debug("REST request to get OrdenRecoleccion : {}", id);
        OrdenRecoleccion ordenRecoleccion = ordenRecoleccionRepository.findOne(id);
        OrdenRecoleccionDTO ordenRecoleccionDTO = ordenRecoleccionMapper.toDto(ordenRecoleccion);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ordenRecoleccionDTO));
    }

    /**
     * DELETE  /orden-recoleccions/:id : delete the "id" ordenRecoleccion.
     *
     * @param id the id of the ordenRecoleccionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/orden-recoleccions/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrdenRecoleccion(@PathVariable Long id) {
        log.debug("REST request to delete OrdenRecoleccion : {}", id);
        ordenRecoleccionRepository.delete(id);
        ordenRecoleccionSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/orden-recoleccions?query=:query : search for the ordenRecoleccion corresponding
     * to the query.
     *
     * @param query the query of the ordenRecoleccion search
     * @return the result of the search
     */
    @GetMapping("/_search/orden-recoleccions")
    @Timed
    public List<OrdenRecoleccionDTO> searchOrdenRecoleccions(@RequestParam String query) {
        log.debug("REST request to search OrdenRecoleccions for query {}", query);
        return StreamSupport
            .stream(ordenRecoleccionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(ordenRecoleccionMapper::toDto)
            .collect(Collectors.toList());
    }

}
