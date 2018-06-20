package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.ComentarioPublicacion;

import com.radicalbytes.greenlife.repository.ComentarioPublicacionRepository;
import com.radicalbytes.greenlife.repository.search.ComentarioPublicacionSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.ComentarioPublicacionDTO;
import com.radicalbytes.greenlife.service.mapper.ComentarioPublicacionMapper;
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
 * REST controller for managing ComentarioPublicacion.
 */
@RestController
@RequestMapping("/api")
public class ComentarioPublicacionResource {

    private final Logger log = LoggerFactory.getLogger(ComentarioPublicacionResource.class);

    private static final String ENTITY_NAME = "comentarioPublicacion";

    private final ComentarioPublicacionRepository comentarioPublicacionRepository;

    private final ComentarioPublicacionMapper comentarioPublicacionMapper;

    private final ComentarioPublicacionSearchRepository comentarioPublicacionSearchRepository;

    public ComentarioPublicacionResource(ComentarioPublicacionRepository comentarioPublicacionRepository, ComentarioPublicacionMapper comentarioPublicacionMapper, ComentarioPublicacionSearchRepository comentarioPublicacionSearchRepository) {
        this.comentarioPublicacionRepository = comentarioPublicacionRepository;
        this.comentarioPublicacionMapper = comentarioPublicacionMapper;
        this.comentarioPublicacionSearchRepository = comentarioPublicacionSearchRepository;
    }

    /**
     * POST  /comentario-publicacions : Create a new comentarioPublicacion.
     *
     * @param comentarioPublicacionDTO the comentarioPublicacionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new comentarioPublicacionDTO, or with status 400 (Bad Request) if the comentarioPublicacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/comentario-publicacions")
    @Timed
    public ResponseEntity<ComentarioPublicacionDTO> createComentarioPublicacion(@Valid @RequestBody ComentarioPublicacionDTO comentarioPublicacionDTO) throws URISyntaxException {
        log.debug("REST request to save ComentarioPublicacion : {}", comentarioPublicacionDTO);
        if (comentarioPublicacionDTO.getId() != null) {
            throw new BadRequestAlertException("A new comentarioPublicacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComentarioPublicacion comentarioPublicacion = comentarioPublicacionMapper.toEntity(comentarioPublicacionDTO);
        comentarioPublicacion = comentarioPublicacionRepository.save(comentarioPublicacion);
        ComentarioPublicacionDTO result = comentarioPublicacionMapper.toDto(comentarioPublicacion);
        comentarioPublicacionSearchRepository.save(comentarioPublicacion);
        return ResponseEntity.created(new URI("/api/comentario-publicacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /comentario-publicacions : Updates an existing comentarioPublicacion.
     *
     * @param comentarioPublicacionDTO the comentarioPublicacionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated comentarioPublicacionDTO,
     * or with status 400 (Bad Request) if the comentarioPublicacionDTO is not valid,
     * or with status 500 (Internal Server Error) if the comentarioPublicacionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/comentario-publicacions")
    @Timed
    public ResponseEntity<ComentarioPublicacionDTO> updateComentarioPublicacion(@Valid @RequestBody ComentarioPublicacionDTO comentarioPublicacionDTO) throws URISyntaxException {
        log.debug("REST request to update ComentarioPublicacion : {}", comentarioPublicacionDTO);
        if (comentarioPublicacionDTO.getId() == null) {
            return createComentarioPublicacion(comentarioPublicacionDTO);
        }
        ComentarioPublicacion comentarioPublicacion = comentarioPublicacionMapper.toEntity(comentarioPublicacionDTO);
        comentarioPublicacion = comentarioPublicacionRepository.save(comentarioPublicacion);
        ComentarioPublicacionDTO result = comentarioPublicacionMapper.toDto(comentarioPublicacion);
        comentarioPublicacionSearchRepository.save(comentarioPublicacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, comentarioPublicacionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /comentario-publicacions : get all the comentarioPublicacions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of comentarioPublicacions in body
     */
    @GetMapping("/comentario-publicacions")
    @Timed
    public List<ComentarioPublicacionDTO> getAllComentarioPublicacions() {
        log.debug("REST request to get all ComentarioPublicacions");
        List<ComentarioPublicacion> comentarioPublicacions = comentarioPublicacionRepository.findAll();
        return comentarioPublicacionMapper.toDto(comentarioPublicacions);
        }

    /**
     * GET  /comentario-publicacions/:id : get the "id" comentarioPublicacion.
     *
     * @param id the id of the comentarioPublicacionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the comentarioPublicacionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/comentario-publicacions/{id}")
    @Timed
    public ResponseEntity<ComentarioPublicacionDTO> getComentarioPublicacion(@PathVariable Long id) {
        log.debug("REST request to get ComentarioPublicacion : {}", id);
        ComentarioPublicacion comentarioPublicacion = comentarioPublicacionRepository.findOne(id);
        ComentarioPublicacionDTO comentarioPublicacionDTO = comentarioPublicacionMapper.toDto(comentarioPublicacion);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(comentarioPublicacionDTO));
    }

    /**
     * DELETE  /comentario-publicacions/:id : delete the "id" comentarioPublicacion.
     *
     * @param id the id of the comentarioPublicacionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/comentario-publicacions/{id}")
    @Timed
    public ResponseEntity<Void> deleteComentarioPublicacion(@PathVariable Long id) {
        log.debug("REST request to delete ComentarioPublicacion : {}", id);
        comentarioPublicacionRepository.delete(id);
        comentarioPublicacionSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/comentario-publicacions?query=:query : search for the comentarioPublicacion corresponding
     * to the query.
     *
     * @param query the query of the comentarioPublicacion search
     * @return the result of the search
     */
    @GetMapping("/_search/comentario-publicacions")
    @Timed
    public List<ComentarioPublicacionDTO> searchComentarioPublicacions(@RequestParam String query) {
        log.debug("REST request to search ComentarioPublicacions for query {}", query);
        return StreamSupport
            .stream(comentarioPublicacionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(comentarioPublicacionMapper::toDto)
            .collect(Collectors.toList());
    }

}
