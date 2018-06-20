package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Etiqueta;

import com.radicalbytes.greenlife.repository.EtiquetaRepository;
import com.radicalbytes.greenlife.repository.search.EtiquetaSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.EtiquetaDTO;
import com.radicalbytes.greenlife.service.mapper.EtiquetaMapper;
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
 * REST controller for managing Etiqueta.
 */
@RestController
@RequestMapping("/api")
public class EtiquetaResource {

    private final Logger log = LoggerFactory.getLogger(EtiquetaResource.class);

    private static final String ENTITY_NAME = "etiqueta";

    private final EtiquetaRepository etiquetaRepository;

    private final EtiquetaMapper etiquetaMapper;

    private final EtiquetaSearchRepository etiquetaSearchRepository;

    public EtiquetaResource(EtiquetaRepository etiquetaRepository, EtiquetaMapper etiquetaMapper, EtiquetaSearchRepository etiquetaSearchRepository) {
        this.etiquetaRepository = etiquetaRepository;
        this.etiquetaMapper = etiquetaMapper;
        this.etiquetaSearchRepository = etiquetaSearchRepository;
    }

    /**
     * POST  /etiquetas : Create a new etiqueta.
     *
     * @param etiquetaDTO the etiquetaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new etiquetaDTO, or with status 400 (Bad Request) if the etiqueta has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/etiquetas")
    @Timed
    public ResponseEntity<EtiquetaDTO> createEtiqueta(@Valid @RequestBody EtiquetaDTO etiquetaDTO) throws URISyntaxException {
        log.debug("REST request to save Etiqueta : {}", etiquetaDTO);
        if (etiquetaDTO.getId() != null) {
            throw new BadRequestAlertException("A new etiqueta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Etiqueta etiqueta = etiquetaMapper.toEntity(etiquetaDTO);
        etiqueta = etiquetaRepository.save(etiqueta);
        EtiquetaDTO result = etiquetaMapper.toDto(etiqueta);
        etiquetaSearchRepository.save(etiqueta);
        return ResponseEntity.created(new URI("/api/etiquetas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /etiquetas : Updates an existing etiqueta.
     *
     * @param etiquetaDTO the etiquetaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated etiquetaDTO,
     * or with status 400 (Bad Request) if the etiquetaDTO is not valid,
     * or with status 500 (Internal Server Error) if the etiquetaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/etiquetas")
    @Timed
    public ResponseEntity<EtiquetaDTO> updateEtiqueta(@Valid @RequestBody EtiquetaDTO etiquetaDTO) throws URISyntaxException {
        log.debug("REST request to update Etiqueta : {}", etiquetaDTO);
        if (etiquetaDTO.getId() == null) {
            return createEtiqueta(etiquetaDTO);
        }
        Etiqueta etiqueta = etiquetaMapper.toEntity(etiquetaDTO);
        etiqueta = etiquetaRepository.save(etiqueta);
        EtiquetaDTO result = etiquetaMapper.toDto(etiqueta);
        etiquetaSearchRepository.save(etiqueta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, etiquetaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /etiquetas : get all the etiquetas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of etiquetas in body
     */
    @GetMapping("/etiquetas")
    @Timed
    public List<EtiquetaDTO> getAllEtiquetas() {
        log.debug("REST request to get all Etiquetas");
        List<Etiqueta> etiquetas = etiquetaRepository.findAll();
        return etiquetaMapper.toDto(etiquetas);
        }

    /**
     * GET  /etiquetas/:id : get the "id" etiqueta.
     *
     * @param id the id of the etiquetaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the etiquetaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/etiquetas/{id}")
    @Timed
    public ResponseEntity<EtiquetaDTO> getEtiqueta(@PathVariable Long id) {
        log.debug("REST request to get Etiqueta : {}", id);
        Etiqueta etiqueta = etiquetaRepository.findOne(id);
        EtiquetaDTO etiquetaDTO = etiquetaMapper.toDto(etiqueta);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(etiquetaDTO));
    }

    /**
     * DELETE  /etiquetas/:id : delete the "id" etiqueta.
     *
     * @param id the id of the etiquetaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/etiquetas/{id}")
    @Timed
    public ResponseEntity<Void> deleteEtiqueta(@PathVariable Long id) {
        log.debug("REST request to delete Etiqueta : {}", id);
        etiquetaRepository.delete(id);
        etiquetaSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/etiquetas?query=:query : search for the etiqueta corresponding
     * to the query.
     *
     * @param query the query of the etiqueta search
     * @return the result of the search
     */
    @GetMapping("/_search/etiquetas")
    @Timed
    public List<EtiquetaDTO> searchEtiquetas(@RequestParam String query) {
        log.debug("REST request to search Etiquetas for query {}", query);
        return StreamSupport
            .stream(etiquetaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(etiquetaMapper::toDto)
            .collect(Collectors.toList());
    }

}
