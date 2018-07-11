package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Local;

import com.radicalbytes.greenlife.repository.LocalRepository;
import com.radicalbytes.greenlife.repository.search.LocalSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.LocalDTO;
import com.radicalbytes.greenlife.service.mapper.LocalMapper;
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
 * REST controller for managing Local.
 */
@RestController
@RequestMapping("/api")
public class LocalResource {

    private final Logger log = LoggerFactory.getLogger(LocalResource.class);

    private static final String ENTITY_NAME = "local";

    private final LocalRepository localRepository;

    private final LocalMapper localMapper;

    private final LocalSearchRepository localSearchRepository;

    public LocalResource(LocalRepository localRepository, LocalMapper localMapper, LocalSearchRepository localSearchRepository) {
        this.localRepository = localRepository;
        this.localMapper = localMapper;
        this.localSearchRepository = localSearchRepository;
    }

    /**
     * POST  /locals : Create a new local.
     *
     * @param localDTO the localDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new localDTO, or with status 400 (Bad Request) if the local has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/locals")
    @Timed
    public ResponseEntity<LocalDTO> createLocal(@Valid @RequestBody LocalDTO localDTO) throws URISyntaxException {
        log.debug("REST request to save Local : {}", localDTO);
        if (localDTO.getId() != null) {
            throw new BadRequestAlertException("A new local cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Local local = localMapper.toEntity(localDTO);
        local = localRepository.save(local);
        LocalDTO result = localMapper.toDto(local);
        localSearchRepository.save(local);
        return ResponseEntity.created(new URI("/api/locals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /locals : Updates an existing local.
     *
     * @param localDTO the localDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated localDTO,
     * or with status 400 (Bad Request) if the localDTO is not valid,
     * or with status 500 (Internal Server Error) if the localDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/locals")
    @Timed
    public ResponseEntity<LocalDTO> updateLocal(@Valid @RequestBody LocalDTO localDTO) throws URISyntaxException {
        log.debug("REST request to update Local : {}", localDTO);
        if (localDTO.getId() == null) {
            return createLocal(localDTO);
        }
        Local local = localMapper.toEntity(localDTO);
        local = localRepository.save(local);
        LocalDTO result = localMapper.toDto(local);
        localSearchRepository.save(local);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, localDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /locals : get all the locals.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of locals in body
     */
    @GetMapping("/locals")
    @Timed
    public List<LocalDTO> getAllLocals() {
        log.debug("REST request to get all Locals");
        List<Local> locals = localRepository.findAll();
        return localMapper.toDto(locals);
        }

    /**
     * GET  /locals/:id : get the "id" local.
     *
     * @param id the id of the localDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the localDTO, or with status 404 (Not Found)
     */
    @GetMapping("/locals/{id}")
    @Timed
    public ResponseEntity<LocalDTO> getLocal(@PathVariable Long id) {
        log.debug("REST request to get Local : {}", id);
        Local local = localRepository.findOne(id);
        LocalDTO localDTO = localMapper.toDto(local);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(localDTO));
    }

    /**
     * DELETE  /locals/:id : delete the "id" local.
     *
     * @param id the id of the localDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/locals/{id}")
    @Timed
    public ResponseEntity<Void> deleteLocal(@PathVariable Long id) {
        log.debug("REST request to delete Local : {}", id);
        localRepository.delete(id);
        localSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/locals?query=:query : search for the local corresponding
     * to the query.
     *
     * @param query the query of the local search
     * @return the result of the search
     */
    @GetMapping("/_search/locals")
    @Timed
    public List<LocalDTO> searchLocals(@RequestParam String query) {
        log.debug("REST request to search Locals for query {}", query);
        return StreamSupport
            .stream(localSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(localMapper::toDto)
            .collect(Collectors.toList());
    }

    @GetMapping("/locals/comercios/{id}")
    @Timed
    @Transactional
    public ResponseEntity<List<LocalDTO>> getLocalByComercio(@PathVariable Long id) {
        log.debug("REST request to get Local : {}", id);
        List<Local> locales = localRepository.findAllByComercio_id(id);
        List<LocalDTO> localesDTO = localMapper.toDto(locales);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(localesDTO));
    }

}
