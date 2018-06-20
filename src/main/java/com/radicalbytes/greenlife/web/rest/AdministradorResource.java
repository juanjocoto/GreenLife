package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Administrador;

import com.radicalbytes.greenlife.repository.AdministradorRepository;
import com.radicalbytes.greenlife.repository.search.AdministradorSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.AdministradorDTO;
import com.radicalbytes.greenlife.service.mapper.AdministradorMapper;
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
 * REST controller for managing Administrador.
 */
@RestController
@RequestMapping("/api")
public class AdministradorResource {

    private final Logger log = LoggerFactory.getLogger(AdministradorResource.class);

    private static final String ENTITY_NAME = "administrador";

    private final AdministradorRepository administradorRepository;

    private final AdministradorMapper administradorMapper;

    private final AdministradorSearchRepository administradorSearchRepository;

    public AdministradorResource(AdministradorRepository administradorRepository, AdministradorMapper administradorMapper, AdministradorSearchRepository administradorSearchRepository) {
        this.administradorRepository = administradorRepository;
        this.administradorMapper = administradorMapper;
        this.administradorSearchRepository = administradorSearchRepository;
    }

    /**
     * POST  /administradors : Create a new administrador.
     *
     * @param administradorDTO the administradorDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new administradorDTO, or with status 400 (Bad Request) if the administrador has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/administradors")
    @Timed
    public ResponseEntity<AdministradorDTO> createAdministrador(@RequestBody AdministradorDTO administradorDTO) throws URISyntaxException {
        log.debug("REST request to save Administrador : {}", administradorDTO);
        if (administradorDTO.getId() != null) {
            throw new BadRequestAlertException("A new administrador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Administrador administrador = administradorMapper.toEntity(administradorDTO);
        administrador = administradorRepository.save(administrador);
        AdministradorDTO result = administradorMapper.toDto(administrador);
        administradorSearchRepository.save(administrador);
        return ResponseEntity.created(new URI("/api/administradors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /administradors : Updates an existing administrador.
     *
     * @param administradorDTO the administradorDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated administradorDTO,
     * or with status 400 (Bad Request) if the administradorDTO is not valid,
     * or with status 500 (Internal Server Error) if the administradorDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/administradors")
    @Timed
    public ResponseEntity<AdministradorDTO> updateAdministrador(@RequestBody AdministradorDTO administradorDTO) throws URISyntaxException {
        log.debug("REST request to update Administrador : {}", administradorDTO);
        if (administradorDTO.getId() == null) {
            return createAdministrador(administradorDTO);
        }
        Administrador administrador = administradorMapper.toEntity(administradorDTO);
        administrador = administradorRepository.save(administrador);
        AdministradorDTO result = administradorMapper.toDto(administrador);
        administradorSearchRepository.save(administrador);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, administradorDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /administradors : get all the administradors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of administradors in body
     */
    @GetMapping("/administradors")
    @Timed
    public List<AdministradorDTO> getAllAdministradors() {
        log.debug("REST request to get all Administradors");
        List<Administrador> administradors = administradorRepository.findAll();
        return administradorMapper.toDto(administradors);
        }

    /**
     * GET  /administradors/:id : get the "id" administrador.
     *
     * @param id the id of the administradorDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the administradorDTO, or with status 404 (Not Found)
     */
    @GetMapping("/administradors/{id}")
    @Timed
    public ResponseEntity<AdministradorDTO> getAdministrador(@PathVariable Long id) {
        log.debug("REST request to get Administrador : {}", id);
        Administrador administrador = administradorRepository.findOne(id);
        AdministradorDTO administradorDTO = administradorMapper.toDto(administrador);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(administradorDTO));
    }

    /**
     * DELETE  /administradors/:id : delete the "id" administrador.
     *
     * @param id the id of the administradorDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/administradors/{id}")
    @Timed
    public ResponseEntity<Void> deleteAdministrador(@PathVariable Long id) {
        log.debug("REST request to delete Administrador : {}", id);
        administradorRepository.delete(id);
        administradorSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/administradors?query=:query : search for the administrador corresponding
     * to the query.
     *
     * @param query the query of the administrador search
     * @return the result of the search
     */
    @GetMapping("/_search/administradors")
    @Timed
    public List<AdministradorDTO> searchAdministradors(@RequestParam String query) {
        log.debug("REST request to search Administradors for query {}", query);
        return StreamSupport
            .stream(administradorSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(administradorMapper::toDto)
            .collect(Collectors.toList());
    }

}
