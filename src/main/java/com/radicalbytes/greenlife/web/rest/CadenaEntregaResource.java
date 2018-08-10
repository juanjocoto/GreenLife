package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.CadenaEntrega;
import com.radicalbytes.greenlife.domain.Entrega;
import com.radicalbytes.greenlife.repository.CadenaEntregaRepository;
import com.radicalbytes.greenlife.repository.EntregaRepository;
import com.radicalbytes.greenlife.repository.search.CadenaEntregaSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.MailService;
import com.radicalbytes.greenlife.service.dto.CadenaEntregaDTO;
import com.radicalbytes.greenlife.service.mapper.CadenaEntregaMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
 * REST controller for managing CadenaEntrega.
 */
@RestController
@RequestMapping("/api")
public class CadenaEntregaResource {

    @Autowired
    private MailService mailService;

    @Autowired
    private EntregaRepository entregaRepository;

    private final Logger log = LoggerFactory.getLogger(CadenaEntregaResource.class);

    private static final String ENTITY_NAME = "cadenaEntrega";

    private final CadenaEntregaRepository cadenaEntregaRepository;

    private final CadenaEntregaMapper cadenaEntregaMapper;

    private final CadenaEntregaSearchRepository cadenaEntregaSearchRepository;

    public CadenaEntregaResource(CadenaEntregaRepository cadenaEntregaRepository,
            CadenaEntregaMapper cadenaEntregaMapper, CadenaEntregaSearchRepository cadenaEntregaSearchRepository) {
        this.cadenaEntregaRepository = cadenaEntregaRepository;
        this.cadenaEntregaMapper = cadenaEntregaMapper;
        this.cadenaEntregaSearchRepository = cadenaEntregaSearchRepository;
    }

    /**
     * POST /cadena-entregas : Create a new cadenaEntrega.
     *
     * @param cadenaEntregaDTO the cadenaEntregaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new
     *         cadenaEntregaDTO, or with status 400 (Bad Request) if the
     *         cadenaEntrega has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cadena-entregas")
    @Timed
    public ResponseEntity<CadenaEntregaDTO> createCadenaEntrega(@Valid @RequestBody CadenaEntregaDTO cadenaEntregaDTO)
            throws URISyntaxException {
        log.debug("REST request to save CadenaEntrega : {}", cadenaEntregaDTO);
        if (cadenaEntregaDTO.getId() != null) {
            throw new BadRequestAlertException("A new cadenaEntrega cannot already have an ID", ENTITY_NAME,
                    "idexists");
        }
        CadenaEntrega cadenaEntrega = cadenaEntregaMapper.toEntity(cadenaEntregaDTO);
        cadenaEntrega = cadenaEntregaRepository.save(cadenaEntrega);
        CadenaEntregaDTO result = cadenaEntregaMapper.toDto(cadenaEntrega);
        cadenaEntregaSearchRepository.save(cadenaEntrega);
        return ResponseEntity.created(new URI("/api/cadena-entregas/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT /cadena-entregas : Updates an existing cadenaEntrega.
     *
     * @param cadenaEntregaDTO the cadenaEntregaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     *         cadenaEntregaDTO, or with status 400 (Bad Request) if the
     *         cadenaEntregaDTO is not valid, or with status 500 (Internal Server
     *         Error) if the cadenaEntregaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cadena-entregas")
    @Timed
    public ResponseEntity<CadenaEntregaDTO> updateCadenaEntrega(@Valid @RequestBody CadenaEntregaDTO cadenaEntregaDTO)
            throws URISyntaxException {
        log.debug("REST request to update CadenaEntrega : {}", cadenaEntregaDTO);
        if (cadenaEntregaDTO.getId() == null) {
            return createCadenaEntrega(cadenaEntregaDTO);
        }
        CadenaEntrega cadenaEntrega = cadenaEntregaMapper.toEntity(cadenaEntregaDTO);
        cadenaEntrega = cadenaEntregaRepository.save(cadenaEntrega);
        CadenaEntregaDTO result = cadenaEntregaMapper.toDto(cadenaEntrega);
        cadenaEntregaSearchRepository.save(cadenaEntrega);

        Entrega entrega = entregaRepository.findByCadena_id(cadenaEntrega.getId());

        String reciver = entrega.getSuscripcion().getUsuario().getUserDetail().getEmail();

        mailService.sendEmail(reciver, "Creacion del pedido", "", false, true);

        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cadenaEntregaDTO.getId().toString()))
                .body(result);
    }

    /**
     * GET /cadena-entregas : get all the cadenaEntregas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of
     *         cadenaEntregas in body
     */
    @GetMapping("/cadena-entregas")
    @Timed
    public List<CadenaEntregaDTO> getAllCadenaEntregas() {
        log.debug("REST request to get all CadenaEntregas");
        List<CadenaEntrega> cadenaEntregas = cadenaEntregaRepository.findAll();
        return cadenaEntregaMapper.toDto(cadenaEntregas);
    }

    /**
     * GET /cadena-entregas/:id : get the "id" cadenaEntrega.
     *
     * @param id the id of the cadenaEntregaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the
     *         cadenaEntregaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cadena-entregas/{id}")
    @Timed
    public ResponseEntity<CadenaEntregaDTO> getCadenaEntrega(@PathVariable Long id) {
        log.debug("REST request to get CadenaEntrega : {}", id);
        CadenaEntrega cadenaEntrega = cadenaEntregaRepository.findOne(id);
        CadenaEntregaDTO cadenaEntregaDTO = cadenaEntregaMapper.toDto(cadenaEntrega);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cadenaEntregaDTO));
    }

    /**
     * DELETE /cadena-entregas/:id : delete the "id" cadenaEntrega.
     *
     * @param id the id of the cadenaEntregaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cadena-entregas/{id}")
    @Timed
    public ResponseEntity<Void> deleteCadenaEntrega(@PathVariable Long id) {
        log.debug("REST request to delete CadenaEntrega : {}", id);
        cadenaEntregaRepository.delete(id);
        cadenaEntregaSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH /_search/cadena-entregas?query=:query : search for the cadenaEntrega
     * corresponding to the query.
     *
     * @param query the query of the cadenaEntrega search
     * @return the result of the search
     */
    @GetMapping("/_search/cadena-entregas")
    @Timed
    public List<CadenaEntregaDTO> searchCadenaEntregas(@RequestParam String query) {
        log.debug("REST request to search CadenaEntregas for query {}", query);
        return StreamSupport.stream(cadenaEntregaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
                .map(cadenaEntregaMapper::toDto).collect(Collectors.toList());
    }

}
