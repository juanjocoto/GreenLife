package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.CobroMensualidad;

import com.radicalbytes.greenlife.repository.CobroMensualidadRepository;
import com.radicalbytes.greenlife.repository.search.CobroMensualidadSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.CobroMensualidadDTO;
import com.radicalbytes.greenlife.service.mapper.CobroMensualidadMapper;
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
 * REST controller for managing CobroMensualidad.
 */
@RestController
@RequestMapping("/api")
public class CobroMensualidadResource {

    private final Logger log = LoggerFactory.getLogger(CobroMensualidadResource.class);

    private static final String ENTITY_NAME = "cobroMensualidad";

    private final CobroMensualidadRepository cobroMensualidadRepository;

    private final CobroMensualidadMapper cobroMensualidadMapper;

    private final CobroMensualidadSearchRepository cobroMensualidadSearchRepository;

    public CobroMensualidadResource(CobroMensualidadRepository cobroMensualidadRepository, CobroMensualidadMapper cobroMensualidadMapper, CobroMensualidadSearchRepository cobroMensualidadSearchRepository) {
        this.cobroMensualidadRepository = cobroMensualidadRepository;
        this.cobroMensualidadMapper = cobroMensualidadMapper;
        this.cobroMensualidadSearchRepository = cobroMensualidadSearchRepository;
    }

    /**
     * POST  /cobro-mensualidads : Create a new cobroMensualidad.
     *
     * @param cobroMensualidadDTO the cobroMensualidadDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cobroMensualidadDTO, or with status 400 (Bad Request) if the cobroMensualidad has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cobro-mensualidads")
    @Timed
    public ResponseEntity<CobroMensualidadDTO> createCobroMensualidad(@Valid @RequestBody CobroMensualidadDTO cobroMensualidadDTO) throws URISyntaxException {
        log.debug("REST request to save CobroMensualidad : {}", cobroMensualidadDTO);
        if (cobroMensualidadDTO.getId() != null) {
            throw new BadRequestAlertException("A new cobroMensualidad cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CobroMensualidad cobroMensualidad = cobroMensualidadMapper.toEntity(cobroMensualidadDTO);
        cobroMensualidad = cobroMensualidadRepository.save(cobroMensualidad);
        CobroMensualidadDTO result = cobroMensualidadMapper.toDto(cobroMensualidad);
        cobroMensualidadSearchRepository.save(cobroMensualidad);
        return ResponseEntity.created(new URI("/api/cobro-mensualidads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cobro-mensualidads : Updates an existing cobroMensualidad.
     *
     * @param cobroMensualidadDTO the cobroMensualidadDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cobroMensualidadDTO,
     * or with status 400 (Bad Request) if the cobroMensualidadDTO is not valid,
     * or with status 500 (Internal Server Error) if the cobroMensualidadDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cobro-mensualidads")
    @Timed
    public ResponseEntity<CobroMensualidadDTO> updateCobroMensualidad(@Valid @RequestBody CobroMensualidadDTO cobroMensualidadDTO) throws URISyntaxException {
        log.debug("REST request to update CobroMensualidad : {}", cobroMensualidadDTO);
        if (cobroMensualidadDTO.getId() == null) {
            return createCobroMensualidad(cobroMensualidadDTO);
        }
        CobroMensualidad cobroMensualidad = cobroMensualidadMapper.toEntity(cobroMensualidadDTO);
        cobroMensualidad = cobroMensualidadRepository.save(cobroMensualidad);
        CobroMensualidadDTO result = cobroMensualidadMapper.toDto(cobroMensualidad);
        cobroMensualidadSearchRepository.save(cobroMensualidad);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cobroMensualidadDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cobro-mensualidads : get all the cobroMensualidads.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cobroMensualidads in body
     */
    @GetMapping("/cobro-mensualidads")
    @Timed
    public List<CobroMensualidadDTO> getAllCobroMensualidads() {
        log.debug("REST request to get all CobroMensualidads");
        List<CobroMensualidad> cobroMensualidads = cobroMensualidadRepository.findAll();
        return cobroMensualidadMapper.toDto(cobroMensualidads);
        }

    /**
     * GET  /cobro-mensualidads/:id : get the "id" cobroMensualidad.
     *
     * @param id the id of the cobroMensualidadDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cobroMensualidadDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cobro-mensualidads/{id}")
    @Timed
    public ResponseEntity<CobroMensualidadDTO> getCobroMensualidad(@PathVariable Long id) {
        log.debug("REST request to get CobroMensualidad : {}", id);
        CobroMensualidad cobroMensualidad = cobroMensualidadRepository.findOne(id);
        CobroMensualidadDTO cobroMensualidadDTO = cobroMensualidadMapper.toDto(cobroMensualidad);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cobroMensualidadDTO));
    }

    /**
     * DELETE  /cobro-mensualidads/:id : delete the "id" cobroMensualidad.
     *
     * @param id the id of the cobroMensualidadDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cobro-mensualidads/{id}")
    @Timed
    public ResponseEntity<Void> deleteCobroMensualidad(@PathVariable Long id) {
        log.debug("REST request to delete CobroMensualidad : {}", id);
        cobroMensualidadRepository.delete(id);
        cobroMensualidadSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/cobro-mensualidads?query=:query : search for the cobroMensualidad corresponding
     * to the query.
     *
     * @param query the query of the cobroMensualidad search
     * @return the result of the search
     */
    @GetMapping("/_search/cobro-mensualidads")
    @Timed
    public List<CobroMensualidadDTO> searchCobroMensualidads(@RequestParam String query) {
        log.debug("REST request to search CobroMensualidads for query {}", query);
        return StreamSupport
            .stream(cobroMensualidadSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(cobroMensualidadMapper::toDto)
            .collect(Collectors.toList());
    }

}
