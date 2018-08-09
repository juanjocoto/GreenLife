package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Comercio;

import com.radicalbytes.greenlife.domain.enumeration.TipoComercio;
import com.radicalbytes.greenlife.repository.ComercioRepository;
import com.radicalbytes.greenlife.repository.search.ComercioSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.ComercioDTO;
import com.radicalbytes.greenlife.service.mapper.ComercioMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Comercio.
 */
@RestController
@RequestMapping("/api")
public class ComercioResource {

    private final Logger log = LoggerFactory.getLogger(ComercioResource.class);

    private static final String ENTITY_NAME = "comercio";

    private final ComercioRepository comercioRepository;

    private final ComercioMapper comercioMapper;

    private final ComercioSearchRepository comercioSearchRepository;

    public ComercioResource(ComercioRepository comercioRepository, ComercioMapper comercioMapper, ComercioSearchRepository comercioSearchRepository) {
        this.comercioRepository = comercioRepository;
        this.comercioMapper = comercioMapper;
        this.comercioSearchRepository = comercioSearchRepository;
    }

    /**
     * POST  /comercios : Create a new comercio.
     *
     * @param comercioDTO the comercioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new comercioDTO, or with status 400 (Bad Request) if the comercio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/comercios")
    @Timed
    public ResponseEntity<ComercioDTO> createComercio(@Valid @RequestBody ComercioDTO comercioDTO) throws URISyntaxException {
        log.debug("REST request to save Comercio : {}", comercioDTO);
        if (comercioDTO.getId() != null) {
            throw new BadRequestAlertException("A new comercio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Comercio comercio = comercioMapper.toEntity(comercioDTO);
        comercio.setFechaCreacion(LocalDate.now());
        comercio = comercioRepository.save(comercio);
        ComercioDTO result = comercioMapper.toDto(comercio);
        comercioSearchRepository.save(comercio);
        return ResponseEntity.created(new URI("/api/comercios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /comercios : Updates an existing comercio.
     *
     * @param comercioDTO the comercioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated comercioDTO,
     * or with status 400 (Bad Request) if the comercioDTO is not valid,
     * or with status 500 (Internal Server Error) if the comercioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/comercios")
    @Timed
    public ResponseEntity<ComercioDTO> updateComercio(@Valid @RequestBody ComercioDTO comercioDTO) throws URISyntaxException {
        log.debug("REST request to update Comercio : {}", comercioDTO);
        if (comercioDTO.getId() == null) {
            return createComercio(comercioDTO);
        }
        Comercio comercio = comercioMapper.toEntity(comercioDTO);
        comercio.setFechaCreacion(comercioRepository.findOne(comercio.getId()).getFechaCreacion());
        comercio = comercioRepository.save(comercio);
        ComercioDTO result = comercioMapper.toDto(comercio);
        comercioSearchRepository.save(comercio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, comercioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /comercios : get all the comercios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of comercios in body
     */
    @GetMapping("/comercios")
    @Timed
    public List<ComercioDTO> getAllComercios() {
        log.debug("REST request to get all Comercios");
        List<Comercio> comercios = comercioRepository.findAllWithEagerRelationships();
        return comercioMapper.toDto(comercios);
    }

    /**
     * GET  /comercios/:id : get the "id" comercio.
     *
     * @param id the id of the comercioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the comercioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/comercios/{id}")
    @Timed
    public ResponseEntity<ComercioDTO> getComercio(@PathVariable Long id) {
        log.debug("REST request to get Comercio : {}", id);
        Comercio comercio = comercioRepository.findOneWithEagerRelationships(id);
        ComercioDTO comercioDTO = comercioMapper.toDto(comercio);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(comercioDTO));
    }

    /**
     * DELETE  /comercios/:id : delete the "id" comercio.
     *
     * @param id the id of the comercioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/comercios/{id}")
    @Timed
    public ResponseEntity<Void> deleteComercio(@PathVariable Long id) {
        log.debug("REST request to delete Comercio : {}", id);
        comercioRepository.delete(id);
        comercioSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/comercios?query=:query : search for the comercio corresponding
     * to the query.
     *
     * @param query the query of the comercio search
     * @return the result of the search
     */
    @GetMapping("/_search/comercios")
    @Timed
    public List<ComercioDTO> searchComercios(@RequestParam String query) {
        log.debug("REST request to search Comercios for query {}", query);
        return StreamSupport
            .stream(comercioSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(comercioMapper::toDto)
            .collect(Collectors.toList());
    }

    @GetMapping("/comercios/usuario/{id}")
    @Timed
    @Transactional
    public ResponseEntity<List<ComercioDTO>> getComercioByUsuario(@PathVariable Long id) {
        log.debug("REST request to get Comercio : {}", id);
        List<Comercio> comercios = comercioRepository.findAllByDueno_id(id);
        List<ComercioDTO> comerciosDTO = comercioMapper.toDto(comercios);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(comerciosDTO));
    }

    @GetMapping("/comercios/tipo/{tipo}")
    @Timed
    @Transactional
    public ResponseEntity<List<ComercioDTO>> getComercioByTipo(@PathVariable TipoComercio tipo) {
        log.debug("REST request to get Comercios with type : {}", tipo);
        List<Comercio> comercios = comercioRepository.findAllByTipo(tipo);
        List<ComercioDTO> comerciosDTO = comercioMapper.toDto(comercios);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(comerciosDTO));
    }

    @GetMapping("/comercios/nombre/{nombre}")
    @Timed
    public ResponseEntity<List<ComercioDTO>> getComercioByNombre(@PathVariable String nombre) {
        log.debug("REST request to get Comercio : {}", nombre);
        List<Comercio> comercio = comercioRepository.findByNombreComercial(nombre);
        List<ComercioDTO> comercioDTO = comercioMapper.toDto(comercio);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(comercioDTO));
    }
}
