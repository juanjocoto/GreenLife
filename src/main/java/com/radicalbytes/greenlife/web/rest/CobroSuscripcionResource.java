package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.CobroSuscripcion;

import com.radicalbytes.greenlife.repository.CobroSuscripcionRepository;
import com.radicalbytes.greenlife.repository.search.CobroSuscripcionSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.CobroSuscripcionDTO;
import com.radicalbytes.greenlife.service.mapper.CobroSuscripcionMapper;
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
 * REST controller for managing CobroSuscripcion.
 */
@RestController
@RequestMapping("/api")
public class CobroSuscripcionResource {

    private final Logger log = LoggerFactory.getLogger(CobroSuscripcionResource.class);

    private static final String ENTITY_NAME = "cobroSuscripcion";

    private final CobroSuscripcionRepository cobroSuscripcionRepository;

    private final CobroSuscripcionMapper cobroSuscripcionMapper;

    private final CobroSuscripcionSearchRepository cobroSuscripcionSearchRepository;

    public CobroSuscripcionResource(CobroSuscripcionRepository cobroSuscripcionRepository, CobroSuscripcionMapper cobroSuscripcionMapper, CobroSuscripcionSearchRepository cobroSuscripcionSearchRepository) {
        this.cobroSuscripcionRepository = cobroSuscripcionRepository;
        this.cobroSuscripcionMapper = cobroSuscripcionMapper;
        this.cobroSuscripcionSearchRepository = cobroSuscripcionSearchRepository;
    }

    /**
     * POST  /cobro-suscripcions : Create a new cobroSuscripcion.
     *
     * @param cobroSuscripcionDTO the cobroSuscripcionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cobroSuscripcionDTO, or with status 400 (Bad Request) if the cobroSuscripcion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cobro-suscripcions")
    @Timed
    public ResponseEntity<CobroSuscripcionDTO> createCobroSuscripcion(@Valid @RequestBody CobroSuscripcionDTO cobroSuscripcionDTO) throws URISyntaxException {
        log.debug("REST request to save CobroSuscripcion : {}", cobroSuscripcionDTO);
        if (cobroSuscripcionDTO.getId() != null) {
            throw new BadRequestAlertException("A new cobroSuscripcion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CobroSuscripcion cobroSuscripcion = cobroSuscripcionMapper.toEntity(cobroSuscripcionDTO);
        cobroSuscripcion = cobroSuscripcionRepository.save(cobroSuscripcion);
        CobroSuscripcionDTO result = cobroSuscripcionMapper.toDto(cobroSuscripcion);
        cobroSuscripcionSearchRepository.save(cobroSuscripcion);
        return ResponseEntity.created(new URI("/api/cobro-suscripcions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cobro-suscripcions : Updates an existing cobroSuscripcion.
     *
     * @param cobroSuscripcionDTO the cobroSuscripcionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cobroSuscripcionDTO,
     * or with status 400 (Bad Request) if the cobroSuscripcionDTO is not valid,
     * or with status 500 (Internal Server Error) if the cobroSuscripcionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cobro-suscripcions")
    @Timed
    public ResponseEntity<CobroSuscripcionDTO> updateCobroSuscripcion(@Valid @RequestBody CobroSuscripcionDTO cobroSuscripcionDTO) throws URISyntaxException {
        log.debug("REST request to update CobroSuscripcion : {}", cobroSuscripcionDTO);
        if (cobroSuscripcionDTO.getId() == null) {
            return createCobroSuscripcion(cobroSuscripcionDTO);
        }
        CobroSuscripcion cobroSuscripcion = cobroSuscripcionMapper.toEntity(cobroSuscripcionDTO);
        cobroSuscripcion = cobroSuscripcionRepository.save(cobroSuscripcion);
        CobroSuscripcionDTO result = cobroSuscripcionMapper.toDto(cobroSuscripcion);
        cobroSuscripcionSearchRepository.save(cobroSuscripcion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cobroSuscripcionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cobro-suscripcions : get all the cobroSuscripcions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cobroSuscripcions in body
     */
    @GetMapping("/cobro-suscripcions")
    @Timed
    public List<CobroSuscripcionDTO> getAllCobroSuscripcions() {
        log.debug("REST request to get all CobroSuscripcions");
        List<CobroSuscripcion> cobroSuscripcions = cobroSuscripcionRepository.findAll();
        return cobroSuscripcionMapper.toDto(cobroSuscripcions);
        }

    /**
     * GET  /cobro-suscripcions/:id : get the "id" cobroSuscripcion.
     *
     * @param id the id of the cobroSuscripcionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cobroSuscripcionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cobro-suscripcions/{id}")
    @Timed
    public ResponseEntity<CobroSuscripcionDTO> getCobroSuscripcion(@PathVariable Long id) {
        log.debug("REST request to get CobroSuscripcion : {}", id);
        CobroSuscripcion cobroSuscripcion = cobroSuscripcionRepository.findOne(id);
        CobroSuscripcionDTO cobroSuscripcionDTO = cobroSuscripcionMapper.toDto(cobroSuscripcion);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cobroSuscripcionDTO));
    }

    /**
     * DELETE  /cobro-suscripcions/:id : delete the "id" cobroSuscripcion.
     *
     * @param id the id of the cobroSuscripcionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cobro-suscripcions/{id}")
    @Timed
    public ResponseEntity<Void> deleteCobroSuscripcion(@PathVariable Long id) {
        log.debug("REST request to delete CobroSuscripcion : {}", id);
        cobroSuscripcionRepository.delete(id);
        cobroSuscripcionSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/cobro-suscripcions?query=:query : search for the cobroSuscripcion corresponding
     * to the query.
     *
     * @param query the query of the cobroSuscripcion search
     * @return the result of the search
     */
    @GetMapping("/_search/cobro-suscripcions")
    @Timed
    public List<CobroSuscripcionDTO> searchCobroSuscripcions(@RequestParam String query) {
        log.debug("REST request to search CobroSuscripcions for query {}", query);
        return StreamSupport
            .stream(cobroSuscripcionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(cobroSuscripcionMapper::toDto)
            .collect(Collectors.toList());
    }

}
