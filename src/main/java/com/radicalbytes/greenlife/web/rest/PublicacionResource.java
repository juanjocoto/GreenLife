package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Publicacion;

import com.radicalbytes.greenlife.repository.PublicacionRepository;
import com.radicalbytes.greenlife.repository.search.PublicacionSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.PublicacionDTO;
import com.radicalbytes.greenlife.service.mapper.PublicacionMapper;
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
 * REST controller for managing Publicacion.
 */
@RestController
@RequestMapping("/api")
public class PublicacionResource {

    private final Logger log = LoggerFactory.getLogger(PublicacionResource.class);

    private static final String ENTITY_NAME = "publicacion";

    private final PublicacionRepository publicacionRepository;

    private final PublicacionMapper publicacionMapper;

    private final PublicacionSearchRepository publicacionSearchRepository;

    public PublicacionResource(PublicacionRepository publicacionRepository, PublicacionMapper publicacionMapper, PublicacionSearchRepository publicacionSearchRepository) {
        this.publicacionRepository = publicacionRepository;
        this.publicacionMapper = publicacionMapper;
        this.publicacionSearchRepository = publicacionSearchRepository;
    }

    /**
     * POST  /publicacions : Create a new publicacion.
     *
     * @param publicacionDTO the publicacionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new publicacionDTO, or with status 400 (Bad Request) if the publicacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/publicacions")
    @Timed
    public ResponseEntity<PublicacionDTO> createPublicacion(@Valid @RequestBody PublicacionDTO publicacionDTO) throws URISyntaxException {
        log.debug("REST request to save Publicacion : {}", publicacionDTO);
        if (publicacionDTO.getId() != null) {
            throw new BadRequestAlertException("A new publicacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Publicacion publicacion = publicacionMapper.toEntity(publicacionDTO);
        publicacion = publicacionRepository.save(publicacion);
        PublicacionDTO result = publicacionMapper.toDto(publicacion);
        publicacionSearchRepository.save(publicacion);
        return ResponseEntity.created(new URI("/api/publicacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /publicacions : Updates an existing publicacion.
     *
     * @param publicacionDTO the publicacionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated publicacionDTO,
     * or with status 400 (Bad Request) if the publicacionDTO is not valid,
     * or with status 500 (Internal Server Error) if the publicacionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/publicacions")
    @Timed
    public ResponseEntity<PublicacionDTO> updatePublicacion(@Valid @RequestBody PublicacionDTO publicacionDTO) throws URISyntaxException {
        log.debug("REST request to update Publicacion : {}", publicacionDTO);
        if (publicacionDTO.getId() == null) {
            return createPublicacion(publicacionDTO);
        }
        Publicacion publicacion = publicacionMapper.toEntity(publicacionDTO);
        publicacion = publicacionRepository.save(publicacion);
        PublicacionDTO result = publicacionMapper.toDto(publicacion);
        publicacionSearchRepository.save(publicacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, publicacionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /publicacions : get all the publicacions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of publicacions in body
     */
    @GetMapping("/publicacions")
    @Timed
    public List<PublicacionDTO> getAllPublicacions() {
        log.debug("REST request to get all Publicacions");
        List<Publicacion> publicacions = publicacionRepository.findAllWithEagerRelationships();
        return publicacionMapper.toDto(publicacions);
        }

    /**
     * GET  /publicacions/:id : get the "id" publicacion.
     *
     * @param id the id of the publicacionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the publicacionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/publicacions/{id}")
    @Timed
    public ResponseEntity<PublicacionDTO> getPublicacion(@PathVariable Long id) {
        log.debug("REST request to get Publicacion : {}", id);
        Publicacion publicacion = publicacionRepository.findOneWithEagerRelationships(id);
        PublicacionDTO publicacionDTO = publicacionMapper.toDto(publicacion);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(publicacionDTO));
    }

    /**
     * DELETE  /publicacions/:id : delete the "id" publicacion.
     *
     * @param id the id of the publicacionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/publicacions/{id}")
    @Timed
    public ResponseEntity<Void> deletePublicacion(@PathVariable Long id) {
        log.debug("REST request to delete Publicacion : {}", id);
        publicacionRepository.delete(id);
        publicacionSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/publicacions?query=:query : search for the publicacion corresponding
     * to the query.
     *
     * @param query the query of the publicacion search
     * @return the result of the search
     */
    @GetMapping("/_search/publicacions")
    @Timed
    public List<PublicacionDTO> searchPublicacions(@RequestParam String query) {
        log.debug("REST request to search Publicacions for query {}", query);
        return StreamSupport
            .stream(publicacionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(publicacionMapper::toDto)
            .collect(Collectors.toList());
    }

}
