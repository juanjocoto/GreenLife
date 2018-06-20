package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.LineaEntrega;

import com.radicalbytes.greenlife.repository.LineaEntregaRepository;
import com.radicalbytes.greenlife.repository.search.LineaEntregaSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.LineaEntregaDTO;
import com.radicalbytes.greenlife.service.mapper.LineaEntregaMapper;
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
 * REST controller for managing LineaEntrega.
 */
@RestController
@RequestMapping("/api")
public class LineaEntregaResource {

    private final Logger log = LoggerFactory.getLogger(LineaEntregaResource.class);

    private static final String ENTITY_NAME = "lineaEntrega";

    private final LineaEntregaRepository lineaEntregaRepository;

    private final LineaEntregaMapper lineaEntregaMapper;

    private final LineaEntregaSearchRepository lineaEntregaSearchRepository;

    public LineaEntregaResource(LineaEntregaRepository lineaEntregaRepository, LineaEntregaMapper lineaEntregaMapper, LineaEntregaSearchRepository lineaEntregaSearchRepository) {
        this.lineaEntregaRepository = lineaEntregaRepository;
        this.lineaEntregaMapper = lineaEntregaMapper;
        this.lineaEntregaSearchRepository = lineaEntregaSearchRepository;
    }

    /**
     * POST  /linea-entregas : Create a new lineaEntrega.
     *
     * @param lineaEntregaDTO the lineaEntregaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lineaEntregaDTO, or with status 400 (Bad Request) if the lineaEntrega has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/linea-entregas")
    @Timed
    public ResponseEntity<LineaEntregaDTO> createLineaEntrega(@Valid @RequestBody LineaEntregaDTO lineaEntregaDTO) throws URISyntaxException {
        log.debug("REST request to save LineaEntrega : {}", lineaEntregaDTO);
        if (lineaEntregaDTO.getId() != null) {
            throw new BadRequestAlertException("A new lineaEntrega cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LineaEntrega lineaEntrega = lineaEntregaMapper.toEntity(lineaEntregaDTO);
        lineaEntrega = lineaEntregaRepository.save(lineaEntrega);
        LineaEntregaDTO result = lineaEntregaMapper.toDto(lineaEntrega);
        lineaEntregaSearchRepository.save(lineaEntrega);
        return ResponseEntity.created(new URI("/api/linea-entregas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /linea-entregas : Updates an existing lineaEntrega.
     *
     * @param lineaEntregaDTO the lineaEntregaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lineaEntregaDTO,
     * or with status 400 (Bad Request) if the lineaEntregaDTO is not valid,
     * or with status 500 (Internal Server Error) if the lineaEntregaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/linea-entregas")
    @Timed
    public ResponseEntity<LineaEntregaDTO> updateLineaEntrega(@Valid @RequestBody LineaEntregaDTO lineaEntregaDTO) throws URISyntaxException {
        log.debug("REST request to update LineaEntrega : {}", lineaEntregaDTO);
        if (lineaEntregaDTO.getId() == null) {
            return createLineaEntrega(lineaEntregaDTO);
        }
        LineaEntrega lineaEntrega = lineaEntregaMapper.toEntity(lineaEntregaDTO);
        lineaEntrega = lineaEntregaRepository.save(lineaEntrega);
        LineaEntregaDTO result = lineaEntregaMapper.toDto(lineaEntrega);
        lineaEntregaSearchRepository.save(lineaEntrega);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lineaEntregaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /linea-entregas : get all the lineaEntregas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of lineaEntregas in body
     */
    @GetMapping("/linea-entregas")
    @Timed
    public List<LineaEntregaDTO> getAllLineaEntregas() {
        log.debug("REST request to get all LineaEntregas");
        List<LineaEntrega> lineaEntregas = lineaEntregaRepository.findAll();
        return lineaEntregaMapper.toDto(lineaEntregas);
        }

    /**
     * GET  /linea-entregas/:id : get the "id" lineaEntrega.
     *
     * @param id the id of the lineaEntregaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lineaEntregaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/linea-entregas/{id}")
    @Timed
    public ResponseEntity<LineaEntregaDTO> getLineaEntrega(@PathVariable Long id) {
        log.debug("REST request to get LineaEntrega : {}", id);
        LineaEntrega lineaEntrega = lineaEntregaRepository.findOne(id);
        LineaEntregaDTO lineaEntregaDTO = lineaEntregaMapper.toDto(lineaEntrega);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(lineaEntregaDTO));
    }

    /**
     * DELETE  /linea-entregas/:id : delete the "id" lineaEntrega.
     *
     * @param id the id of the lineaEntregaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/linea-entregas/{id}")
    @Timed
    public ResponseEntity<Void> deleteLineaEntrega(@PathVariable Long id) {
        log.debug("REST request to delete LineaEntrega : {}", id);
        lineaEntregaRepository.delete(id);
        lineaEntregaSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/linea-entregas?query=:query : search for the lineaEntrega corresponding
     * to the query.
     *
     * @param query the query of the lineaEntrega search
     * @return the result of the search
     */
    @GetMapping("/_search/linea-entregas")
    @Timed
    public List<LineaEntregaDTO> searchLineaEntregas(@RequestParam String query) {
        log.debug("REST request to search LineaEntregas for query {}", query);
        return StreamSupport
            .stream(lineaEntregaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(lineaEntregaMapper::toDto)
            .collect(Collectors.toList());
    }

}
