package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Pago;

import com.radicalbytes.greenlife.repository.PagoRepository;
import com.radicalbytes.greenlife.repository.search.PagoSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.PagoDTO;
import com.radicalbytes.greenlife.service.mapper.PagoMapper;
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
 * REST controller for managing Pago.
 */
@RestController
@RequestMapping("/api")
public class PagoResource {

    private final Logger log = LoggerFactory.getLogger(PagoResource.class);

    private static final String ENTITY_NAME = "pago";

    private final PagoRepository pagoRepository;

    private final PagoMapper pagoMapper;

    private final PagoSearchRepository pagoSearchRepository;

    public PagoResource(PagoRepository pagoRepository, PagoMapper pagoMapper, PagoSearchRepository pagoSearchRepository) {
        this.pagoRepository = pagoRepository;
        this.pagoMapper = pagoMapper;
        this.pagoSearchRepository = pagoSearchRepository;
    }

    /**
     * POST  /pagos : Create a new pago.
     *
     * @param pagoDTO the pagoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pagoDTO, or with status 400 (Bad Request) if the pago has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pagos")
    @Timed
    public ResponseEntity<PagoDTO> createPago(@Valid @RequestBody PagoDTO pagoDTO) throws URISyntaxException {
        log.debug("REST request to save Pago : {}", pagoDTO);
        if (pagoDTO.getId() != null) {
            throw new BadRequestAlertException("A new pago cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pago pago = pagoMapper.toEntity(pagoDTO);
        pago = pagoRepository.save(pago);
        PagoDTO result = pagoMapper.toDto(pago);
        pagoSearchRepository.save(pago);
        return ResponseEntity.created(new URI("/api/pagos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pagos : Updates an existing pago.
     *
     * @param pagoDTO the pagoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pagoDTO,
     * or with status 400 (Bad Request) if the pagoDTO is not valid,
     * or with status 500 (Internal Server Error) if the pagoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pagos")
    @Timed
    public ResponseEntity<PagoDTO> updatePago(@Valid @RequestBody PagoDTO pagoDTO) throws URISyntaxException {
        log.debug("REST request to update Pago : {}", pagoDTO);
        if (pagoDTO.getId() == null) {
            return createPago(pagoDTO);
        }
        Pago pago = pagoMapper.toEntity(pagoDTO);
        pago = pagoRepository.save(pago);
        PagoDTO result = pagoMapper.toDto(pago);
        pagoSearchRepository.save(pago);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pagoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pagos : get all the pagos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pagos in body
     */
    @GetMapping("/pagos")
    @Timed
    public List<PagoDTO> getAllPagos() {
        log.debug("REST request to get all Pagos");
        List<Pago> pagos = pagoRepository.findAll();
        return pagoMapper.toDto(pagos);
        }

    /**
     * GET  /pagos/:id : get the "id" pago.
     *
     * @param id the id of the pagoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pagoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/pagos/{id}")
    @Timed
    public ResponseEntity<PagoDTO> getPago(@PathVariable Long id) {
        log.debug("REST request to get Pago : {}", id);
        Pago pago = pagoRepository.findOne(id);
        PagoDTO pagoDTO = pagoMapper.toDto(pago);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pagoDTO));
    }

    /**
     * DELETE  /pagos/:id : delete the "id" pago.
     *
     * @param id the id of the pagoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pagos/{id}")
    @Timed
    public ResponseEntity<Void> deletePago(@PathVariable Long id) {
        log.debug("REST request to delete Pago : {}", id);
        pagoRepository.delete(id);
        pagoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/pagos?query=:query : search for the pago corresponding
     * to the query.
     *
     * @param query the query of the pago search
     * @return the result of the search
     */
    @GetMapping("/_search/pagos")
    @Timed
    public List<PagoDTO> searchPagos(@RequestParam String query) {
        log.debug("REST request to search Pagos for query {}", query);
        return StreamSupport
            .stream(pagoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(pagoMapper::toDto)
            .collect(Collectors.toList());
    }

}
