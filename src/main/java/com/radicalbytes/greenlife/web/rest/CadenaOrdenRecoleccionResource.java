package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.CadenaOrdenRecoleccion;

import com.radicalbytes.greenlife.repository.CadenaOrdenRecoleccionRepository;
import com.radicalbytes.greenlife.repository.search.CadenaOrdenRecoleccionSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.CadenaOrdenRecoleccionDTO;
import com.radicalbytes.greenlife.service.mapper.CadenaOrdenRecoleccionMapper;
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
 * REST controller for managing CadenaOrdenRecoleccion.
 */
@RestController
@RequestMapping("/api")
public class CadenaOrdenRecoleccionResource {

    private final Logger log = LoggerFactory.getLogger(CadenaOrdenRecoleccionResource.class);

    private static final String ENTITY_NAME = "cadenaOrdenRecoleccion";

    private final CadenaOrdenRecoleccionRepository cadenaOrdenRecoleccionRepository;

    private final CadenaOrdenRecoleccionMapper cadenaOrdenRecoleccionMapper;

    private final CadenaOrdenRecoleccionSearchRepository cadenaOrdenRecoleccionSearchRepository;

    public CadenaOrdenRecoleccionResource(CadenaOrdenRecoleccionRepository cadenaOrdenRecoleccionRepository, CadenaOrdenRecoleccionMapper cadenaOrdenRecoleccionMapper, CadenaOrdenRecoleccionSearchRepository cadenaOrdenRecoleccionSearchRepository) {
        this.cadenaOrdenRecoleccionRepository = cadenaOrdenRecoleccionRepository;
        this.cadenaOrdenRecoleccionMapper = cadenaOrdenRecoleccionMapper;
        this.cadenaOrdenRecoleccionSearchRepository = cadenaOrdenRecoleccionSearchRepository;
    }

    /**
     * POST  /cadena-orden-recoleccions : Create a new cadenaOrdenRecoleccion.
     *
     * @param cadenaOrdenRecoleccionDTO the cadenaOrdenRecoleccionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cadenaOrdenRecoleccionDTO, or with status 400 (Bad Request) if the cadenaOrdenRecoleccion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cadena-orden-recoleccions")
    @Timed
    public ResponseEntity<CadenaOrdenRecoleccionDTO> createCadenaOrdenRecoleccion(@Valid @RequestBody CadenaOrdenRecoleccionDTO cadenaOrdenRecoleccionDTO) throws URISyntaxException {
        log.debug("REST request to save CadenaOrdenRecoleccion : {}", cadenaOrdenRecoleccionDTO);
        if (cadenaOrdenRecoleccionDTO.getId() != null) {
            throw new BadRequestAlertException("A new cadenaOrdenRecoleccion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CadenaOrdenRecoleccion cadenaOrdenRecoleccion = cadenaOrdenRecoleccionMapper.toEntity(cadenaOrdenRecoleccionDTO);
        cadenaOrdenRecoleccion = cadenaOrdenRecoleccionRepository.save(cadenaOrdenRecoleccion);
        CadenaOrdenRecoleccionDTO result = cadenaOrdenRecoleccionMapper.toDto(cadenaOrdenRecoleccion);
        cadenaOrdenRecoleccionSearchRepository.save(cadenaOrdenRecoleccion);
        return ResponseEntity.created(new URI("/api/cadena-orden-recoleccions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cadena-orden-recoleccions : Updates an existing cadenaOrdenRecoleccion.
     *
     * @param cadenaOrdenRecoleccionDTO the cadenaOrdenRecoleccionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cadenaOrdenRecoleccionDTO,
     * or with status 400 (Bad Request) if the cadenaOrdenRecoleccionDTO is not valid,
     * or with status 500 (Internal Server Error) if the cadenaOrdenRecoleccionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cadena-orden-recoleccions")
    @Timed
    public ResponseEntity<CadenaOrdenRecoleccionDTO> updateCadenaOrdenRecoleccion(@Valid @RequestBody CadenaOrdenRecoleccionDTO cadenaOrdenRecoleccionDTO) throws URISyntaxException {
        log.debug("REST request to update CadenaOrdenRecoleccion : {}", cadenaOrdenRecoleccionDTO);
        if (cadenaOrdenRecoleccionDTO.getId() == null) {
            return createCadenaOrdenRecoleccion(cadenaOrdenRecoleccionDTO);
        }
        CadenaOrdenRecoleccion cadenaOrdenRecoleccion = cadenaOrdenRecoleccionMapper.toEntity(cadenaOrdenRecoleccionDTO);
        cadenaOrdenRecoleccion = cadenaOrdenRecoleccionRepository.save(cadenaOrdenRecoleccion);
        CadenaOrdenRecoleccionDTO result = cadenaOrdenRecoleccionMapper.toDto(cadenaOrdenRecoleccion);
        cadenaOrdenRecoleccionSearchRepository.save(cadenaOrdenRecoleccion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cadenaOrdenRecoleccionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cadena-orden-recoleccions : get all the cadenaOrdenRecoleccions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cadenaOrdenRecoleccions in body
     */
    @GetMapping("/cadena-orden-recoleccions")
    @Timed
    public List<CadenaOrdenRecoleccionDTO> getAllCadenaOrdenRecoleccions() {
        log.debug("REST request to get all CadenaOrdenRecoleccions");
        List<CadenaOrdenRecoleccion> cadenaOrdenRecoleccions = cadenaOrdenRecoleccionRepository.findAll();
        return cadenaOrdenRecoleccionMapper.toDto(cadenaOrdenRecoleccions);
        }

    /**
     * GET  /cadena-orden-recoleccions/:id : get the "id" cadenaOrdenRecoleccion.
     *
     * @param id the id of the cadenaOrdenRecoleccionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cadenaOrdenRecoleccionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cadena-orden-recoleccions/{id}")
    @Timed
    public ResponseEntity<CadenaOrdenRecoleccionDTO> getCadenaOrdenRecoleccion(@PathVariable Long id) {
        log.debug("REST request to get CadenaOrdenRecoleccion : {}", id);
        CadenaOrdenRecoleccion cadenaOrdenRecoleccion = cadenaOrdenRecoleccionRepository.findOne(id);
        CadenaOrdenRecoleccionDTO cadenaOrdenRecoleccionDTO = cadenaOrdenRecoleccionMapper.toDto(cadenaOrdenRecoleccion);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cadenaOrdenRecoleccionDTO));
    }

    /**
     * DELETE  /cadena-orden-recoleccions/:id : delete the "id" cadenaOrdenRecoleccion.
     *
     * @param id the id of the cadenaOrdenRecoleccionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cadena-orden-recoleccions/{id}")
    @Timed
    public ResponseEntity<Void> deleteCadenaOrdenRecoleccion(@PathVariable Long id) {
        log.debug("REST request to delete CadenaOrdenRecoleccion : {}", id);
        cadenaOrdenRecoleccionRepository.delete(id);
        cadenaOrdenRecoleccionSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/cadena-orden-recoleccions?query=:query : search for the cadenaOrdenRecoleccion corresponding
     * to the query.
     *
     * @param query the query of the cadenaOrdenRecoleccion search
     * @return the result of the search
     */
    @GetMapping("/_search/cadena-orden-recoleccions")
    @Timed
    public List<CadenaOrdenRecoleccionDTO> searchCadenaOrdenRecoleccions(@RequestParam String query) {
        log.debug("REST request to search CadenaOrdenRecoleccions for query {}", query);
        return StreamSupport
            .stream(cadenaOrdenRecoleccionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(cadenaOrdenRecoleccionMapper::toDto)
            .collect(Collectors.toList());
    }

}
