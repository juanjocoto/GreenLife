package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.TipoContrato;

import com.radicalbytes.greenlife.repository.TipoContratoRepository;
import com.radicalbytes.greenlife.repository.search.TipoContratoSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.TipoContratoDTO;
import com.radicalbytes.greenlife.service.mapper.TipoContratoMapper;
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
 * REST controller for managing TipoContrato.
 */
@RestController
@RequestMapping("/api")
public class TipoContratoResource {

    private final Logger log = LoggerFactory.getLogger(TipoContratoResource.class);

    private static final String ENTITY_NAME = "tipoContrato";

    private final TipoContratoRepository tipoContratoRepository;

    private final TipoContratoMapper tipoContratoMapper;

    private final TipoContratoSearchRepository tipoContratoSearchRepository;

    public TipoContratoResource(TipoContratoRepository tipoContratoRepository, TipoContratoMapper tipoContratoMapper, TipoContratoSearchRepository tipoContratoSearchRepository) {
        this.tipoContratoRepository = tipoContratoRepository;
        this.tipoContratoMapper = tipoContratoMapper;
        this.tipoContratoSearchRepository = tipoContratoSearchRepository;
    }

    /**
     * POST  /tipo-contratoes : Create a new tipoContrato.
     *
     * @param tipoContratoDTO the tipoContratoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoContratoDTO, or with status 400 (Bad Request) if the tipoContrato has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-contratoes")
    @Timed
    public ResponseEntity<TipoContratoDTO> createTipoContrato(@Valid @RequestBody TipoContratoDTO tipoContratoDTO) throws URISyntaxException {
        log.debug("REST request to save TipoContrato : {}", tipoContratoDTO);
        if (tipoContratoDTO.getId() != null) {
            throw new BadRequestAlertException("A new tipoContrato cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoContrato tipoContrato = tipoContratoMapper.toEntity(tipoContratoDTO);
        tipoContrato = tipoContratoRepository.save(tipoContrato);
        TipoContratoDTO result = tipoContratoMapper.toDto(tipoContrato);
        tipoContratoSearchRepository.save(tipoContrato);
        return ResponseEntity.created(new URI("/api/tipo-contratoes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-contratoes : Updates an existing tipoContrato.
     *
     * @param tipoContratoDTO the tipoContratoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoContratoDTO,
     * or with status 400 (Bad Request) if the tipoContratoDTO is not valid,
     * or with status 500 (Internal Server Error) if the tipoContratoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-contratoes")
    @Timed
    public ResponseEntity<TipoContratoDTO> updateTipoContrato(@Valid @RequestBody TipoContratoDTO tipoContratoDTO) throws URISyntaxException {
        log.debug("REST request to update TipoContrato : {}", tipoContratoDTO);
        if (tipoContratoDTO.getId() == null) {
            return createTipoContrato(tipoContratoDTO);
        }
        TipoContrato tipoContrato = tipoContratoMapper.toEntity(tipoContratoDTO);
        tipoContrato = tipoContratoRepository.save(tipoContrato);
        TipoContratoDTO result = tipoContratoMapper.toDto(tipoContrato);
        tipoContratoSearchRepository.save(tipoContrato);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoContratoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-contratoes : get all the tipoContratoes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoContratoes in body
     */
    @GetMapping("/tipo-contratoes")
    @Timed
    public List<TipoContratoDTO> getAllTipoContratoes() {
        log.debug("REST request to get all TipoContratoes");
        List<TipoContrato> tipoContratoes = tipoContratoRepository.findAll();
        return tipoContratoMapper.toDto(tipoContratoes);
        }

    /**
     * GET  /tipo-contratoes/:id : get the "id" tipoContrato.
     *
     * @param id the id of the tipoContratoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoContratoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-contratoes/{id}")
    @Timed
    public ResponseEntity<TipoContratoDTO> getTipoContrato(@PathVariable Long id) {
        log.debug("REST request to get TipoContrato : {}", id);
        TipoContrato tipoContrato = tipoContratoRepository.findOne(id);
        TipoContratoDTO tipoContratoDTO = tipoContratoMapper.toDto(tipoContrato);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tipoContratoDTO));
    }

    /**
     * DELETE  /tipo-contratoes/:id : delete the "id" tipoContrato.
     *
     * @param id the id of the tipoContratoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-contratoes/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoContrato(@PathVariable Long id) {
        log.debug("REST request to delete TipoContrato : {}", id);
        tipoContratoRepository.delete(id);
        tipoContratoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tipo-contratoes?query=:query : search for the tipoContrato corresponding
     * to the query.
     *
     * @param query the query of the tipoContrato search
     * @return the result of the search
     */
    @GetMapping("/_search/tipo-contratoes")
    @Timed
    public List<TipoContratoDTO> searchTipoContratoes(@RequestParam String query) {
        log.debug("REST request to search TipoContratoes for query {}", query);
        return StreamSupport
            .stream(tipoContratoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(tipoContratoMapper::toDto)
            .collect(Collectors.toList());
    }

}
