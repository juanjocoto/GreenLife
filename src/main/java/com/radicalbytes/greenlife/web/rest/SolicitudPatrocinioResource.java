package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.SolicitudPatrocinio;

import com.radicalbytes.greenlife.repository.SolicitudPatrocinioRepository;
import com.radicalbytes.greenlife.repository.search.SolicitudPatrocinioSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.SolicitudPatrocinioDTO;
import com.radicalbytes.greenlife.service.mapper.SolicitudPatrocinioMapper;
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
 * REST controller for managing SolicitudPatrocinio.
 */
@RestController
@RequestMapping("/api")
public class SolicitudPatrocinioResource {

    private final Logger log = LoggerFactory.getLogger(SolicitudPatrocinioResource.class);

    private static final String ENTITY_NAME = "solicitudPatrocinio";

    private final SolicitudPatrocinioRepository solicitudPatrocinioRepository;

    private final SolicitudPatrocinioMapper solicitudPatrocinioMapper;

    private final SolicitudPatrocinioSearchRepository solicitudPatrocinioSearchRepository;

    public SolicitudPatrocinioResource(SolicitudPatrocinioRepository solicitudPatrocinioRepository, SolicitudPatrocinioMapper solicitudPatrocinioMapper, SolicitudPatrocinioSearchRepository solicitudPatrocinioSearchRepository) {
        this.solicitudPatrocinioRepository = solicitudPatrocinioRepository;
        this.solicitudPatrocinioMapper = solicitudPatrocinioMapper;
        this.solicitudPatrocinioSearchRepository = solicitudPatrocinioSearchRepository;
    }

    /**
     * POST  /solicitud-patrocinios : Create a new solicitudPatrocinio.
     *
     * @param solicitudPatrocinioDTO the solicitudPatrocinioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new solicitudPatrocinioDTO, or with status 400 (Bad Request) if the solicitudPatrocinio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/solicitud-patrocinios")
    @Timed
    public ResponseEntity<SolicitudPatrocinioDTO> createSolicitudPatrocinio(@Valid @RequestBody SolicitudPatrocinioDTO solicitudPatrocinioDTO) throws URISyntaxException {
        log.debug("REST request to save SolicitudPatrocinio : {}", solicitudPatrocinioDTO);
        if (solicitudPatrocinioDTO.getId() != null) {
            throw new BadRequestAlertException("A new solicitudPatrocinio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SolicitudPatrocinio solicitudPatrocinio = solicitudPatrocinioMapper.toEntity(solicitudPatrocinioDTO);
        solicitudPatrocinio = solicitudPatrocinioRepository.save(solicitudPatrocinio);
        SolicitudPatrocinioDTO result = solicitudPatrocinioMapper.toDto(solicitudPatrocinio);
        solicitudPatrocinioSearchRepository.save(solicitudPatrocinio);
        return ResponseEntity.created(new URI("/api/solicitud-patrocinios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /solicitud-patrocinios : Updates an existing solicitudPatrocinio.
     *
     * @param solicitudPatrocinioDTO the solicitudPatrocinioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated solicitudPatrocinioDTO,
     * or with status 400 (Bad Request) if the solicitudPatrocinioDTO is not valid,
     * or with status 500 (Internal Server Error) if the solicitudPatrocinioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/solicitud-patrocinios")
    @Timed
    public ResponseEntity<SolicitudPatrocinioDTO> updateSolicitudPatrocinio(@Valid @RequestBody SolicitudPatrocinioDTO solicitudPatrocinioDTO) throws URISyntaxException {
        log.debug("REST request to update SolicitudPatrocinio : {}", solicitudPatrocinioDTO);
        if (solicitudPatrocinioDTO.getId() == null) {
            return createSolicitudPatrocinio(solicitudPatrocinioDTO);
        }
        SolicitudPatrocinio solicitudPatrocinio = solicitudPatrocinioMapper.toEntity(solicitudPatrocinioDTO);
        solicitudPatrocinio = solicitudPatrocinioRepository.save(solicitudPatrocinio);
        SolicitudPatrocinioDTO result = solicitudPatrocinioMapper.toDto(solicitudPatrocinio);
        solicitudPatrocinioSearchRepository.save(solicitudPatrocinio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, solicitudPatrocinioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /solicitud-patrocinios : get all the solicitudPatrocinios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of solicitudPatrocinios in body
     */
    @GetMapping("/solicitud-patrocinios")
    @Timed
    public List<SolicitudPatrocinioDTO> getAllSolicitudPatrocinios() {
        log.debug("REST request to get all SolicitudPatrocinios");
        List<SolicitudPatrocinio> solicitudPatrocinios = solicitudPatrocinioRepository.findAll();
        return solicitudPatrocinioMapper.toDto(solicitudPatrocinios);
        }

    /**
     * GET  /solicitud-patrocinios/:id : get the "id" solicitudPatrocinio.
     *
     * @param id the id of the solicitudPatrocinioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the solicitudPatrocinioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/solicitud-patrocinios/{id}")
    @Timed
    public ResponseEntity<SolicitudPatrocinioDTO> getSolicitudPatrocinio(@PathVariable Long id) {
        log.debug("REST request to get SolicitudPatrocinio : {}", id);
        SolicitudPatrocinio solicitudPatrocinio = solicitudPatrocinioRepository.findOne(id);
        SolicitudPatrocinioDTO solicitudPatrocinioDTO = solicitudPatrocinioMapper.toDto(solicitudPatrocinio);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(solicitudPatrocinioDTO));
    }

    /**
     * DELETE  /solicitud-patrocinios/:id : delete the "id" solicitudPatrocinio.
     *
     * @param id the id of the solicitudPatrocinioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/solicitud-patrocinios/{id}")
    @Timed
    public ResponseEntity<Void> deleteSolicitudPatrocinio(@PathVariable Long id) {
        log.debug("REST request to delete SolicitudPatrocinio : {}", id);
        solicitudPatrocinioRepository.delete(id);
        solicitudPatrocinioSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/solicitud-patrocinios?query=:query : search for the solicitudPatrocinio corresponding
     * to the query.
     *
     * @param query the query of the solicitudPatrocinio search
     * @return the result of the search
     */
    @GetMapping("/_search/solicitud-patrocinios")
    @Timed
    public List<SolicitudPatrocinioDTO> searchSolicitudPatrocinios(@RequestParam String query) {
        log.debug("REST request to search SolicitudPatrocinios for query {}", query);
        return StreamSupport
            .stream(solicitudPatrocinioSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(solicitudPatrocinioMapper::toDto)
            .collect(Collectors.toList());
    }

}
