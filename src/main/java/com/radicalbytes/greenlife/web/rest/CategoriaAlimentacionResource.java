package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.CategoriaAlimentacion;

import com.radicalbytes.greenlife.repository.CategoriaAlimentacionRepository;
import com.radicalbytes.greenlife.repository.search.CategoriaAlimentacionSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.CategoriaAlimentacionDTO;
import com.radicalbytes.greenlife.service.mapper.CategoriaAlimentacionMapper;
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
 * REST controller for managing CategoriaAlimentacion.
 */
@RestController
@RequestMapping("/api")
public class CategoriaAlimentacionResource {

    private final Logger log = LoggerFactory.getLogger(CategoriaAlimentacionResource.class);

    private static final String ENTITY_NAME = "categoriaAlimentacion";

    private final CategoriaAlimentacionRepository categoriaAlimentacionRepository;

    private final CategoriaAlimentacionMapper categoriaAlimentacionMapper;

    private final CategoriaAlimentacionSearchRepository categoriaAlimentacionSearchRepository;

    public CategoriaAlimentacionResource(CategoriaAlimentacionRepository categoriaAlimentacionRepository, CategoriaAlimentacionMapper categoriaAlimentacionMapper, CategoriaAlimentacionSearchRepository categoriaAlimentacionSearchRepository) {
        this.categoriaAlimentacionRepository = categoriaAlimentacionRepository;
        this.categoriaAlimentacionMapper = categoriaAlimentacionMapper;
        this.categoriaAlimentacionSearchRepository = categoriaAlimentacionSearchRepository;
    }

    /**
     * POST  /categoria-alimentacions : Create a new categoriaAlimentacion.
     *
     * @param categoriaAlimentacionDTO the categoriaAlimentacionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new categoriaAlimentacionDTO, or with status 400 (Bad Request) if the categoriaAlimentacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/categoria-alimentacions")
    @Timed
    public ResponseEntity<CategoriaAlimentacionDTO> createCategoriaAlimentacion(@Valid @RequestBody CategoriaAlimentacionDTO categoriaAlimentacionDTO) throws URISyntaxException {
        log.debug("REST request to save CategoriaAlimentacion : {}", categoriaAlimentacionDTO);
        if (categoriaAlimentacionDTO.getId() != null) {
            throw new BadRequestAlertException("A new categoriaAlimentacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CategoriaAlimentacion categoriaAlimentacion = categoriaAlimentacionMapper.toEntity(categoriaAlimentacionDTO);
        categoriaAlimentacion = categoriaAlimentacionRepository.save(categoriaAlimentacion);
        CategoriaAlimentacionDTO result = categoriaAlimentacionMapper.toDto(categoriaAlimentacion);
        categoriaAlimentacionSearchRepository.save(categoriaAlimentacion);
        return ResponseEntity.created(new URI("/api/categoria-alimentacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /categoria-alimentacions : Updates an existing categoriaAlimentacion.
     *
     * @param categoriaAlimentacionDTO the categoriaAlimentacionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated categoriaAlimentacionDTO,
     * or with status 400 (Bad Request) if the categoriaAlimentacionDTO is not valid,
     * or with status 500 (Internal Server Error) if the categoriaAlimentacionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/categoria-alimentacions")
    @Timed
    public ResponseEntity<CategoriaAlimentacionDTO> updateCategoriaAlimentacion(@Valid @RequestBody CategoriaAlimentacionDTO categoriaAlimentacionDTO) throws URISyntaxException {
        log.debug("REST request to update CategoriaAlimentacion : {}", categoriaAlimentacionDTO);
        if (categoriaAlimentacionDTO.getId() == null) {
            return createCategoriaAlimentacion(categoriaAlimentacionDTO);
        }
        CategoriaAlimentacion categoriaAlimentacion = categoriaAlimentacionMapper.toEntity(categoriaAlimentacionDTO);
        categoriaAlimentacion = categoriaAlimentacionRepository.save(categoriaAlimentacion);
        CategoriaAlimentacionDTO result = categoriaAlimentacionMapper.toDto(categoriaAlimentacion);
        categoriaAlimentacionSearchRepository.save(categoriaAlimentacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, categoriaAlimentacionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /categoria-alimentacions : get all the categoriaAlimentacions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of categoriaAlimentacions in body
     */
    @GetMapping("/categoria-alimentacions")
    @Timed
    public List<CategoriaAlimentacionDTO> getAllCategoriaAlimentacions() {
        log.debug("REST request to get all CategoriaAlimentacions");
        List<CategoriaAlimentacion> categoriaAlimentacions = categoriaAlimentacionRepository.findAll();
        return categoriaAlimentacionMapper.toDto(categoriaAlimentacions);
        }

    /**
     * GET  /categoria-alimentacions/:id : get the "id" categoriaAlimentacion.
     *
     * @param id the id of the categoriaAlimentacionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the categoriaAlimentacionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/categoria-alimentacions/{id}")
    @Timed
    public ResponseEntity<CategoriaAlimentacionDTO> getCategoriaAlimentacion(@PathVariable Long id) {
        log.debug("REST request to get CategoriaAlimentacion : {}", id);
        CategoriaAlimentacion categoriaAlimentacion = categoriaAlimentacionRepository.findOne(id);
        CategoriaAlimentacionDTO categoriaAlimentacionDTO = categoriaAlimentacionMapper.toDto(categoriaAlimentacion);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(categoriaAlimentacionDTO));
    }

    /**
     * DELETE  /categoria-alimentacions/:id : delete the "id" categoriaAlimentacion.
     *
     * @param id the id of the categoriaAlimentacionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/categoria-alimentacions/{id}")
    @Timed
    public ResponseEntity<Void> deleteCategoriaAlimentacion(@PathVariable Long id) {
        log.debug("REST request to delete CategoriaAlimentacion : {}", id);
        categoriaAlimentacionRepository.delete(id);
        categoriaAlimentacionSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/categoria-alimentacions?query=:query : search for the categoriaAlimentacion corresponding
     * to the query.
     *
     * @param query the query of the categoriaAlimentacion search
     * @return the result of the search
     */
    @GetMapping("/_search/categoria-alimentacions")
    @Timed
    public List<CategoriaAlimentacionDTO> searchCategoriaAlimentacions(@RequestParam String query) {
        log.debug("REST request to search CategoriaAlimentacions for query {}", query);
        return StreamSupport
            .stream(categoriaAlimentacionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(categoriaAlimentacionMapper::toDto)
            .collect(Collectors.toList());
    }

}
