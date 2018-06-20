package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Permiso;

import com.radicalbytes.greenlife.repository.PermisoRepository;
import com.radicalbytes.greenlife.repository.search.PermisoSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.PermisoDTO;
import com.radicalbytes.greenlife.service.mapper.PermisoMapper;
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
 * REST controller for managing Permiso.
 */
@RestController
@RequestMapping("/api")
public class PermisoResource {

    private final Logger log = LoggerFactory.getLogger(PermisoResource.class);

    private static final String ENTITY_NAME = "permiso";

    private final PermisoRepository permisoRepository;

    private final PermisoMapper permisoMapper;

    private final PermisoSearchRepository permisoSearchRepository;

    public PermisoResource(PermisoRepository permisoRepository, PermisoMapper permisoMapper, PermisoSearchRepository permisoSearchRepository) {
        this.permisoRepository = permisoRepository;
        this.permisoMapper = permisoMapper;
        this.permisoSearchRepository = permisoSearchRepository;
    }

    /**
     * POST  /permisos : Create a new permiso.
     *
     * @param permisoDTO the permisoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new permisoDTO, or with status 400 (Bad Request) if the permiso has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/permisos")
    @Timed
    public ResponseEntity<PermisoDTO> createPermiso(@Valid @RequestBody PermisoDTO permisoDTO) throws URISyntaxException {
        log.debug("REST request to save Permiso : {}", permisoDTO);
        if (permisoDTO.getId() != null) {
            throw new BadRequestAlertException("A new permiso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Permiso permiso = permisoMapper.toEntity(permisoDTO);
        permiso = permisoRepository.save(permiso);
        PermisoDTO result = permisoMapper.toDto(permiso);
        permisoSearchRepository.save(permiso);
        return ResponseEntity.created(new URI("/api/permisos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /permisos : Updates an existing permiso.
     *
     * @param permisoDTO the permisoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated permisoDTO,
     * or with status 400 (Bad Request) if the permisoDTO is not valid,
     * or with status 500 (Internal Server Error) if the permisoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/permisos")
    @Timed
    public ResponseEntity<PermisoDTO> updatePermiso(@Valid @RequestBody PermisoDTO permisoDTO) throws URISyntaxException {
        log.debug("REST request to update Permiso : {}", permisoDTO);
        if (permisoDTO.getId() == null) {
            return createPermiso(permisoDTO);
        }
        Permiso permiso = permisoMapper.toEntity(permisoDTO);
        permiso = permisoRepository.save(permiso);
        PermisoDTO result = permisoMapper.toDto(permiso);
        permisoSearchRepository.save(permiso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, permisoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /permisos : get all the permisos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of permisos in body
     */
    @GetMapping("/permisos")
    @Timed
    public List<PermisoDTO> getAllPermisos() {
        log.debug("REST request to get all Permisos");
        List<Permiso> permisos = permisoRepository.findAll();
        return permisoMapper.toDto(permisos);
        }

    /**
     * GET  /permisos/:id : get the "id" permiso.
     *
     * @param id the id of the permisoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the permisoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/permisos/{id}")
    @Timed
    public ResponseEntity<PermisoDTO> getPermiso(@PathVariable Long id) {
        log.debug("REST request to get Permiso : {}", id);
        Permiso permiso = permisoRepository.findOne(id);
        PermisoDTO permisoDTO = permisoMapper.toDto(permiso);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(permisoDTO));
    }

    /**
     * DELETE  /permisos/:id : delete the "id" permiso.
     *
     * @param id the id of the permisoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/permisos/{id}")
    @Timed
    public ResponseEntity<Void> deletePermiso(@PathVariable Long id) {
        log.debug("REST request to delete Permiso : {}", id);
        permisoRepository.delete(id);
        permisoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/permisos?query=:query : search for the permiso corresponding
     * to the query.
     *
     * @param query the query of the permiso search
     * @return the result of the search
     */
    @GetMapping("/_search/permisos")
    @Timed
    public List<PermisoDTO> searchPermisos(@RequestParam String query) {
        log.debug("REST request to search Permisos for query {}", query);
        return StreamSupport
            .stream(permisoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(permisoMapper::toDto)
            .collect(Collectors.toList());
    }

}
