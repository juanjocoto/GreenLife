package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Suscripcion;

import com.radicalbytes.greenlife.repository.SuscripcionRepository;
import com.radicalbytes.greenlife.repository.search.SuscripcionSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.SuscripcionDTO;
import com.radicalbytes.greenlife.service.mapper.SuscripcionMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Suscripcion.
 */
@RestController
@RequestMapping("/api")
public class SuscripcionResource {

    private final Logger log = LoggerFactory.getLogger(SuscripcionResource.class);

    private static final String ENTITY_NAME = "suscripcion";

    private final SuscripcionRepository suscripcionRepository;

    private final SuscripcionMapper suscripcionMapper;

    private final SuscripcionSearchRepository suscripcionSearchRepository;

    public SuscripcionResource(SuscripcionRepository suscripcionRepository, SuscripcionMapper suscripcionMapper, SuscripcionSearchRepository suscripcionSearchRepository) {
        this.suscripcionRepository = suscripcionRepository;
        this.suscripcionMapper = suscripcionMapper;
        this.suscripcionSearchRepository = suscripcionSearchRepository;
    }

    /**
     * POST  /suscripcions : Create a new suscripcion.
     *
     * @param suscripcionDTO the suscripcionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new suscripcionDTO, or with status 400 (Bad Request) if the suscripcion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/suscripcions")
    @Timed
    public ResponseEntity<SuscripcionDTO> createSuscripcion(@Valid @RequestBody SuscripcionDTO suscripcionDTO) throws URISyntaxException {
        log.debug("REST request to save Suscripcion : {}", suscripcionDTO);
        if (suscripcionDTO.getId() != null) {
            throw new BadRequestAlertException("A new suscripcion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Suscripcion suscripcion = suscripcionMapper.toEntity(suscripcionDTO);
        suscripcion = suscripcionRepository.save(suscripcion);
        SuscripcionDTO result = suscripcionMapper.toDto(suscripcion);
        suscripcionSearchRepository.save(suscripcion);
        return ResponseEntity.created(new URI("/api/suscripcions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /suscripcions : Updates an existing suscripcion.
     *
     * @param suscripcionDTO the suscripcionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated suscripcionDTO,
     * or with status 400 (Bad Request) if the suscripcionDTO is not valid,
     * or with status 500 (Internal Server Error) if the suscripcionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/suscripcions")
    @Timed
    public ResponseEntity<SuscripcionDTO> updateSuscripcion(@Valid @RequestBody SuscripcionDTO suscripcionDTO) throws URISyntaxException {
        log.debug("REST request to update Suscripcion : {}", suscripcionDTO);
        if (suscripcionDTO.getId() == null) {
            return createSuscripcion(suscripcionDTO);
        }
        Suscripcion suscripcion = suscripcionMapper.toEntity(suscripcionDTO);
        suscripcion = suscripcionRepository.save(suscripcion);
        SuscripcionDTO result = suscripcionMapper.toDto(suscripcion);
        suscripcionSearchRepository.save(suscripcion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, suscripcionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /suscripcions : get all the suscripcions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of suscripcions in body
     */
    @GetMapping("/suscripcions")
    @Timed
    public List<SuscripcionDTO> getAllSuscripcions() {
        log.debug("REST request to get all Suscripcions");
        List<Suscripcion> suscripcions = suscripcionRepository.findAll();
        return suscripcionMapper.toDto(suscripcions);
        }

    /**
     * GET  /suscripcions/:id : get the "id" suscripcion.
     *
     * @param id the id of the suscripcionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the suscripcionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/suscripcions/{id}")
    @Timed
    public ResponseEntity<SuscripcionDTO> getSuscripcion(@PathVariable Long id) {
        log.debug("REST request to get Suscripcion : {}", id);
        Suscripcion suscripcion = suscripcionRepository.findOne(id);
        SuscripcionDTO suscripcionDTO = suscripcionMapper.toDto(suscripcion);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(suscripcionDTO));
    }

    /**
     * DELETE  /suscripcions/:id : delete the "id" suscripcion.
     *
     * @param id the id of the suscripcionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/suscripcions/{id}")
    @Timed
    public ResponseEntity<Void> deleteSuscripcion(@PathVariable Long id) {
        log.debug("REST request to delete Suscripcion : {}", id);
        suscripcionRepository.delete(id);
        suscripcionSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/suscripcions?query=:query : search for the suscripcion corresponding
     * to the query.
     *
     * @param query the query of the suscripcion search
     * @return the result of the search
     */
    @GetMapping("/_search/suscripcions")
    @Timed
    public List<SuscripcionDTO> searchSuscripcions(@RequestParam String query) {
        log.debug("REST request to search Suscripcions for query {}", query);
        return StreamSupport
            .stream(suscripcionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(suscripcionMapper::toDto)
            .collect(Collectors.toList());
    }

    @GetMapping("/suscripcions/comercio/{id}")
    @Timed
    @Transactional
    public ResponseEntity<List<SuscripcionDTO>> getSuscripcionByComercio(@PathVariable Long id) {
        log.debug("REST request to get Suscripcion : {}", id);
        List<Suscripcion> suscripciones = suscripcionRepository.findAllByComercio_id(id);
        List<SuscripcionDTO> suscripcionesDTO = suscripcionMapper.toDto(suscripciones);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(suscripcionesDTO));
    }

}
