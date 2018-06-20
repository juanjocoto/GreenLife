package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Configuracion;

import com.radicalbytes.greenlife.repository.ConfiguracionRepository;
import com.radicalbytes.greenlife.repository.search.ConfiguracionSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.ConfiguracionDTO;
import com.radicalbytes.greenlife.service.mapper.ConfiguracionMapper;
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
 * REST controller for managing Configuracion.
 */
@RestController
@RequestMapping("/api")
public class ConfiguracionResource {

    private final Logger log = LoggerFactory.getLogger(ConfiguracionResource.class);

    private static final String ENTITY_NAME = "configuracion";

    private final ConfiguracionRepository configuracionRepository;

    private final ConfiguracionMapper configuracionMapper;

    private final ConfiguracionSearchRepository configuracionSearchRepository;

    public ConfiguracionResource(ConfiguracionRepository configuracionRepository, ConfiguracionMapper configuracionMapper, ConfiguracionSearchRepository configuracionSearchRepository) {
        this.configuracionRepository = configuracionRepository;
        this.configuracionMapper = configuracionMapper;
        this.configuracionSearchRepository = configuracionSearchRepository;
    }

    /**
     * POST  /configuracions : Create a new configuracion.
     *
     * @param configuracionDTO the configuracionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new configuracionDTO, or with status 400 (Bad Request) if the configuracion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/configuracions")
    @Timed
    public ResponseEntity<ConfiguracionDTO> createConfiguracion(@Valid @RequestBody ConfiguracionDTO configuracionDTO) throws URISyntaxException {
        log.debug("REST request to save Configuracion : {}", configuracionDTO);
        if (configuracionDTO.getId() != null) {
            throw new BadRequestAlertException("A new configuracion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Configuracion configuracion = configuracionMapper.toEntity(configuracionDTO);
        configuracion = configuracionRepository.save(configuracion);
        ConfiguracionDTO result = configuracionMapper.toDto(configuracion);
        configuracionSearchRepository.save(configuracion);
        return ResponseEntity.created(new URI("/api/configuracions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /configuracions : Updates an existing configuracion.
     *
     * @param configuracionDTO the configuracionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated configuracionDTO,
     * or with status 400 (Bad Request) if the configuracionDTO is not valid,
     * or with status 500 (Internal Server Error) if the configuracionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/configuracions")
    @Timed
    public ResponseEntity<ConfiguracionDTO> updateConfiguracion(@Valid @RequestBody ConfiguracionDTO configuracionDTO) throws URISyntaxException {
        log.debug("REST request to update Configuracion : {}", configuracionDTO);
        if (configuracionDTO.getId() == null) {
            return createConfiguracion(configuracionDTO);
        }
        Configuracion configuracion = configuracionMapper.toEntity(configuracionDTO);
        configuracion = configuracionRepository.save(configuracion);
        ConfiguracionDTO result = configuracionMapper.toDto(configuracion);
        configuracionSearchRepository.save(configuracion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, configuracionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /configuracions : get all the configuracions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of configuracions in body
     */
    @GetMapping("/configuracions")
    @Timed
    public List<ConfiguracionDTO> getAllConfiguracions() {
        log.debug("REST request to get all Configuracions");
        List<Configuracion> configuracions = configuracionRepository.findAll();
        return configuracionMapper.toDto(configuracions);
        }

    /**
     * GET  /configuracions/:id : get the "id" configuracion.
     *
     * @param id the id of the configuracionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the configuracionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/configuracions/{id}")
    @Timed
    public ResponseEntity<ConfiguracionDTO> getConfiguracion(@PathVariable Long id) {
        log.debug("REST request to get Configuracion : {}", id);
        Configuracion configuracion = configuracionRepository.findOne(id);
        ConfiguracionDTO configuracionDTO = configuracionMapper.toDto(configuracion);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(configuracionDTO));
    }

    /**
     * DELETE  /configuracions/:id : delete the "id" configuracion.
     *
     * @param id the id of the configuracionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/configuracions/{id}")
    @Timed
    public ResponseEntity<Void> deleteConfiguracion(@PathVariable Long id) {
        log.debug("REST request to delete Configuracion : {}", id);
        configuracionRepository.delete(id);
        configuracionSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/configuracions?query=:query : search for the configuracion corresponding
     * to the query.
     *
     * @param query the query of the configuracion search
     * @return the result of the search
     */
    @GetMapping("/_search/configuracions")
    @Timed
    public List<ConfiguracionDTO> searchConfiguracions(@RequestParam String query) {
        log.debug("REST request to search Configuracions for query {}", query);
        return StreamSupport
            .stream(configuracionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(configuracionMapper::toDto)
            .collect(Collectors.toList());
    }

}
