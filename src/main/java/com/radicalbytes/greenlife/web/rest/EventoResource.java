package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Evento;

import com.radicalbytes.greenlife.repository.EventoRepository;
import com.radicalbytes.greenlife.repository.search.EventoSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.EventoDTO;
import com.radicalbytes.greenlife.service.mapper.EventoMapper;
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
 * REST controller for managing Evento.
 */
@RestController
@RequestMapping("/api")
public class EventoResource {

    private final Logger log = LoggerFactory.getLogger(EventoResource.class);

    private static final String ENTITY_NAME = "evento";

    private final EventoRepository eventoRepository;

    private final EventoMapper eventoMapper;

    private final EventoSearchRepository eventoSearchRepository;

    public EventoResource(EventoRepository eventoRepository, EventoMapper eventoMapper, EventoSearchRepository eventoSearchRepository) {
        this.eventoRepository = eventoRepository;
        this.eventoMapper = eventoMapper;
        this.eventoSearchRepository = eventoSearchRepository;
    }

    /**
     * POST  /eventos : Create a new evento.
     *
     * @param eventoDTO the eventoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new eventoDTO, or with status 400 (Bad Request) if the evento has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/eventos")
    @Timed
    public ResponseEntity<EventoDTO> createEvento(@Valid @RequestBody EventoDTO eventoDTO) throws URISyntaxException {
        log.debug("REST request to save Evento : {}", eventoDTO);
        if (eventoDTO.getId() != null) {
            throw new BadRequestAlertException("A new evento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Evento evento = eventoMapper.toEntity(eventoDTO);
        evento = eventoRepository.save(evento);
        EventoDTO result = eventoMapper.toDto(evento);
        eventoSearchRepository.save(evento);
        return ResponseEntity.created(new URI("/api/eventos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /eventos : Updates an existing evento.
     *
     * @param eventoDTO the eventoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated eventoDTO,
     * or with status 400 (Bad Request) if the eventoDTO is not valid,
     * or with status 500 (Internal Server Error) if the eventoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/eventos")
    @Timed
    public ResponseEntity<EventoDTO> updateEvento(@Valid @RequestBody EventoDTO eventoDTO) throws URISyntaxException {
        log.debug("REST request to update Evento : {}", eventoDTO);
        if (eventoDTO.getId() == null) {
            return createEvento(eventoDTO);
        }
        Evento evento = eventoMapper.toEntity(eventoDTO);
        evento = eventoRepository.save(evento);
        EventoDTO result = eventoMapper.toDto(evento);
        eventoSearchRepository.save(evento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, eventoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /eventos : get all the eventos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of eventos in body
     */
    @GetMapping("/eventos")
    @Timed
    public List<EventoDTO> getAllEventos() {
        log.debug("REST request to get all Eventos");
        List<Evento> eventos = eventoRepository.findAllWithEagerRelationships();
        return eventoMapper.toDto(eventos);
        }

    /**
     * GET  /eventos/:id : get the "id" evento.
     *
     * @param id the id of the eventoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the eventoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/eventos/{id}")
    @Timed
    public ResponseEntity<EventoDTO> getEvento(@PathVariable Long id) {
        log.debug("REST request to get Evento : {}", id);
        Evento evento = eventoRepository.findOneWithEagerRelationships(id);
        EventoDTO eventoDTO = eventoMapper.toDto(evento);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(eventoDTO));
    }

    /**
     * DELETE  /eventos/:id : delete the "id" evento.
     *
     * @param id the id of the eventoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/eventos/{id}")
    @Timed
    public ResponseEntity<Void> deleteEvento(@PathVariable Long id) {
        log.debug("REST request to delete Evento : {}", id);
        eventoRepository.delete(id);
        eventoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/eventos?query=:query : search for the evento corresponding
     * to the query.
     *
     * @param query the query of the evento search
     * @return the result of the search
     */
    @GetMapping("/_search/eventos")
    @Timed
    public List<EventoDTO> searchEventos(@RequestParam String query) {
        log.debug("REST request to search Eventos for query {}", query);
        return StreamSupport
            .stream(eventoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(eventoMapper::toDto)
            .collect(Collectors.toList());
    }

}
