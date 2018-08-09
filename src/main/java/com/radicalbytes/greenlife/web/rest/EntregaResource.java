package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Entrega;

import com.radicalbytes.greenlife.repository.EntregaRepository;
import com.radicalbytes.greenlife.repository.search.EntregaSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.EntregaDTO;
import com.radicalbytes.greenlife.service.mapper.EntregaMapper;
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
 * REST controller for managing Entrega.
 */
@RestController
@RequestMapping("/api")
public class EntregaResource {

    private final Logger log = LoggerFactory.getLogger(EntregaResource.class);

    private static final String ENTITY_NAME = "entrega";

    private final EntregaRepository entregaRepository;

    private final EntregaMapper entregaMapper;

    private final EntregaSearchRepository entregaSearchRepository;

    public EntregaResource(EntregaRepository entregaRepository, EntregaMapper entregaMapper,
            EntregaSearchRepository entregaSearchRepository) {
        this.entregaRepository = entregaRepository;
        this.entregaMapper = entregaMapper;
        this.entregaSearchRepository = entregaSearchRepository;
    }

    /**
     * POST /entregas : Create a new entrega.
     *
     * @param entregaDTO the entregaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new
     *         entregaDTO, or with status 400 (Bad Request) if the entrega has
     *         already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/entregas")
    @Timed
    public ResponseEntity<EntregaDTO> createEntrega(@Valid @RequestBody EntregaDTO entregaDTO)
            throws URISyntaxException {
        log.debug("REST request to save Entrega : {}", entregaDTO);
        if (entregaDTO.getId() != null) {
            throw new BadRequestAlertException("A new entrega cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Entrega entrega = entregaMapper.toEntity(entregaDTO);
        entrega = entregaRepository.save(entrega);
        EntregaDTO result = entregaMapper.toDto(entrega);
        entregaSearchRepository.save(entrega);
        return ResponseEntity.created(new URI("/api/entregas/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT /entregas : Updates an existing entrega.
     *
     * @param entregaDTO the entregaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     *         entregaDTO, or with status 400 (Bad Request) if the entregaDTO is not
     *         valid, or with status 500 (Internal Server Error) if the entregaDTO
     *         couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/entregas")
    @Timed
    public ResponseEntity<EntregaDTO> updateEntrega(@Valid @RequestBody EntregaDTO entregaDTO)
            throws URISyntaxException {
        log.debug("REST request to update Entrega : {}", entregaDTO);
        if (entregaDTO.getId() == null) {
            return createEntrega(entregaDTO);
        }
        Entrega entrega = entregaMapper.toEntity(entregaDTO);
        entrega = entregaRepository.save(entrega);
        EntregaDTO result = entregaMapper.toDto(entrega);
        entregaSearchRepository.save(entrega);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, entregaDTO.getId().toString())).body(result);
    }

    /**
     * GET /entregas : get all the entregas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of entregas in
     *         body
     */
    @GetMapping("/entregas")
    @Timed
    public List<EntregaDTO> getAllEntregas() {
        log.debug("REST request to get all Entregas");
        List<Entrega> entregas = entregaRepository.findAll();
        return entregaMapper.toDto(entregas);
    }

    @GetMapping("/entregas/comercio/{idComercio}")
    @Timed
    public List<EntregaDTO> getAllByComercio(@PathVariable long idComercio) {
        log.debug("REST request to get all Entregas");
        List<Entrega> entregas = entregaRepository.queryFindByComercioId(idComercio);
        return entregaMapper.toDto(entregas);
    }

    /**
     * GET /entregas/:id : get the "id" entrega.
     *
     * @param id the id of the entregaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the entregaDTO,
     *         or with status 404 (Not Found)
     */
    @GetMapping("/entregas/{id}")
    @Timed
    public ResponseEntity<EntregaDTO> getEntrega(@PathVariable Long id) {
        log.debug("REST request to get Entrega : {}", id);
        Entrega entrega = entregaRepository.findOne(id);
        EntregaDTO entregaDTO = entregaMapper.toDto(entrega);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(entregaDTO));
    }

    /**
     * DELETE /entregas/:id : delete the "id" entrega.
     *
     * @param id the id of the entregaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/entregas/{id}")
    @Timed
    public ResponseEntity<Void> deleteEntrega(@PathVariable Long id) {
        log.debug("REST request to delete Entrega : {}", id);
        entregaRepository.delete(id);
        entregaSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH /_search/entregas?query=:query : search for the entrega corresponding
     * to the query.
     *
     * @param query the query of the entrega search
     * @return the result of the search
     */
    @GetMapping("/_search/entregas")
    @Timed
    public List<EntregaDTO> searchEntregas(@RequestParam String query) {
        log.debug("REST request to search Entregas for query {}", query);
        return StreamSupport.stream(entregaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
                .map(entregaMapper::toDto).collect(Collectors.toList());
    }

}
