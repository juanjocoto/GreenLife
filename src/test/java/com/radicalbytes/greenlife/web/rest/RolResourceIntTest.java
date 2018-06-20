package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.Rol;
import com.radicalbytes.greenlife.repository.RolRepository;
import com.radicalbytes.greenlife.repository.search.RolSearchRepository;
import com.radicalbytes.greenlife.service.dto.RolDTO;
import com.radicalbytes.greenlife.service.mapper.RolMapper;
import com.radicalbytes.greenlife.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.radicalbytes.greenlife.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RolResource REST controller.
 *
 * @see RolResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class RolResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private RolMapper rolMapper;

    @Autowired
    private RolSearchRepository rolSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRolMockMvc;

    private Rol rol;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RolResource rolResource = new RolResource(rolRepository, rolMapper, rolSearchRepository);
        this.restRolMockMvc = MockMvcBuilders.standaloneSetup(rolResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rol createEntity(EntityManager em) {
        Rol rol = new Rol()
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION);
        return rol;
    }

    @Before
    public void initTest() {
        rolSearchRepository.deleteAll();
        rol = createEntity(em);
    }

    @Test
    @Transactional
    public void createRol() throws Exception {
        int databaseSizeBeforeCreate = rolRepository.findAll().size();

        // Create the Rol
        RolDTO rolDTO = rolMapper.toDto(rol);
        restRolMockMvc.perform(post("/api/rols")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolDTO)))
            .andExpect(status().isCreated());

        // Validate the Rol in the database
        List<Rol> rolList = rolRepository.findAll();
        assertThat(rolList).hasSize(databaseSizeBeforeCreate + 1);
        Rol testRol = rolList.get(rolList.size() - 1);
        assertThat(testRol.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testRol.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testRol.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);

        // Validate the Rol in Elasticsearch
        Rol rolEs = rolSearchRepository.findOne(testRol.getId());
        assertThat(rolEs).isEqualToIgnoringGivenFields(testRol);
    }

    @Test
    @Transactional
    public void createRolWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rolRepository.findAll().size();

        // Create the Rol with an existing ID
        rol.setId(1L);
        RolDTO rolDTO = rolMapper.toDto(rol);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRolMockMvc.perform(post("/api/rols")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Rol in the database
        List<Rol> rolList = rolRepository.findAll();
        assertThat(rolList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolRepository.findAll().size();
        // set the field null
        rol.setFechaCreacion(null);

        // Create the Rol, which fails.
        RolDTO rolDTO = rolMapper.toDto(rol);

        restRolMockMvc.perform(post("/api/rols")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolDTO)))
            .andExpect(status().isBadRequest());

        List<Rol> rolList = rolRepository.findAll();
        assertThat(rolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolRepository.findAll().size();
        // set the field null
        rol.setNombre(null);

        // Create the Rol, which fails.
        RolDTO rolDTO = rolMapper.toDto(rol);

        restRolMockMvc.perform(post("/api/rols")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolDTO)))
            .andExpect(status().isBadRequest());

        List<Rol> rolList = rolRepository.findAll();
        assertThat(rolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolRepository.findAll().size();
        // set the field null
        rol.setDescripcion(null);

        // Create the Rol, which fails.
        RolDTO rolDTO = rolMapper.toDto(rol);

        restRolMockMvc.perform(post("/api/rols")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolDTO)))
            .andExpect(status().isBadRequest());

        List<Rol> rolList = rolRepository.findAll();
        assertThat(rolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRols() throws Exception {
        // Initialize the database
        rolRepository.saveAndFlush(rol);

        // Get all the rolList
        restRolMockMvc.perform(get("/api/rols?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rol.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void getRol() throws Exception {
        // Initialize the database
        rolRepository.saveAndFlush(rol);

        // Get the rol
        restRolMockMvc.perform(get("/api/rols/{id}", rol.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rol.getId().intValue()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRol() throws Exception {
        // Get the rol
        restRolMockMvc.perform(get("/api/rols/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRol() throws Exception {
        // Initialize the database
        rolRepository.saveAndFlush(rol);
        rolSearchRepository.save(rol);
        int databaseSizeBeforeUpdate = rolRepository.findAll().size();

        // Update the rol
        Rol updatedRol = rolRepository.findOne(rol.getId());
        // Disconnect from session so that the updates on updatedRol are not directly saved in db
        em.detach(updatedRol);
        updatedRol
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);
        RolDTO rolDTO = rolMapper.toDto(updatedRol);

        restRolMockMvc.perform(put("/api/rols")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolDTO)))
            .andExpect(status().isOk());

        // Validate the Rol in the database
        List<Rol> rolList = rolRepository.findAll();
        assertThat(rolList).hasSize(databaseSizeBeforeUpdate);
        Rol testRol = rolList.get(rolList.size() - 1);
        assertThat(testRol.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testRol.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testRol.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);

        // Validate the Rol in Elasticsearch
        Rol rolEs = rolSearchRepository.findOne(testRol.getId());
        assertThat(rolEs).isEqualToIgnoringGivenFields(testRol);
    }

    @Test
    @Transactional
    public void updateNonExistingRol() throws Exception {
        int databaseSizeBeforeUpdate = rolRepository.findAll().size();

        // Create the Rol
        RolDTO rolDTO = rolMapper.toDto(rol);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRolMockMvc.perform(put("/api/rols")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolDTO)))
            .andExpect(status().isCreated());

        // Validate the Rol in the database
        List<Rol> rolList = rolRepository.findAll();
        assertThat(rolList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRol() throws Exception {
        // Initialize the database
        rolRepository.saveAndFlush(rol);
        rolSearchRepository.save(rol);
        int databaseSizeBeforeDelete = rolRepository.findAll().size();

        // Get the rol
        restRolMockMvc.perform(delete("/api/rols/{id}", rol.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean rolExistsInEs = rolSearchRepository.exists(rol.getId());
        assertThat(rolExistsInEs).isFalse();

        // Validate the database is empty
        List<Rol> rolList = rolRepository.findAll();
        assertThat(rolList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchRol() throws Exception {
        // Initialize the database
        rolRepository.saveAndFlush(rol);
        rolSearchRepository.save(rol);

        // Search the rol
        restRolMockMvc.perform(get("/api/_search/rols?query=id:" + rol.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rol.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rol.class);
        Rol rol1 = new Rol();
        rol1.setId(1L);
        Rol rol2 = new Rol();
        rol2.setId(rol1.getId());
        assertThat(rol1).isEqualTo(rol2);
        rol2.setId(2L);
        assertThat(rol1).isNotEqualTo(rol2);
        rol1.setId(null);
        assertThat(rol1).isNotEqualTo(rol2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RolDTO.class);
        RolDTO rolDTO1 = new RolDTO();
        rolDTO1.setId(1L);
        RolDTO rolDTO2 = new RolDTO();
        assertThat(rolDTO1).isNotEqualTo(rolDTO2);
        rolDTO2.setId(rolDTO1.getId());
        assertThat(rolDTO1).isEqualTo(rolDTO2);
        rolDTO2.setId(2L);
        assertThat(rolDTO1).isNotEqualTo(rolDTO2);
        rolDTO1.setId(null);
        assertThat(rolDTO1).isNotEqualTo(rolDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(rolMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(rolMapper.fromId(null)).isNull();
    }
}
