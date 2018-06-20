package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.SolicitudSuscripcion;

import com.radicalbytes.greenlife.repository.SolicitudSuscripcionRepository;
import com.radicalbytes.greenlife.repository.search.SolicitudSuscripcionSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.SolicitudSuscripcionDTO;
import com.radicalbytes.greenlife.service.mapper.SolicitudSuscripcionMapper;
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
 * REST controller for managing SolicitudSuscripcion.
 */
@RestController
@RequestMapping("/api")
public class SolicitudSuscripcionResource {

    private final Logger log = LoggerFactory.getLogger(SolicitudSuscripcionResource.class);

    private static final String ENTITY_NAME = "solicitudSuscripcion";

    private final SolicitudSuscripcionRepository solicitudSuscripcionRepository;

    private final SolicitudSuscripcionMapper solicitudSuscripcionMapper;

    private final SolicitudSuscripcionSearchRepository solicitudSuscripcionSearchRepository;

    public SolicitudSuscripcionResource(SolicitudSuscripcionRepository solicitudSuscripcionRepository, SolicitudSuscripcionMapper solicitudSuscripcionMapper, SolicitudSuscripcionSearchRepository solicitudSuscripcionSearchRepository) {
        this.solicitudSuscripcionRepository = solicitudSuscripcionRepository;
        this.solicitudSuscripcionMapper = solicitudSuscripcionMapper;
        this.solicitudSuscripcionSearchRepository = solicitudSuscripcionSearchRepository;
    }

    /**
     * POST  /solicitud-suscripcions : Create a new solicitudSuscripcion.
     *
     * @param solicitudSuscripcionDTO the solicitudSuscripcionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new solicitudSuscripcionDTO, or with status 400 (Bad Request) if the solicitudSuscripcion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/solicitud-suscripcions")
    @Timed
    public ResponseEntity<SolicitudSuscripcionDTO> createSolicitudSuscripcion(@Valid @RequestBody SolicitudSuscripcionDTO solicitudSuscripcionDTO) throws URISyntaxException {
        log.debug("REST request to save SolicitudSuscripcion : {}", solicitudSuscripcionDTO);
        if (solicitudSuscripcionDTO.getId() != null) {
            throw new BadRequestAlertException("A new solicitudSuscripcion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SolicitudSuscripcion solicitudSuscripcion = solicitudSuscripcionMapper.toEntity(solicitudSuscripcionDTO);
        solicitudSuscripcion = solicitudSuscripcionRepository.save(solicitudSuscripcion);
        SolicitudSuscripcionDTO result = solicitudSuscripcionMapper.toDto(solicitudSuscripcion);
        solicitudSuscripcionSearchRepository.save(solicitudSuscripcion);
        return ResponseEntity.created(new URI("/api/solicitud-suscripcions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /solicitud-suscripcions : Updates an existing solicitudSuscripcion.
     *
     * @param solicitudSuscripcionDTO the solicitudSuscripcionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated solicitudSuscripcionDTO,
     * or with status 400 (Bad Request) if the solicitudSuscripcionDTO is not valid,
     * or with status 500 (Internal Server Error) if the solicitudSuscripcionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/solicitud-suscripcions")
    @Timed
    public ResponseEntity<SolicitudSuscripcionDTO> updateSolicitudSuscripcion(@Valid @RequestBody SolicitudSuscripcionDTO solicitudSuscripcionDTO) throws URISyntaxException {
        log.debug("REST request to update SolicitudSuscripcion : {}", solicitudSuscripcionDTO);
        if (solicitudSuscripcionDTO.getId() == null) {
            return createSolicitudSuscripcion(solicitudSuscripcionDTO);
        }
        SolicitudSuscripcion solicitudSuscripcion = solicitudSuscripcionMapper.toEntity(solicitudSuscripcionDTO);
        solicitudSuscripcion = solicitudSuscripcionRepository.save(solicitudSuscripcion);
        SolicitudSuscripcionDTO result = solicitudSuscripcionMapper.toDto(solicitudSuscripcion);
        solicitudSuscripcionSearchRepository.save(solicitudSuscripcion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, solicitudSuscripcionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /solicitud-suscripcions : get all the solicitudSuscripcions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of solicitudSuscripcions in body
     */
    @GetMapping("/solicitud-suscripcions")
    @Timed
    public List<SolicitudSuscripcionDTO> getAllSolicitudSuscripcions() {
        log.debug("REST request to get all SolicitudSuscripcions");
        List<SolicitudSuscripcion> solicitudSuscripcions = solicitudSuscripcionRepository.findAll();
        return solicitudSuscripcionMapper.toDto(solicitudSuscripcions);
        }

    /**
     * GET  /solicitud-suscripcions/:id : get the "id" solicitudSuscripcion.
     *
     * @param id the id of the solicitudSuscripcionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the solicitudSuscripcionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/solicitud-suscripcions/{id}")
    @Timed
    public ResponseEntity<SolicitudSuscripcionDTO> getSolicitudSuscripcion(@PathVariable Long id) {
        log.debug("REST request to get SolicitudSuscripcion : {}", id);
        SolicitudSuscripcion solicitudSuscripcion = solicitudSuscripcionRepository.findOne(id);
        SolicitudSuscripcionDTO solicitudSuscripcionDTO = solicitudSuscripcionMapper.toDto(solicitudSuscripcion);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(solicitudSuscripcionDTO));
    }

    /**
     * DELETE  /solicitud-suscripcions/:id : delete the "id" solicitudSuscripcion.
     *
     * @param id the id of the solicitudSuscripcionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/solicitud-suscripcions/{id}")
    @Timed
    public ResponseEntity<Void> deleteSolicitudSuscripcion(@PathVariable Long id) {
        log.debug("REST request to delete SolicitudSuscripcion : {}", id);
        solicitudSuscripcionRepository.delete(id);
        solicitudSuscripcionSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/solicitud-suscripcions?query=:query : search for the solicitudSuscripcion corresponding
     * to the query.
     *
     * @param query the query of the solicitudSuscripcion search
     * @return the result of the search
     */
    @GetMapping("/_search/solicitud-suscripcions")
    @Timed
    public List<SolicitudSuscripcionDTO> searchSolicitudSuscripcions(@RequestParam String query) {
        log.debug("REST request to search SolicitudSuscripcions for query {}", query);
        return StreamSupport
            .stream(solicitudSuscripcionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(solicitudSuscripcionMapper::toDto)
            .collect(Collectors.toList());
    }

}
