package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.DiaEntrega;

import com.radicalbytes.greenlife.repository.DiaEntregaRepository;
import com.radicalbytes.greenlife.repository.search.DiaEntregaSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.DiaEntregaDTO;
import com.radicalbytes.greenlife.service.mapper.DiaEntregaMapper;
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
 * REST controller for managing DiaEntrega.
 */
@RestController
@RequestMapping("/api")
public class DiaEntregaResource {

    private final Logger log = LoggerFactory.getLogger(DiaEntregaResource.class);

    private static final String ENTITY_NAME = "diaEntrega";

    private final DiaEntregaRepository diaEntregaRepository;

    private final DiaEntregaMapper diaEntregaMapper;

    private final DiaEntregaSearchRepository diaEntregaSearchRepository;

    public DiaEntregaResource(DiaEntregaRepository diaEntregaRepository, DiaEntregaMapper diaEntregaMapper, DiaEntregaSearchRepository diaEntregaSearchRepository) {
        this.diaEntregaRepository = diaEntregaRepository;
        this.diaEntregaMapper = diaEntregaMapper;
        this.diaEntregaSearchRepository = diaEntregaSearchRepository;
    }

    /**
     * POST  /dia-entregas : Create a new diaEntrega.
     *
     * @param diaEntregaDTO the diaEntregaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new diaEntregaDTO, or with status 400 (Bad Request) if the diaEntrega has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dia-entregas")
    @Timed
    public ResponseEntity<DiaEntregaDTO> createDiaEntrega(@Valid @RequestBody DiaEntregaDTO diaEntregaDTO) throws URISyntaxException {
        log.debug("REST request to save DiaEntrega : {}", diaEntregaDTO);
        if (diaEntregaDTO.getId() != null) {
            throw new BadRequestAlertException("A new diaEntrega cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DiaEntrega diaEntrega = diaEntregaMapper.toEntity(diaEntregaDTO);
        diaEntrega = diaEntregaRepository.save(diaEntrega);
        DiaEntregaDTO result = diaEntregaMapper.toDto(diaEntrega);
        diaEntregaSearchRepository.save(diaEntrega);
        return ResponseEntity.created(new URI("/api/dia-entregas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dia-entregas : Updates an existing diaEntrega.
     *
     * @param diaEntregaDTO the diaEntregaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated diaEntregaDTO,
     * or with status 400 (Bad Request) if the diaEntregaDTO is not valid,
     * or with status 500 (Internal Server Error) if the diaEntregaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dia-entregas")
    @Timed
    public ResponseEntity<DiaEntregaDTO> updateDiaEntrega(@Valid @RequestBody DiaEntregaDTO diaEntregaDTO) throws URISyntaxException {
        log.debug("REST request to update DiaEntrega : {}", diaEntregaDTO);
        if (diaEntregaDTO.getId() == null) {
            return createDiaEntrega(diaEntregaDTO);
        }
        DiaEntrega diaEntrega = diaEntregaMapper.toEntity(diaEntregaDTO);
        diaEntrega = diaEntregaRepository.save(diaEntrega);
        DiaEntregaDTO result = diaEntregaMapper.toDto(diaEntrega);
        diaEntregaSearchRepository.save(diaEntrega);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, diaEntregaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dia-entregas : get all the diaEntregas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of diaEntregas in body
     */
    @GetMapping("/dia-entregas")
    @Timed
    public List<DiaEntregaDTO> getAllDiaEntregas() {
        log.debug("REST request to get all DiaEntregas");
        List<DiaEntrega> diaEntregas = diaEntregaRepository.findAll();
        return diaEntregaMapper.toDto(diaEntregas);
        }

    /**
     * GET  /dia-entregas/:id : get the "id" diaEntrega.
     *
     * @param id the id of the diaEntregaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the diaEntregaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/dia-entregas/{id}")
    @Timed
    public ResponseEntity<DiaEntregaDTO> getDiaEntrega(@PathVariable Long id) {
        log.debug("REST request to get DiaEntrega : {}", id);
        DiaEntrega diaEntrega = diaEntregaRepository.findOne(id);
        DiaEntregaDTO diaEntregaDTO = diaEntregaMapper.toDto(diaEntrega);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(diaEntregaDTO));
    }

    /**
     * DELETE  /dia-entregas/:id : delete the "id" diaEntrega.
     *
     * @param id the id of the diaEntregaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dia-entregas/{id}")
    @Timed
    public ResponseEntity<Void> deleteDiaEntrega(@PathVariable Long id) {
        log.debug("REST request to delete DiaEntrega : {}", id);
        diaEntregaRepository.delete(id);
        diaEntregaSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/dia-entregas?query=:query : search for the diaEntrega corresponding
     * to the query.
     *
     * @param query the query of the diaEntrega search
     * @return the result of the search
     */
    @GetMapping("/_search/dia-entregas")
    @Timed
    public List<DiaEntregaDTO> searchDiaEntregas(@RequestParam String query) {
        log.debug("REST request to search DiaEntregas for query {}", query);
        return StreamSupport
            .stream(diaEntregaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(diaEntregaMapper::toDto)
            .collect(Collectors.toList());
    }

}
