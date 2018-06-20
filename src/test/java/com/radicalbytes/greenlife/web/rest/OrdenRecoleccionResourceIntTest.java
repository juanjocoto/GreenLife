package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.OrdenRecoleccion;
import com.radicalbytes.greenlife.repository.OrdenRecoleccionRepository;
import com.radicalbytes.greenlife.repository.search.OrdenRecoleccionSearchRepository;
import com.radicalbytes.greenlife.service.dto.OrdenRecoleccionDTO;
import com.radicalbytes.greenlife.service.mapper.OrdenRecoleccionMapper;
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
 * Test class for the OrdenRecoleccionResource REST controller.
 *
 * @see OrdenRecoleccionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class OrdenRecoleccionResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_CRECION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CRECION = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_SOLICITUD = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_SOLICITUD = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private OrdenRecoleccionRepository ordenRecoleccionRepository;

    @Autowired
    private OrdenRecoleccionMapper ordenRecoleccionMapper;

    @Autowired
    private OrdenRecoleccionSearchRepository ordenRecoleccionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrdenRecoleccionMockMvc;

    private OrdenRecoleccion ordenRecoleccion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrdenRecoleccionResource ordenRecoleccionResource = new OrdenRecoleccionResource(ordenRecoleccionRepository, ordenRecoleccionMapper, ordenRecoleccionSearchRepository);
        this.restOrdenRecoleccionMockMvc = MockMvcBuilders.standaloneSetup(ordenRecoleccionResource)
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
    public static OrdenRecoleccion createEntity(EntityManager em) {
        OrdenRecoleccion ordenRecoleccion = new OrdenRecoleccion()
            .fechaCrecion(DEFAULT_FECHA_CRECION)
            .fechaSolicitud(DEFAULT_FECHA_SOLICITUD);
        return ordenRecoleccion;
    }

    @Before
    public void initTest() {
        ordenRecoleccionSearchRepository.deleteAll();
        ordenRecoleccion = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrdenRecoleccion() throws Exception {
        int databaseSizeBeforeCreate = ordenRecoleccionRepository.findAll().size();

        // Create the OrdenRecoleccion
        OrdenRecoleccionDTO ordenRecoleccionDTO = ordenRecoleccionMapper.toDto(ordenRecoleccion);
        restOrdenRecoleccionMockMvc.perform(post("/api/orden-recoleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenRecoleccionDTO)))
            .andExpect(status().isCreated());

        // Validate the OrdenRecoleccion in the database
        List<OrdenRecoleccion> ordenRecoleccionList = ordenRecoleccionRepository.findAll();
        assertThat(ordenRecoleccionList).hasSize(databaseSizeBeforeCreate + 1);
        OrdenRecoleccion testOrdenRecoleccion = ordenRecoleccionList.get(ordenRecoleccionList.size() - 1);
        assertThat(testOrdenRecoleccion.getFechaCrecion()).isEqualTo(DEFAULT_FECHA_CRECION);
        assertThat(testOrdenRecoleccion.getFechaSolicitud()).isEqualTo(DEFAULT_FECHA_SOLICITUD);

        // Validate the OrdenRecoleccion in Elasticsearch
        OrdenRecoleccion ordenRecoleccionEs = ordenRecoleccionSearchRepository.findOne(testOrdenRecoleccion.getId());
        assertThat(ordenRecoleccionEs).isEqualToIgnoringGivenFields(testOrdenRecoleccion);
    }

    @Test
    @Transactional
    public void createOrdenRecoleccionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ordenRecoleccionRepository.findAll().size();

        // Create the OrdenRecoleccion with an existing ID
        ordenRecoleccion.setId(1L);
        OrdenRecoleccionDTO ordenRecoleccionDTO = ordenRecoleccionMapper.toDto(ordenRecoleccion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrdenRecoleccionMockMvc.perform(post("/api/orden-recoleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenRecoleccionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OrdenRecoleccion in the database
        List<OrdenRecoleccion> ordenRecoleccionList = ordenRecoleccionRepository.findAll();
        assertThat(ordenRecoleccionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaCrecionIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordenRecoleccionRepository.findAll().size();
        // set the field null
        ordenRecoleccion.setFechaCrecion(null);

        // Create the OrdenRecoleccion, which fails.
        OrdenRecoleccionDTO ordenRecoleccionDTO = ordenRecoleccionMapper.toDto(ordenRecoleccion);

        restOrdenRecoleccionMockMvc.perform(post("/api/orden-recoleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenRecoleccionDTO)))
            .andExpect(status().isBadRequest());

        List<OrdenRecoleccion> ordenRecoleccionList = ordenRecoleccionRepository.findAll();
        assertThat(ordenRecoleccionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFechaSolicitudIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordenRecoleccionRepository.findAll().size();
        // set the field null
        ordenRecoleccion.setFechaSolicitud(null);

        // Create the OrdenRecoleccion, which fails.
        OrdenRecoleccionDTO ordenRecoleccionDTO = ordenRecoleccionMapper.toDto(ordenRecoleccion);

        restOrdenRecoleccionMockMvc.perform(post("/api/orden-recoleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenRecoleccionDTO)))
            .andExpect(status().isBadRequest());

        List<OrdenRecoleccion> ordenRecoleccionList = ordenRecoleccionRepository.findAll();
        assertThat(ordenRecoleccionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrdenRecoleccions() throws Exception {
        // Initialize the database
        ordenRecoleccionRepository.saveAndFlush(ordenRecoleccion);

        // Get all the ordenRecoleccionList
        restOrdenRecoleccionMockMvc.perform(get("/api/orden-recoleccions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ordenRecoleccion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCrecion").value(hasItem(DEFAULT_FECHA_CRECION.toString())))
            .andExpect(jsonPath("$.[*].fechaSolicitud").value(hasItem(DEFAULT_FECHA_SOLICITUD.toString())));
    }

    @Test
    @Transactional
    public void getOrdenRecoleccion() throws Exception {
        // Initialize the database
        ordenRecoleccionRepository.saveAndFlush(ordenRecoleccion);

        // Get the ordenRecoleccion
        restOrdenRecoleccionMockMvc.perform(get("/api/orden-recoleccions/{id}", ordenRecoleccion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ordenRecoleccion.getId().intValue()))
            .andExpect(jsonPath("$.fechaCrecion").value(DEFAULT_FECHA_CRECION.toString()))
            .andExpect(jsonPath("$.fechaSolicitud").value(DEFAULT_FECHA_SOLICITUD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrdenRecoleccion() throws Exception {
        // Get the ordenRecoleccion
        restOrdenRecoleccionMockMvc.perform(get("/api/orden-recoleccions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrdenRecoleccion() throws Exception {
        // Initialize the database
        ordenRecoleccionRepository.saveAndFlush(ordenRecoleccion);
        ordenRecoleccionSearchRepository.save(ordenRecoleccion);
        int databaseSizeBeforeUpdate = ordenRecoleccionRepository.findAll().size();

        // Update the ordenRecoleccion
        OrdenRecoleccion updatedOrdenRecoleccion = ordenRecoleccionRepository.findOne(ordenRecoleccion.getId());
        // Disconnect from session so that the updates on updatedOrdenRecoleccion are not directly saved in db
        em.detach(updatedOrdenRecoleccion);
        updatedOrdenRecoleccion
            .fechaCrecion(UPDATED_FECHA_CRECION)
            .fechaSolicitud(UPDATED_FECHA_SOLICITUD);
        OrdenRecoleccionDTO ordenRecoleccionDTO = ordenRecoleccionMapper.toDto(updatedOrdenRecoleccion);

        restOrdenRecoleccionMockMvc.perform(put("/api/orden-recoleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenRecoleccionDTO)))
            .andExpect(status().isOk());

        // Validate the OrdenRecoleccion in the database
        List<OrdenRecoleccion> ordenRecoleccionList = ordenRecoleccionRepository.findAll();
        assertThat(ordenRecoleccionList).hasSize(databaseSizeBeforeUpdate);
        OrdenRecoleccion testOrdenRecoleccion = ordenRecoleccionList.get(ordenRecoleccionList.size() - 1);
        assertThat(testOrdenRecoleccion.getFechaCrecion()).isEqualTo(UPDATED_FECHA_CRECION);
        assertThat(testOrdenRecoleccion.getFechaSolicitud()).isEqualTo(UPDATED_FECHA_SOLICITUD);

        // Validate the OrdenRecoleccion in Elasticsearch
        OrdenRecoleccion ordenRecoleccionEs = ordenRecoleccionSearchRepository.findOne(testOrdenRecoleccion.getId());
        assertThat(ordenRecoleccionEs).isEqualToIgnoringGivenFields(testOrdenRecoleccion);
    }

    @Test
    @Transactional
    public void updateNonExistingOrdenRecoleccion() throws Exception {
        int databaseSizeBeforeUpdate = ordenRecoleccionRepository.findAll().size();

        // Create the OrdenRecoleccion
        OrdenRecoleccionDTO ordenRecoleccionDTO = ordenRecoleccionMapper.toDto(ordenRecoleccion);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrdenRecoleccionMockMvc.perform(put("/api/orden-recoleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenRecoleccionDTO)))
            .andExpect(status().isCreated());

        // Validate the OrdenRecoleccion in the database
        List<OrdenRecoleccion> ordenRecoleccionList = ordenRecoleccionRepository.findAll();
        assertThat(ordenRecoleccionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOrdenRecoleccion() throws Exception {
        // Initialize the database
        ordenRecoleccionRepository.saveAndFlush(ordenRecoleccion);
        ordenRecoleccionSearchRepository.save(ordenRecoleccion);
        int databaseSizeBeforeDelete = ordenRecoleccionRepository.findAll().size();

        // Get the ordenRecoleccion
        restOrdenRecoleccionMockMvc.perform(delete("/api/orden-recoleccions/{id}", ordenRecoleccion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean ordenRecoleccionExistsInEs = ordenRecoleccionSearchRepository.exists(ordenRecoleccion.getId());
        assertThat(ordenRecoleccionExistsInEs).isFalse();

        // Validate the database is empty
        List<OrdenRecoleccion> ordenRecoleccionList = ordenRecoleccionRepository.findAll();
        assertThat(ordenRecoleccionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchOrdenRecoleccion() throws Exception {
        // Initialize the database
        ordenRecoleccionRepository.saveAndFlush(ordenRecoleccion);
        ordenRecoleccionSearchRepository.save(ordenRecoleccion);

        // Search the ordenRecoleccion
        restOrdenRecoleccionMockMvc.perform(get("/api/_search/orden-recoleccions?query=id:" + ordenRecoleccion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ordenRecoleccion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCrecion").value(hasItem(DEFAULT_FECHA_CRECION.toString())))
            .andExpect(jsonPath("$.[*].fechaSolicitud").value(hasItem(DEFAULT_FECHA_SOLICITUD.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrdenRecoleccion.class);
        OrdenRecoleccion ordenRecoleccion1 = new OrdenRecoleccion();
        ordenRecoleccion1.setId(1L);
        OrdenRecoleccion ordenRecoleccion2 = new OrdenRecoleccion();
        ordenRecoleccion2.setId(ordenRecoleccion1.getId());
        assertThat(ordenRecoleccion1).isEqualTo(ordenRecoleccion2);
        ordenRecoleccion2.setId(2L);
        assertThat(ordenRecoleccion1).isNotEqualTo(ordenRecoleccion2);
        ordenRecoleccion1.setId(null);
        assertThat(ordenRecoleccion1).isNotEqualTo(ordenRecoleccion2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrdenRecoleccionDTO.class);
        OrdenRecoleccionDTO ordenRecoleccionDTO1 = new OrdenRecoleccionDTO();
        ordenRecoleccionDTO1.setId(1L);
        OrdenRecoleccionDTO ordenRecoleccionDTO2 = new OrdenRecoleccionDTO();
        assertThat(ordenRecoleccionDTO1).isNotEqualTo(ordenRecoleccionDTO2);
        ordenRecoleccionDTO2.setId(ordenRecoleccionDTO1.getId());
        assertThat(ordenRecoleccionDTO1).isEqualTo(ordenRecoleccionDTO2);
        ordenRecoleccionDTO2.setId(2L);
        assertThat(ordenRecoleccionDTO1).isNotEqualTo(ordenRecoleccionDTO2);
        ordenRecoleccionDTO1.setId(null);
        assertThat(ordenRecoleccionDTO1).isNotEqualTo(ordenRecoleccionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(ordenRecoleccionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(ordenRecoleccionMapper.fromId(null)).isNull();
    }
}
