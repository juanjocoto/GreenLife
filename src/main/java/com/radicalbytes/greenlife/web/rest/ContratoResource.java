package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Contrato;

import com.radicalbytes.greenlife.repository.ContratoRepository;
import com.radicalbytes.greenlife.repository.search.ContratoSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.ContratoDTO;
import com.radicalbytes.greenlife.service.mapper.ContratoMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Contrato.
 */
@RestController
@RequestMapping("/api")
public class ContratoResource {

    private final Logger log = LoggerFactory.getLogger(ContratoResource.class);

    private static final String ENTITY_NAME = "contrato";

    private final ContratoRepository contratoRepository;

    private final ContratoMapper contratoMapper;

    private final ContratoSearchRepository contratoSearchRepository;

    public ContratoResource(ContratoRepository contratoRepository, ContratoMapper contratoMapper, ContratoSearchRepository contratoSearchRepository) {
        this.contratoRepository = contratoRepository;
        this.contratoMapper = contratoMapper;
        this.contratoSearchRepository = contratoSearchRepository;
    }

    /**
     * POST  /contratoes : Create a new contrato.
     *
     * @param contratoDTO the contratoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contratoDTO, or with status 400 (Bad Request) if the contrato has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contratoes")
    @Timed
    public ResponseEntity<ContratoDTO> createContrato(@Valid @RequestBody ContratoDTO contratoDTO) throws URISyntaxException {
        log.debug("REST request to save Contrato : {}", contratoDTO);
        if (contratoDTO.getId() != null) {
            throw new BadRequestAlertException("A new contrato cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Contrato contrato = contratoMapper.toEntity(contratoDTO);
        contrato = contratoRepository.save(contrato);
        ContratoDTO result = contratoMapper.toDto(contrato);
        contratoSearchRepository.save(contrato);
        return ResponseEntity.created(new URI("/api/contratoes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contratoes : Updates an existing contrato.
     *
     * @param contratoDTO the contratoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contratoDTO,
     * or with status 400 (Bad Request) if the contratoDTO is not valid,
     * or with status 500 (Internal Server Error) if the contratoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contratoes")
    @Timed
    public ResponseEntity<ContratoDTO> updateContrato(@Valid @RequestBody ContratoDTO contratoDTO) throws URISyntaxException {
        log.debug("REST request to update Contrato : {}", contratoDTO);
        if (contratoDTO.getId() == null) {
            return createContrato(contratoDTO);
        }
        Contrato contrato = contratoMapper.toEntity(contratoDTO);
        contrato = contratoRepository.save(contrato);
        ContratoDTO result = contratoMapper.toDto(contrato);
        contratoSearchRepository.save(contrato);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contratoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contratoes : get all the contratoes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contratoes in body
     */
    @GetMapping("/contratoes")
    @Timed
    public List<ContratoDTO> getAllContratoes() {
        log.debug("REST request to get all Contratoes");
        List<Contrato> contratoes = contratoRepository.findAll();
        return contratoMapper.toDto(contratoes);
        }

    /**
     * GET  /contratoes/:id : get the "id" contrato.
     *
     * @param id the id of the contratoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contratoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/contratoes/{id}")
    @Timed
    public ResponseEntity<ContratoDTO> getContrato(@PathVariable Long id) {
        log.debug("REST request to get Contrato : {}", id);
        Contrato contrato = contratoRepository.findOne(id);
        ContratoDTO contratoDTO = contratoMapper.toDto(contrato);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(contratoDTO));
    }

/*    @GetMapping("/contratoes/{id}")
    @Timed
    public List<ContratoDTO> getContratosByComercio(@PathVariable Long id) {
        Contrato contrato = contratoRepository.findOne(id);
        ContratoDTO contratoDTO = contratoMapper.toDto(contrato);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(contratoDTO));
    }*/

    @GetMapping("/contratoes/comercio/{id}")
    @Timed
    @Transactional
    public ResponseEntity<List<ContratoDTO>> getContratosByComercio(@PathVariable Long id) {
        List<Contrato> contratos = contratoRepository.findAllByComercio_id(id);
        List<ContratoDTO> contratosDTO = contratoMapper.toDto(contratos);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(contratosDTO));
    }

    @GetMapping("/contratoes/tipo/{id}")
    @Timed
    @Transactional
    public ResponseEntity<List<ContratoDTO>> getContratoByTipo(@PathVariable Long id) {
        List<Contrato> contratos = contratoRepository.findByTipo_id(id);
        List<ContratoDTO> contratosDTO = contratoMapper.toDto(contratos);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(contratosDTO));
    }

    /**
     * DELETE  /contratoes/:id : delete the "id" contrato.
     *
     * @param id the id of the contratoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contratoes/{id}")
    @Timed
    public ResponseEntity<Void> deleteContrato(@PathVariable Long id) {
        log.debug("REST request to delete Contrato : {}", id);
        contratoRepository.delete(id);
        contratoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @DeleteMapping("/contratoes/delete/comercio/{id}")
    @Timed
    @Transactional
    public ResponseEntity<Void> deleteContratoByComercio(@PathVariable Long id) {
        contratoRepository.deleteContratoByComercio_id(id);
        contratoSearchRepository.deleteContratoByComercio_id(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/contratoes?query=:query : search for the contrato corresponding
     * to the query.
     *
     * @param query the query of the contrato search
     * @return the result of the search
     */
    @GetMapping("/_search/contratoes")
    @Timed
    public List<ContratoDTO> searchContratoes(@RequestParam String query) {
        log.debug("REST request to search Contratoes for query {}", query);
        return StreamSupport
            .stream(contratoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(contratoMapper::toDto)
            .collect(Collectors.toList());
    }

}
