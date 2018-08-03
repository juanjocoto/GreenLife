package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.ResenaComercio;

import com.radicalbytes.greenlife.repository.ResenaComercioRepository;
import com.radicalbytes.greenlife.repository.search.ResenaComercioSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.ResenaComercioDTO;
import com.radicalbytes.greenlife.service.mapper.ResenaComercioMapper;
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
 * REST controller for managing ResenaComercio.
 */
@RestController
@RequestMapping("/api")
public class ResenaComercioResource {

    private final Logger log = LoggerFactory.getLogger(ResenaComercioResource.class);

    private static final String ENTITY_NAME = "resenaComercio";

    private final ResenaComercioRepository resenaComercioRepository;

    private final ResenaComercioMapper resenaComercioMapper;

    private final ResenaComercioSearchRepository resenaComercioSearchRepository;

    public ResenaComercioResource(ResenaComercioRepository resenaComercioRepository, ResenaComercioMapper resenaComercioMapper, ResenaComercioSearchRepository resenaComercioSearchRepository) {
        this.resenaComercioRepository = resenaComercioRepository;
        this.resenaComercioMapper = resenaComercioMapper;
        this.resenaComercioSearchRepository = resenaComercioSearchRepository;
    }

    /**
     * POST  /resena-comercios : Create a new resenaComercio.
     *
     * @param resenaComercioDTO the resenaComercioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resenaComercioDTO, or with status 400 (Bad Request) if the resenaComercio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/resena-comercios")
    @Timed
    public ResponseEntity<ResenaComercioDTO> createResenaComercio(@Valid @RequestBody ResenaComercioDTO resenaComercioDTO) throws URISyntaxException {
        log.debug("REST request to save ResenaComercio : {}", resenaComercioDTO);
        if (resenaComercioDTO.getId() != null) {
            throw new BadRequestAlertException("A new resenaComercio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ResenaComercio resenaComercio = resenaComercioMapper.toEntity(resenaComercioDTO);
        resenaComercio = resenaComercioRepository.save(resenaComercio);
        ResenaComercioDTO result = resenaComercioMapper.toDto(resenaComercio);
        resenaComercioSearchRepository.save(resenaComercio);
        return ResponseEntity.created(new URI("/api/resena-comercios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /resena-comercios : Updates an existing resenaComercio.
     *
     * @param resenaComercioDTO the resenaComercioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resenaComercioDTO,
     * or with status 400 (Bad Request) if the resenaComercioDTO is not valid,
     * or with status 500 (Internal Server Error) if the resenaComercioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/resena-comercios")
    @Timed
    public ResponseEntity<ResenaComercioDTO> updateResenaComercio(@Valid @RequestBody ResenaComercioDTO resenaComercioDTO) throws URISyntaxException {
        log.debug("REST request to update ResenaComercio : {}", resenaComercioDTO);
        if (resenaComercioDTO.getId() == null) {
            return createResenaComercio(resenaComercioDTO);
        }
        ResenaComercio resenaComercio = resenaComercioMapper.toEntity(resenaComercioDTO);
        resenaComercio = resenaComercioRepository.save(resenaComercio);
        ResenaComercioDTO result = resenaComercioMapper.toDto(resenaComercio);
        resenaComercioSearchRepository.save(resenaComercio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resenaComercioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /resena-comercios : get all the resenaComercios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of resenaComercios in body
     */
    @GetMapping("/resena-comercios")
    @Timed
    public List<ResenaComercioDTO> getAllResenaComercios() {
        log.debug("REST request to get all ResenaComercios");
        List<ResenaComercio> resenaComercios = resenaComercioRepository.findAll();
        return resenaComercioMapper.toDto(resenaComercios);
        }

    /**
     * GET  /resena-comercios/:id : get the "id" resenaComercio.
     *
     * @param id the id of the resenaComercioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resenaComercioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/resena-comercios/{id}")
    @Timed
    public ResponseEntity<ResenaComercioDTO> getResenaComercio(@PathVariable Long id) {
        log.debug("REST request to get ResenaComercio : {}", id);
        ResenaComercio resenaComercio = resenaComercioRepository.findOne(id);
        ResenaComercioDTO resenaComercioDTO = resenaComercioMapper.toDto(resenaComercio);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resenaComercioDTO));
    }

    @GetMapping("/resena-comercios/comercio/{id}")
    @Timed
    @Transactional
    public ResponseEntity<List<ResenaComercioDTO>> getProductoByComercio(@PathVariable Long id) {
        log.debug("REST request to get Resena Comercio : {}", id);
        List<ResenaComercio> resenaComercio = resenaComercioRepository.findAllByComercio_id(id);
        List<ResenaComercioDTO> resenaComercioDTO = resenaComercioMapper.toDto(resenaComercio);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resenaComercioDTO));
    }

    /**
     * DELETE  /resena-comercios/:id : delete the "id" resenaComercio.
     *
     * @param id the id of the resenaComercioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/resena-comercios/{id}")
    @Timed
    public ResponseEntity<Void> deleteResenaComercio(@PathVariable Long id) {
        log.debug("REST request to delete ResenaComercio : {}", id);
        resenaComercioRepository.delete(id);
        resenaComercioSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/resena-comercios?query=:query : search for the resenaComercio corresponding
     * to the query.
     *
     * @param query the query of the resenaComercio search
     * @return the result of the search
     */
    @GetMapping("/_search/resena-comercios")
    @Timed
    public List<ResenaComercioDTO> searchResenaComercios(@RequestParam String query) {
        log.debug("REST request to search ResenaComercios for query {}", query);
        return StreamSupport
            .stream(resenaComercioSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(resenaComercioMapper::toDto)
            .collect(Collectors.toList());
    }

}
