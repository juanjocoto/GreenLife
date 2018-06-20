package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Fotografia;

import com.radicalbytes.greenlife.repository.FotografiaRepository;
import com.radicalbytes.greenlife.repository.search.FotografiaSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.FotografiaDTO;
import com.radicalbytes.greenlife.service.mapper.FotografiaMapper;
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
 * REST controller for managing Fotografia.
 */
@RestController
@RequestMapping("/api")
public class FotografiaResource {

    private final Logger log = LoggerFactory.getLogger(FotografiaResource.class);

    private static final String ENTITY_NAME = "fotografia";

    private final FotografiaRepository fotografiaRepository;

    private final FotografiaMapper fotografiaMapper;

    private final FotografiaSearchRepository fotografiaSearchRepository;

    public FotografiaResource(FotografiaRepository fotografiaRepository, FotografiaMapper fotografiaMapper, FotografiaSearchRepository fotografiaSearchRepository) {
        this.fotografiaRepository = fotografiaRepository;
        this.fotografiaMapper = fotografiaMapper;
        this.fotografiaSearchRepository = fotografiaSearchRepository;
    }

    /**
     * POST  /fotografias : Create a new fotografia.
     *
     * @param fotografiaDTO the fotografiaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fotografiaDTO, or with status 400 (Bad Request) if the fotografia has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fotografias")
    @Timed
    public ResponseEntity<FotografiaDTO> createFotografia(@Valid @RequestBody FotografiaDTO fotografiaDTO) throws URISyntaxException {
        log.debug("REST request to save Fotografia : {}", fotografiaDTO);
        if (fotografiaDTO.getId() != null) {
            throw new BadRequestAlertException("A new fotografia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fotografia fotografia = fotografiaMapper.toEntity(fotografiaDTO);
        fotografia = fotografiaRepository.save(fotografia);
        FotografiaDTO result = fotografiaMapper.toDto(fotografia);
        fotografiaSearchRepository.save(fotografia);
        return ResponseEntity.created(new URI("/api/fotografias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fotografias : Updates an existing fotografia.
     *
     * @param fotografiaDTO the fotografiaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fotografiaDTO,
     * or with status 400 (Bad Request) if the fotografiaDTO is not valid,
     * or with status 500 (Internal Server Error) if the fotografiaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fotografias")
    @Timed
    public ResponseEntity<FotografiaDTO> updateFotografia(@Valid @RequestBody FotografiaDTO fotografiaDTO) throws URISyntaxException {
        log.debug("REST request to update Fotografia : {}", fotografiaDTO);
        if (fotografiaDTO.getId() == null) {
            return createFotografia(fotografiaDTO);
        }
        Fotografia fotografia = fotografiaMapper.toEntity(fotografiaDTO);
        fotografia = fotografiaRepository.save(fotografia);
        FotografiaDTO result = fotografiaMapper.toDto(fotografia);
        fotografiaSearchRepository.save(fotografia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fotografiaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fotografias : get all the fotografias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fotografias in body
     */
    @GetMapping("/fotografias")
    @Timed
    public List<FotografiaDTO> getAllFotografias() {
        log.debug("REST request to get all Fotografias");
        List<Fotografia> fotografias = fotografiaRepository.findAll();
        return fotografiaMapper.toDto(fotografias);
        }

    /**
     * GET  /fotografias/:id : get the "id" fotografia.
     *
     * @param id the id of the fotografiaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fotografiaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/fotografias/{id}")
    @Timed
    public ResponseEntity<FotografiaDTO> getFotografia(@PathVariable Long id) {
        log.debug("REST request to get Fotografia : {}", id);
        Fotografia fotografia = fotografiaRepository.findOne(id);
        FotografiaDTO fotografiaDTO = fotografiaMapper.toDto(fotografia);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(fotografiaDTO));
    }

    /**
     * DELETE  /fotografias/:id : delete the "id" fotografia.
     *
     * @param id the id of the fotografiaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fotografias/{id}")
    @Timed
    public ResponseEntity<Void> deleteFotografia(@PathVariable Long id) {
        log.debug("REST request to delete Fotografia : {}", id);
        fotografiaRepository.delete(id);
        fotografiaSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/fotografias?query=:query : search for the fotografia corresponding
     * to the query.
     *
     * @param query the query of the fotografia search
     * @return the result of the search
     */
    @GetMapping("/_search/fotografias")
    @Timed
    public List<FotografiaDTO> searchFotografias(@RequestParam String query) {
        log.debug("REST request to search Fotografias for query {}", query);
        return StreamSupport
            .stream(fotografiaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(fotografiaMapper::toDto)
            .collect(Collectors.toList());
    }

}
