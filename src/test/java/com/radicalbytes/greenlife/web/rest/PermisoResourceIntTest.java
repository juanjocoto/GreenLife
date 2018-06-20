package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.Permiso;
import com.radicalbytes.greenlife.repository.PermisoRepository;
import com.radicalbytes.greenlife.repository.search.PermisoSearchRepository;
import com.radicalbytes.greenlife.service.dto.PermisoDTO;
import com.radicalbytes.greenlife.service.mapper.PermisoMapper;
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
import java.util.List;

import static com.radicalbytes.greenlife.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PermisoResource REST controller.
 *
 * @see PermisoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class PermisoResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private PermisoRepository permisoRepository;

    @Autowired
    private PermisoMapper permisoMapper;

    @Autowired
    private PermisoSearchRepository permisoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPermisoMockMvc;

    private Permiso permiso;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PermisoResource permisoResource = new PermisoResource(permisoRepository, permisoMapper, permisoSearchRepository);
        this.restPermisoMockMvc = MockMvcBuilders.standaloneSetup(permisoResource)
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
    public static Permiso createEntity(EntityManager em) {
        Permiso permiso = new Permiso()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION);
        return permiso;
    }

    @Before
    public void initTest() {
        permisoSearchRepository.deleteAll();
        permiso = createEntity(em);
    }

    @Test
    @Transactional
    public void createPermiso() throws Exception {
        int databaseSizeBeforeCreate = permisoRepository.findAll().size();

        // Create the Permiso
        PermisoDTO permisoDTO = permisoMapper.toDto(permiso);
        restPermisoMockMvc.perform(post("/api/permisos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(permisoDTO)))
            .andExpect(status().isCreated());

        // Validate the Permiso in the database
        List<Permiso> permisoList = permisoRepository.findAll();
        assertThat(permisoList).hasSize(databaseSizeBeforeCreate + 1);
        Permiso testPermiso = permisoList.get(permisoList.size() - 1);
        assertThat(testPermiso.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPermiso.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);

        // Validate the Permiso in Elasticsearch
        Permiso permisoEs = permisoSearchRepository.findOne(testPermiso.getId());
        assertThat(permisoEs).isEqualToIgnoringGivenFields(testPermiso);
    }

    @Test
    @Transactional
    public void createPermisoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = permisoRepository.findAll().size();

        // Create the Permiso with an existing ID
        permiso.setId(1L);
        PermisoDTO permisoDTO = permisoMapper.toDto(permiso);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPermisoMockMvc.perform(post("/api/permisos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(permisoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Permiso in the database
        List<Permiso> permisoList = permisoRepository.findAll();
        assertThat(permisoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = permisoRepository.findAll().size();
        // set the field null
        permiso.setNombre(null);

        // Create the Permiso, which fails.
        PermisoDTO permisoDTO = permisoMapper.toDto(permiso);

        restPermisoMockMvc.perform(post("/api/permisos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(permisoDTO)))
            .andExpect(status().isBadRequest());

        List<Permiso> permisoList = permisoRepository.findAll();
        assertThat(permisoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = permisoRepository.findAll().size();
        // set the field null
        permiso.setDescripcion(null);

        // Create the Permiso, which fails.
        PermisoDTO permisoDTO = permisoMapper.toDto(permiso);

        restPermisoMockMvc.perform(post("/api/permisos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(permisoDTO)))
            .andExpect(status().isBadRequest());

        List<Permiso> permisoList = permisoRepository.findAll();
        assertThat(permisoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPermisos() throws Exception {
        // Initialize the database
        permisoRepository.saveAndFlush(permiso);

        // Get all the permisoList
        restPermisoMockMvc.perform(get("/api/permisos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(permiso.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void getPermiso() throws Exception {
        // Initialize the database
        permisoRepository.saveAndFlush(permiso);

        // Get the permiso
        restPermisoMockMvc.perform(get("/api/permisos/{id}", permiso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(permiso.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPermiso() throws Exception {
        // Get the permiso
        restPermisoMockMvc.perform(get("/api/permisos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePermiso() throws Exception {
        // Initialize the database
        permisoRepository.saveAndFlush(permiso);
        permisoSearchRepository.save(permiso);
        int databaseSizeBeforeUpdate = permisoRepository.findAll().size();

        // Update the permiso
        Permiso updatedPermiso = permisoRepository.findOne(permiso.getId());
        // Disconnect from session so that the updates on updatedPermiso are not directly saved in db
        em.detach(updatedPermiso);
        updatedPermiso
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);
        PermisoDTO permisoDTO = permisoMapper.toDto(updatedPermiso);

        restPermisoMockMvc.perform(put("/api/permisos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(permisoDTO)))
            .andExpect(status().isOk());

        // Validate the Permiso in the database
        List<Permiso> permisoList = permisoRepository.findAll();
        assertThat(permisoList).hasSize(databaseSizeBeforeUpdate);
        Permiso testPermiso = permisoList.get(permisoList.size() - 1);
        assertThat(testPermiso.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPermiso.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);

        // Validate the Permiso in Elasticsearch
        Permiso permisoEs = permisoSearchRepository.findOne(testPermiso.getId());
        assertThat(permisoEs).isEqualToIgnoringGivenFields(testPermiso);
    }

    @Test
    @Transactional
    public void updateNonExistingPermiso() throws Exception {
        int databaseSizeBeforeUpdate = permisoRepository.findAll().size();

        // Create the Permiso
        PermisoDTO permisoDTO = permisoMapper.toDto(permiso);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPermisoMockMvc.perform(put("/api/permisos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(permisoDTO)))
            .andExpect(status().isCreated());

        // Validate the Permiso in the database
        List<Permiso> permisoList = permisoRepository.findAll();
        assertThat(permisoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePermiso() throws Exception {
        // Initialize the database
        permisoRepository.saveAndFlush(permiso);
        permisoSearchRepository.save(permiso);
        int databaseSizeBeforeDelete = permisoRepository.findAll().size();

        // Get the permiso
        restPermisoMockMvc.perform(delete("/api/permisos/{id}", permiso.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean permisoExistsInEs = permisoSearchRepository.exists(permiso.getId());
        assertThat(permisoExistsInEs).isFalse();

        // Validate the database is empty
        List<Permiso> permisoList = permisoRepository.findAll();
        assertThat(permisoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPermiso() throws Exception {
        // Initialize the database
        permisoRepository.saveAndFlush(permiso);
        permisoSearchRepository.save(permiso);

        // Search the permiso
        restPermisoMockMvc.perform(get("/api/_search/permisos?query=id:" + permiso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(permiso.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Permiso.class);
        Permiso permiso1 = new Permiso();
        permiso1.setId(1L);
        Permiso permiso2 = new Permiso();
        permiso2.setId(permiso1.getId());
        assertThat(permiso1).isEqualTo(permiso2);
        permiso2.setId(2L);
        assertThat(permiso1).isNotEqualTo(permiso2);
        permiso1.setId(null);
        assertThat(permiso1).isNotEqualTo(permiso2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PermisoDTO.class);
        PermisoDTO permisoDTO1 = new PermisoDTO();
        permisoDTO1.setId(1L);
        PermisoDTO permisoDTO2 = new PermisoDTO();
        assertThat(permisoDTO1).isNotEqualTo(permisoDTO2);
        permisoDTO2.setId(permisoDTO1.getId());
        assertThat(permisoDTO1).isEqualTo(permisoDTO2);
        permisoDTO2.setId(2L);
        assertThat(permisoDTO1).isNotEqualTo(permisoDTO2);
        permisoDTO1.setId(null);
        assertThat(permisoDTO1).isNotEqualTo(permisoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(permisoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(permisoMapper.fromId(null)).isNull();
    }
}
