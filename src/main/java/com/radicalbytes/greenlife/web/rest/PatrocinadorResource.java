package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Patrocinador;

import com.radicalbytes.greenlife.repository.PatrocinadorRepository;
import com.radicalbytes.greenlife.repository.search.PatrocinadorSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.PatrocinadorDTO;
import com.radicalbytes.greenlife.service.mapper.PatrocinadorMapper;
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
 * REST controller for managing Patrocinador.
 */
@RestController
@RequestMapping("/api")
public class PatrocinadorResource {

    private final Logger log = LoggerFactory.getLogger(PatrocinadorResource.class);

    private static final String ENTITY_NAME = "patrocinador";

    private final PatrocinadorRepository patrocinadorRepository;

    private final PatrocinadorMapper patrocinadorMapper;

    private final PatrocinadorSearchRepository patrocinadorSearchRepository;

    public PatrocinadorResource(PatrocinadorRepository patrocinadorRepository, PatrocinadorMapper patrocinadorMapper, PatrocinadorSearchRepository patrocinadorSearchRepository) {
        this.patrocinadorRepository = patrocinadorRepository;
        this.patrocinadorMapper = patrocinadorMapper;
        this.patrocinadorSearchRepository = patrocinadorSearchRepository;
    }

    /**
     * POST  /patrocinadors : Create a new patrocinador.
     *
     * @param patrocinadorDTO the patrocinadorDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new patrocinadorDTO, or with status 400 (Bad Request) if the patrocinador has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/patrocinadors")
    @Timed
    public ResponseEntity<PatrocinadorDTO> createPatrocinador(@Valid @RequestBody PatrocinadorDTO patrocinadorDTO) throws URISyntaxException {
        log.debug("REST request to save Patrocinador : {}", patrocinadorDTO);
        if (patrocinadorDTO.getId() != null) {
            throw new BadRequestAlertException("A new patrocinador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Patrocinador patrocinador = patrocinadorMapper.toEntity(patrocinadorDTO);
        patrocinador = patrocinadorRepository.save(patrocinador);
        PatrocinadorDTO result = patrocinadorMapper.toDto(patrocinador);
        patrocinadorSearchRepository.save(patrocinador);
        return ResponseEntity.created(new URI("/api/patrocinadors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /patrocinadors : Updates an existing patrocinador.
     *
     * @param patrocinadorDTO the patrocinadorDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated patrocinadorDTO,
     * or with status 400 (Bad Request) if the patrocinadorDTO is not valid,
     * or with status 500 (Internal Server Error) if the patrocinadorDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/patrocinadors")
    @Timed
    public ResponseEntity<PatrocinadorDTO> updatePatrocinador(@Valid @RequestBody PatrocinadorDTO patrocinadorDTO) throws URISyntaxException {
        log.debug("REST request to update Patrocinador : {}", patrocinadorDTO);
        if (patrocinadorDTO.getId() == null) {
            return createPatrocinador(patrocinadorDTO);
        }
        Patrocinador patrocinador = patrocinadorMapper.toEntity(patrocinadorDTO);
        patrocinador = patrocinadorRepository.save(patrocinador);
        PatrocinadorDTO result = patrocinadorMapper.toDto(patrocinador);
        patrocinadorSearchRepository.save(patrocinador);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, patrocinadorDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /patrocinadors : get all the patrocinadors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of patrocinadors in body
     */
    @GetMapping("/patrocinadors")
    @Timed
    public List<PatrocinadorDTO> getAllPatrocinadors() {
        log.debug("REST request to get all Patrocinadors");
        List<Patrocinador> patrocinadors = patrocinadorRepository.findAllWithEagerRelationships();
        return patrocinadorMapper.toDto(patrocinadors);
        }

    /**
     * GET  /patrocinadors/:id : get the "id" patrocinador.
     *
     * @param id the id of the patrocinadorDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the patrocinadorDTO, or with status 404 (Not Found)
     */
    @GetMapping("/patrocinadors/{id}")
    @Timed
    public ResponseEntity<PatrocinadorDTO> getPatrocinador(@PathVariable Long id) {
        log.debug("REST request to get Patrocinador : {}", id);
        Patrocinador patrocinador = patrocinadorRepository.findOneWithEagerRelationships(id);
        PatrocinadorDTO patrocinadorDTO = patrocinadorMapper.toDto(patrocinador);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(patrocinadorDTO));
    }

    /**
     * DELETE  /patrocinadors/:id : delete the "id" patrocinador.
     *
     * @param id the id of the patrocinadorDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/patrocinadors/{id}")
    @Timed
    public ResponseEntity<Void> deletePatrocinador(@PathVariable Long id) {
        log.debug("REST request to delete Patrocinador : {}", id);
        patrocinadorRepository.delete(id);
        patrocinadorSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/patrocinadors?query=:query : search for the patrocinador corresponding
     * to the query.
     *
     * @param query the query of the patrocinador search
     * @return the result of the search
     */
    @GetMapping("/_search/patrocinadors")
    @Timed
    public List<PatrocinadorDTO> searchPatrocinadors(@RequestParam String query) {
        log.debug("REST request to search Patrocinadors for query {}", query);
        return StreamSupport
            .stream(patrocinadorSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(patrocinadorMapper::toDto)
            .collect(Collectors.toList());
    }

}
