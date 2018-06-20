package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.CentroAcopio;

import com.radicalbytes.greenlife.repository.CentroAcopioRepository;
import com.radicalbytes.greenlife.repository.search.CentroAcopioSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.CentroAcopioDTO;
import com.radicalbytes.greenlife.service.mapper.CentroAcopioMapper;
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
 * REST controller for managing CentroAcopio.
 */
@RestController
@RequestMapping("/api")
public class CentroAcopioResource {

    private final Logger log = LoggerFactory.getLogger(CentroAcopioResource.class);

    private static final String ENTITY_NAME = "centroAcopio";

    private final CentroAcopioRepository centroAcopioRepository;

    private final CentroAcopioMapper centroAcopioMapper;

    private final CentroAcopioSearchRepository centroAcopioSearchRepository;

    public CentroAcopioResource(CentroAcopioRepository centroAcopioRepository, CentroAcopioMapper centroAcopioMapper, CentroAcopioSearchRepository centroAcopioSearchRepository) {
        this.centroAcopioRepository = centroAcopioRepository;
        this.centroAcopioMapper = centroAcopioMapper;
        this.centroAcopioSearchRepository = centroAcopioSearchRepository;
    }

    /**
     * POST  /centro-acopios : Create a new centroAcopio.
     *
     * @param centroAcopioDTO the centroAcopioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new centroAcopioDTO, or with status 400 (Bad Request) if the centroAcopio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/centro-acopios")
    @Timed
    public ResponseEntity<CentroAcopioDTO> createCentroAcopio(@Valid @RequestBody CentroAcopioDTO centroAcopioDTO) throws URISyntaxException {
        log.debug("REST request to save CentroAcopio : {}", centroAcopioDTO);
        if (centroAcopioDTO.getId() != null) {
            throw new BadRequestAlertException("A new centroAcopio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CentroAcopio centroAcopio = centroAcopioMapper.toEntity(centroAcopioDTO);
        centroAcopio = centroAcopioRepository.save(centroAcopio);
        CentroAcopioDTO result = centroAcopioMapper.toDto(centroAcopio);
        centroAcopioSearchRepository.save(centroAcopio);
        return ResponseEntity.created(new URI("/api/centro-acopios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /centro-acopios : Updates an existing centroAcopio.
     *
     * @param centroAcopioDTO the centroAcopioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated centroAcopioDTO,
     * or with status 400 (Bad Request) if the centroAcopioDTO is not valid,
     * or with status 500 (Internal Server Error) if the centroAcopioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/centro-acopios")
    @Timed
    public ResponseEntity<CentroAcopioDTO> updateCentroAcopio(@Valid @RequestBody CentroAcopioDTO centroAcopioDTO) throws URISyntaxException {
        log.debug("REST request to update CentroAcopio : {}", centroAcopioDTO);
        if (centroAcopioDTO.getId() == null) {
            return createCentroAcopio(centroAcopioDTO);
        }
        CentroAcopio centroAcopio = centroAcopioMapper.toEntity(centroAcopioDTO);
        centroAcopio = centroAcopioRepository.save(centroAcopio);
        CentroAcopioDTO result = centroAcopioMapper.toDto(centroAcopio);
        centroAcopioSearchRepository.save(centroAcopio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, centroAcopioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /centro-acopios : get all the centroAcopios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of centroAcopios in body
     */
    @GetMapping("/centro-acopios")
    @Timed
    public List<CentroAcopioDTO> getAllCentroAcopios() {
        log.debug("REST request to get all CentroAcopios");
        List<CentroAcopio> centroAcopios = centroAcopioRepository.findAll();
        return centroAcopioMapper.toDto(centroAcopios);
        }

    /**
     * GET  /centro-acopios/:id : get the "id" centroAcopio.
     *
     * @param id the id of the centroAcopioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the centroAcopioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/centro-acopios/{id}")
    @Timed
    public ResponseEntity<CentroAcopioDTO> getCentroAcopio(@PathVariable Long id) {
        log.debug("REST request to get CentroAcopio : {}", id);
        CentroAcopio centroAcopio = centroAcopioRepository.findOne(id);
        CentroAcopioDTO centroAcopioDTO = centroAcopioMapper.toDto(centroAcopio);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(centroAcopioDTO));
    }

    /**
     * DELETE  /centro-acopios/:id : delete the "id" centroAcopio.
     *
     * @param id the id of the centroAcopioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/centro-acopios/{id}")
    @Timed
    public ResponseEntity<Void> deleteCentroAcopio(@PathVariable Long id) {
        log.debug("REST request to delete CentroAcopio : {}", id);
        centroAcopioRepository.delete(id);
        centroAcopioSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/centro-acopios?query=:query : search for the centroAcopio corresponding
     * to the query.
     *
     * @param query the query of the centroAcopio search
     * @return the result of the search
     */
    @GetMapping("/_search/centro-acopios")
    @Timed
    public List<CentroAcopioDTO> searchCentroAcopios(@RequestParam String query) {
        log.debug("REST request to search CentroAcopios for query {}", query);
        return StreamSupport
            .stream(centroAcopioSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(centroAcopioMapper::toDto)
            .collect(Collectors.toList());
    }

}
