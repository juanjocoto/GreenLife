package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.ResenaCliente;

import com.radicalbytes.greenlife.repository.ResenaClienteRepository;
import com.radicalbytes.greenlife.repository.search.ResenaClienteSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.ResenaClienteDTO;
import com.radicalbytes.greenlife.service.mapper.ResenaClienteMapper;
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
 * REST controller for managing ResenaCliente.
 */
@RestController
@RequestMapping("/api")
public class ResenaClienteResource {

    private final Logger log = LoggerFactory.getLogger(ResenaClienteResource.class);

    private static final String ENTITY_NAME = "resenaCliente";

    private final ResenaClienteRepository resenaClienteRepository;

    private final ResenaClienteMapper resenaClienteMapper;

    private final ResenaClienteSearchRepository resenaClienteSearchRepository;

    public ResenaClienteResource(ResenaClienteRepository resenaClienteRepository, ResenaClienteMapper resenaClienteMapper, ResenaClienteSearchRepository resenaClienteSearchRepository) {
        this.resenaClienteRepository = resenaClienteRepository;
        this.resenaClienteMapper = resenaClienteMapper;
        this.resenaClienteSearchRepository = resenaClienteSearchRepository;
    }

    /**
     * POST  /resena-clientes : Create a new resenaCliente.
     *
     * @param resenaClienteDTO the resenaClienteDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resenaClienteDTO, or with status 400 (Bad Request) if the resenaCliente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/resena-clientes")
    @Timed
    public ResponseEntity<ResenaClienteDTO> createResenaCliente(@Valid @RequestBody ResenaClienteDTO resenaClienteDTO) throws URISyntaxException {
        log.debug("REST request to save ResenaCliente : {}", resenaClienteDTO);
        if (resenaClienteDTO.getId() != null) {
            throw new BadRequestAlertException("A new resenaCliente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ResenaCliente resenaCliente = resenaClienteMapper.toEntity(resenaClienteDTO);
        resenaCliente = resenaClienteRepository.save(resenaCliente);
        ResenaClienteDTO result = resenaClienteMapper.toDto(resenaCliente);
        resenaClienteSearchRepository.save(resenaCliente);
        return ResponseEntity.created(new URI("/api/resena-clientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /resena-clientes : Updates an existing resenaCliente.
     *
     * @param resenaClienteDTO the resenaClienteDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resenaClienteDTO,
     * or with status 400 (Bad Request) if the resenaClienteDTO is not valid,
     * or with status 500 (Internal Server Error) if the resenaClienteDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/resena-clientes")
    @Timed
    public ResponseEntity<ResenaClienteDTO> updateResenaCliente(@Valid @RequestBody ResenaClienteDTO resenaClienteDTO) throws URISyntaxException {
        log.debug("REST request to update ResenaCliente : {}", resenaClienteDTO);
        if (resenaClienteDTO.getId() == null) {
            return createResenaCliente(resenaClienteDTO);
        }
        ResenaCliente resenaCliente = resenaClienteMapper.toEntity(resenaClienteDTO);
        resenaCliente = resenaClienteRepository.save(resenaCliente);
        ResenaClienteDTO result = resenaClienteMapper.toDto(resenaCliente);
        resenaClienteSearchRepository.save(resenaCliente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resenaClienteDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /resena-clientes : get all the resenaClientes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of resenaClientes in body
     */
    @GetMapping("/resena-clientes")
    @Timed
    public List<ResenaClienteDTO> getAllResenaClientes() {
        log.debug("REST request to get all ResenaClientes");
        List<ResenaCliente> resenaClientes = resenaClienteRepository.findAll();
        return resenaClienteMapper.toDto(resenaClientes);
        }

    /**
     * GET  /resena-clientes/:id : get the "id" resenaCliente.
     *
     * @param id the id of the resenaClienteDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resenaClienteDTO, or with status 404 (Not Found)
     */
    @GetMapping("/resena-clientes/{id}")
    @Timed
    public ResponseEntity<ResenaClienteDTO> getResenaCliente(@PathVariable Long id) {
        log.debug("REST request to get ResenaCliente : {}", id);
        ResenaCliente resenaCliente = resenaClienteRepository.findOne(id);
        ResenaClienteDTO resenaClienteDTO = resenaClienteMapper.toDto(resenaCliente);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resenaClienteDTO));
    }

    @GetMapping("/resena-clientes/usuario/{id}")
    @Timed
    public ResponseEntity<List<ResenaClienteDTO>> getResenaClienteByUsuario(@PathVariable Long id) {
        log.debug("Rest request to get Resena Cliente : {} ", id);
        List<ResenaCliente> resenasCliente = resenaClienteRepository.findAllByCliente_Id(id);
        List<ResenaClienteDTO> resenasClienteDTO = resenaClienteMapper.toDto(resenasCliente);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resenasClienteDTO));
    }

    /**
     * DELETE  /resena-clientes/:id : delete the "id" resenaCliente.
     *
     * @param id the id of the resenaClienteDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/resena-clientes/{id}")
    @Timed
    public ResponseEntity<Void> deleteResenaCliente(@PathVariable Long id) {
        log.debug("REST request to delete ResenaCliente : {}", id);
        resenaClienteRepository.delete(id);
        resenaClienteSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/resena-clientes?query=:query : search for the resenaCliente corresponding
     * to the query.
     *
     * @param query the query of the resenaCliente search
     * @return the result of the search
     */
    @GetMapping("/_search/resena-clientes")
    @Timed
    public List<ResenaClienteDTO> searchResenaClientes(@RequestParam String query) {
        log.debug("REST request to search ResenaClientes for query {}", query);
        return StreamSupport
            .stream(resenaClienteSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(resenaClienteMapper::toDto)
            .collect(Collectors.toList());
    }

}
