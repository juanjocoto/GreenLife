package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Recolector;

import com.radicalbytes.greenlife.repository.RecolectorRepository;
import com.radicalbytes.greenlife.repository.search.RecolectorSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.RecolectorDTO;
import com.radicalbytes.greenlife.service.mapper.RecolectorMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Recolector.
 */
@RestController
@RequestMapping("/api")
public class RecolectorResource {

    private final Logger log = LoggerFactory.getLogger(RecolectorResource.class);

    private static final String ENTITY_NAME = "recolector";

    private final RecolectorRepository recolectorRepository;

    private final RecolectorMapper recolectorMapper;

    private final RecolectorSearchRepository recolectorSearchRepository;

    public RecolectorResource(RecolectorRepository recolectorRepository, RecolectorMapper recolectorMapper, RecolectorSearchRepository recolectorSearchRepository) {
        this.recolectorRepository = recolectorRepository;
        this.recolectorMapper = recolectorMapper;
        this.recolectorSearchRepository = recolectorSearchRepository;
    }

    /**
     * POST  /recolectors : Create a new recolector.
     *
     * @param recolectorDTO the recolectorDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new recolectorDTO, or with status 400 (Bad Request) if the recolector has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/recolectors")
    @Timed
    public ResponseEntity<RecolectorDTO> createRecolector(@RequestBody RecolectorDTO recolectorDTO) throws URISyntaxException {
        log.debug("REST request to save Recolector : {}", recolectorDTO);
        if (recolectorDTO.getId() != null) {
            throw new BadRequestAlertException("A new recolector cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Recolector recolector = recolectorMapper.toEntity(recolectorDTO);
        recolector = recolectorRepository.save(recolector);
        RecolectorDTO result = recolectorMapper.toDto(recolector);
        recolectorSearchRepository.save(recolector);
        return ResponseEntity.created(new URI("/api/recolectors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /recolectors : Updates an existing recolector.
     *
     * @param recolectorDTO the recolectorDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated recolectorDTO,
     * or with status 400 (Bad Request) if the recolectorDTO is not valid,
     * or with status 500 (Internal Server Error) if the recolectorDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recolectors")
    @Timed
    public ResponseEntity<RecolectorDTO> updateRecolector(@RequestBody RecolectorDTO recolectorDTO) throws URISyntaxException {
        log.debug("REST request to update Recolector : {}", recolectorDTO);
        if (recolectorDTO.getId() == null) {
            return createRecolector(recolectorDTO);
        }
        Recolector recolector = recolectorMapper.toEntity(recolectorDTO);
        recolector = recolectorRepository.save(recolector);
        RecolectorDTO result = recolectorMapper.toDto(recolector);
        recolectorSearchRepository.save(recolector);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, recolectorDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /recolectors : get all the recolectors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of recolectors in body
     */
    @GetMapping("/recolectors")
    @Timed
    public List<RecolectorDTO> getAllRecolectors() {
        log.debug("REST request to get all Recolectors");
        List<Recolector> recolectors = recolectorRepository.findAll();
        return recolectorMapper.toDto(recolectors);
        }

    /**
     * GET  /recolectors/:id : get the "id" recolector.
     *
     * @param id the id of the recolectorDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the recolectorDTO, or with status 404 (Not Found)
     */
    @GetMapping("/recolectors/{id}")
    @Timed
    public ResponseEntity<RecolectorDTO> getRecolector(@PathVariable Long id) {
        log.debug("REST request to get Recolector : {}", id);
        Recolector recolector = recolectorRepository.findOne(id);
        RecolectorDTO recolectorDTO = recolectorMapper.toDto(recolector);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(recolectorDTO));
    }

    /**
     * DELETE  /recolectors/:id : delete the "id" recolector.
     *
     * @param id the id of the recolectorDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/recolectors/{id}")
    @Timed
    public ResponseEntity<Void> deleteRecolector(@PathVariable Long id) {
        log.debug("REST request to delete Recolector : {}", id);
        recolectorRepository.delete(id);
        recolectorSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/recolectors?query=:query : search for the recolector corresponding
     * to the query.
     *
     * @param query the query of the recolector search
     * @return the result of the search
     */
    @GetMapping("/_search/recolectors")
    @Timed
    public List<RecolectorDTO> searchRecolectors(@RequestParam String query) {
        log.debug("REST request to search Recolectors for query {}", query);
        return StreamSupport
            .stream(recolectorSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(recolectorMapper::toDto)
            .collect(Collectors.toList());
    }

}
