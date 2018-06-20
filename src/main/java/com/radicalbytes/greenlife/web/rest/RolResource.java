package com.radicalbytes.greenlife.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.Rol;

import com.radicalbytes.greenlife.repository.RolRepository;
import com.radicalbytes.greenlife.repository.search.RolSearchRepository;
import com.radicalbytes.greenlife.web.rest.errors.BadRequestAlertException;
import com.radicalbytes.greenlife.web.rest.util.HeaderUtil;
import com.radicalbytes.greenlife.service.dto.RolDTO;
import com.radicalbytes.greenlife.service.mapper.RolMapper;
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
 * REST controller for managing Rol.
 */
@RestController
@RequestMapping("/api")
public class RolResource {

    private final Logger log = LoggerFactory.getLogger(RolResource.class);

    private static final String ENTITY_NAME = "rol";

    private final RolRepository rolRepository;

    private final RolMapper rolMapper;

    private final RolSearchRepository rolSearchRepository;

    public RolResource(RolRepository rolRepository, RolMapper rolMapper, RolSearchRepository rolSearchRepository) {
        this.rolRepository = rolRepository;
        this.rolMapper = rolMapper;
        this.rolSearchRepository = rolSearchRepository;
    }

    /**
     * POST  /rols : Create a new rol.
     *
     * @param rolDTO the rolDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rolDTO, or with status 400 (Bad Request) if the rol has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rols")
    @Timed
    public ResponseEntity<RolDTO> createRol(@Valid @RequestBody RolDTO rolDTO) throws URISyntaxException {
        log.debug("REST request to save Rol : {}", rolDTO);
        if (rolDTO.getId() != null) {
            throw new BadRequestAlertException("A new rol cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Rol rol = rolMapper.toEntity(rolDTO);
        rol = rolRepository.save(rol);
        RolDTO result = rolMapper.toDto(rol);
        rolSearchRepository.save(rol);
        return ResponseEntity.created(new URI("/api/rols/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rols : Updates an existing rol.
     *
     * @param rolDTO the rolDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rolDTO,
     * or with status 400 (Bad Request) if the rolDTO is not valid,
     * or with status 500 (Internal Server Error) if the rolDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rols")
    @Timed
    public ResponseEntity<RolDTO> updateRol(@Valid @RequestBody RolDTO rolDTO) throws URISyntaxException {
        log.debug("REST request to update Rol : {}", rolDTO);
        if (rolDTO.getId() == null) {
            return createRol(rolDTO);
        }
        Rol rol = rolMapper.toEntity(rolDTO);
        rol = rolRepository.save(rol);
        RolDTO result = rolMapper.toDto(rol);
        rolSearchRepository.save(rol);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rolDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rols : get all the rols.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rols in body
     */
    @GetMapping("/rols")
    @Timed
    public List<RolDTO> getAllRols() {
        log.debug("REST request to get all Rols");
        List<Rol> rols = rolRepository.findAllWithEagerRelationships();
        return rolMapper.toDto(rols);
        }

    /**
     * GET  /rols/:id : get the "id" rol.
     *
     * @param id the id of the rolDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rolDTO, or with status 404 (Not Found)
     */
    @GetMapping("/rols/{id}")
    @Timed
    public ResponseEntity<RolDTO> getRol(@PathVariable Long id) {
        log.debug("REST request to get Rol : {}", id);
        Rol rol = rolRepository.findOneWithEagerRelationships(id);
        RolDTO rolDTO = rolMapper.toDto(rol);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rolDTO));
    }

    /**
     * DELETE  /rols/:id : delete the "id" rol.
     *
     * @param id the id of the rolDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rols/{id}")
    @Timed
    public ResponseEntity<Void> deleteRol(@PathVariable Long id) {
        log.debug("REST request to delete Rol : {}", id);
        rolRepository.delete(id);
        rolSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/rols?query=:query : search for the rol corresponding
     * to the query.
     *
     * @param query the query of the rol search
     * @return the result of the search
     */
    @GetMapping("/_search/rols")
    @Timed
    public List<RolDTO> searchRols(@RequestParam String query) {
        log.debug("REST request to search Rols for query {}", query);
        return StreamSupport
            .stream(rolSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(rolMapper::toDto)
            .collect(Collectors.toList());
    }

}
