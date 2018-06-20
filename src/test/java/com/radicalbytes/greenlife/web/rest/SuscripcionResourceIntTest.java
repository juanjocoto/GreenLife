package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.Suscripcion;
import com.radicalbytes.greenlife.repository.SuscripcionRepository;
import com.radicalbytes.greenlife.repository.search.SuscripcionSearchRepository;
import com.radicalbytes.greenlife.service.dto.SuscripcionDTO;
import com.radicalbytes.greenlife.service.mapper.SuscripcionMapper;
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

import com.radicalbytes.greenlife.domain.enumeration.EstadoSuscripcion;
/**
 * Test class for the SuscripcionResource REST controller.
 *
 * @see SuscripcionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class SuscripcionResourceIntTest {

    private static final String DEFAULT_DETALLE = "AAAAAAAAAA";
    private static final String UPDATED_DETALLE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());

    private static final EstadoSuscripcion DEFAULT_ESTADO = EstadoSuscripcion.VIGENTE;
    private static final EstadoSuscripcion UPDATED_ESTADO = EstadoSuscripcion.EXPIRADO;

    private static final LocalDate DEFAULT_FECHA_CANCELACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CANCELACION = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_COBRO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_COBRO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SuscripcionRepository suscripcionRepository;

    @Autowired
    private SuscripcionMapper suscripcionMapper;

    @Autowired
    private SuscripcionSearchRepository suscripcionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSuscripcionMockMvc;

    private Suscripcion suscripcion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SuscripcionResource suscripcionResource = new SuscripcionResource(suscripcionRepository, suscripcionMapper, suscripcionSearchRepository);
        this.restSuscripcionMockMvc = MockMvcBuilders.standaloneSetup(suscripcionResource)
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
    public static Suscripcion createEntity(EntityManager em) {
        Suscripcion suscripcion = new Suscripcion()
            .detalle(DEFAULT_DETALLE)
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .estado(DEFAULT_ESTADO)
            .fechaCancelacion(DEFAULT_FECHA_CANCELACION)
            .fechaCobro(DEFAULT_FECHA_COBRO);
        return suscripcion;
    }

    @Before
    public void initTest() {
        suscripcionSearchRepository.deleteAll();
        suscripcion = createEntity(em);
    }

    @Test
    @Transactional
    public void createSuscripcion() throws Exception {
        int databaseSizeBeforeCreate = suscripcionRepository.findAll().size();

        // Create the Suscripcion
        SuscripcionDTO suscripcionDTO = suscripcionMapper.toDto(suscripcion);
        restSuscripcionMockMvc.perform(post("/api/suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(suscripcionDTO)))
            .andExpect(status().isCreated());

        // Validate the Suscripcion in the database
        List<Suscripcion> suscripcionList = suscripcionRepository.findAll();
        assertThat(suscripcionList).hasSize(databaseSizeBeforeCreate + 1);
        Suscripcion testSuscripcion = suscripcionList.get(suscripcionList.size() - 1);
        assertThat(testSuscripcion.getDetalle()).isEqualTo(DEFAULT_DETALLE);
        assertThat(testSuscripcion.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testSuscripcion.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testSuscripcion.getFechaCancelacion()).isEqualTo(DEFAULT_FECHA_CANCELACION);
        assertThat(testSuscripcion.getFechaCobro()).isEqualTo(DEFAULT_FECHA_COBRO);

        // Validate the Suscripcion in Elasticsearch
        Suscripcion suscripcionEs = suscripcionSearchRepository.findOne(testSuscripcion.getId());
        assertThat(suscripcionEs).isEqualToIgnoringGivenFields(testSuscripcion);
    }

    @Test
    @Transactional
    public void createSuscripcionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = suscripcionRepository.findAll().size();

        // Create the Suscripcion with an existing ID
        suscripcion.setId(1L);
        SuscripcionDTO suscripcionDTO = suscripcionMapper.toDto(suscripcion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSuscripcionMockMvc.perform(post("/api/suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(suscripcionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Suscripcion in the database
        List<Suscripcion> suscripcionList = suscripcionRepository.findAll();
        assertThat(suscripcionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = suscripcionRepository.findAll().size();
        // set the field null
        suscripcion.setFechaCreacion(null);

        // Create the Suscripcion, which fails.
        SuscripcionDTO suscripcionDTO = suscripcionMapper.toDto(suscripcion);

        restSuscripcionMockMvc.perform(post("/api/suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(suscripcionDTO)))
            .andExpect(status().isBadRequest());

        List<Suscripcion> suscripcionList = suscripcionRepository.findAll();
        assertThat(suscripcionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFechaCobroIsRequired() throws Exception {
        int databaseSizeBeforeTest = suscripcionRepository.findAll().size();
        // set the field null
        suscripcion.setFechaCobro(null);

        // Create the Suscripcion, which fails.
        SuscripcionDTO suscripcionDTO = suscripcionMapper.toDto(suscripcion);

        restSuscripcionMockMvc.perform(post("/api/suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(suscripcionDTO)))
            .andExpect(status().isBadRequest());

        List<Suscripcion> suscripcionList = suscripcionRepository.findAll();
        assertThat(suscripcionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSuscripcions() throws Exception {
        // Initialize the database
        suscripcionRepository.saveAndFlush(suscripcion);

        // Get all the suscripcionList
        restSuscripcionMockMvc.perform(get("/api/suscripcions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(suscripcion.getId().intValue())))
            .andExpect(jsonPath("$.[*].detalle").value(hasItem(DEFAULT_DETALLE.toString())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].fechaCancelacion").value(hasItem(DEFAULT_FECHA_CANCELACION.toString())))
            .andExpect(jsonPath("$.[*].fechaCobro").value(hasItem(DEFAULT_FECHA_COBRO.toString())));
    }

    @Test
    @Transactional
    public void getSuscripcion() throws Exception {
        // Initialize the database
        suscripcionRepository.saveAndFlush(suscripcion);

        // Get the suscripcion
        restSuscripcionMockMvc.perform(get("/api/suscripcions/{id}", suscripcion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(suscripcion.getId().intValue()))
            .andExpect(jsonPath("$.detalle").value(DEFAULT_DETALLE.toString()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.fechaCancelacion").value(DEFAULT_FECHA_CANCELACION.toString()))
            .andExpect(jsonPath("$.fechaCobro").value(DEFAULT_FECHA_COBRO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSuscripcion() throws Exception {
        // Get the suscripcion
        restSuscripcionMockMvc.perform(get("/api/suscripcions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSuscripcion() throws Exception {
        // Initialize the database
        suscripcionRepository.saveAndFlush(suscripcion);
        suscripcionSearchRepository.save(suscripcion);
        int databaseSizeBeforeUpdate = suscripcionRepository.findAll().size();

        // Update the suscripcion
        Suscripcion updatedSuscripcion = suscripcionRepository.findOne(suscripcion.getId());
        // Disconnect from session so that the updates on updatedSuscripcion are not directly saved in db
        em.detach(updatedSuscripcion);
        updatedSuscripcion
            .detalle(UPDATED_DETALLE)
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .estado(UPDATED_ESTADO)
            .fechaCancelacion(UPDATED_FECHA_CANCELACION)
            .fechaCobro(UPDATED_FECHA_COBRO);
        SuscripcionDTO suscripcionDTO = suscripcionMapper.toDto(updatedSuscripcion);

        restSuscripcionMockMvc.perform(put("/api/suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(suscripcionDTO)))
            .andExpect(status().isOk());

        // Validate the Suscripcion in the database
        List<Suscripcion> suscripcionList = suscripcionRepository.findAll();
        assertThat(suscripcionList).hasSize(databaseSizeBeforeUpdate);
        Suscripcion testSuscripcion = suscripcionList.get(suscripcionList.size() - 1);
        assertThat(testSuscripcion.getDetalle()).isEqualTo(UPDATED_DETALLE);
        assertThat(testSuscripcion.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testSuscripcion.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testSuscripcion.getFechaCancelacion()).isEqualTo(UPDATED_FECHA_CANCELACION);
        assertThat(testSuscripcion.getFechaCobro()).isEqualTo(UPDATED_FECHA_COBRO);

        // Validate the Suscripcion in Elasticsearch
        Suscripcion suscripcionEs = suscripcionSearchRepository.findOne(testSuscripcion.getId());
        assertThat(suscripcionEs).isEqualToIgnoringGivenFields(testSuscripcion);
    }

    @Test
    @Transactional
    public void updateNonExistingSuscripcion() throws Exception {
        int databaseSizeBeforeUpdate = suscripcionRepository.findAll().size();

        // Create the Suscripcion
        SuscripcionDTO suscripcionDTO = suscripcionMapper.toDto(suscripcion);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSuscripcionMockMvc.perform(put("/api/suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(suscripcionDTO)))
            .andExpect(status().isCreated());

        // Validate the Suscripcion in the database
        List<Suscripcion> suscripcionList = suscripcionRepository.findAll();
        assertThat(suscripcionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSuscripcion() throws Exception {
        // Initialize the database
        suscripcionRepository.saveAndFlush(suscripcion);
        suscripcionSearchRepository.save(suscripcion);
        int databaseSizeBeforeDelete = suscripcionRepository.findAll().size();

        // Get the suscripcion
        restSuscripcionMockMvc.perform(delete("/api/suscripcions/{id}", suscripcion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean suscripcionExistsInEs = suscripcionSearchRepository.exists(suscripcion.getId());
        assertThat(suscripcionExistsInEs).isFalse();

        // Validate the database is empty
        List<Suscripcion> suscripcionList = suscripcionRepository.findAll();
        assertThat(suscripcionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSuscripcion() throws Exception {
        // Initialize the database
        suscripcionRepository.saveAndFlush(suscripcion);
        suscripcionSearchRepository.save(suscripcion);

        // Search the suscripcion
        restSuscripcionMockMvc.perform(get("/api/_search/suscripcions?query=id:" + suscripcion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(suscripcion.getId().intValue())))
            .andExpect(jsonPath("$.[*].detalle").value(hasItem(DEFAULT_DETALLE.toString())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].fechaCancelacion").value(hasItem(DEFAULT_FECHA_CANCELACION.toString())))
            .andExpect(jsonPath("$.[*].fechaCobro").value(hasItem(DEFAULT_FECHA_COBRO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Suscripcion.class);
        Suscripcion suscripcion1 = new Suscripcion();
        suscripcion1.setId(1L);
        Suscripcion suscripcion2 = new Suscripcion();
        suscripcion2.setId(suscripcion1.getId());
        assertThat(suscripcion1).isEqualTo(suscripcion2);
        suscripcion2.setId(2L);
        assertThat(suscripcion1).isNotEqualTo(suscripcion2);
        suscripcion1.setId(null);
        assertThat(suscripcion1).isNotEqualTo(suscripcion2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SuscripcionDTO.class);
        SuscripcionDTO suscripcionDTO1 = new SuscripcionDTO();
        suscripcionDTO1.setId(1L);
        SuscripcionDTO suscripcionDTO2 = new SuscripcionDTO();
        assertThat(suscripcionDTO1).isNotEqualTo(suscripcionDTO2);
        suscripcionDTO2.setId(suscripcionDTO1.getId());
        assertThat(suscripcionDTO1).isEqualTo(suscripcionDTO2);
        suscripcionDTO2.setId(2L);
        assertThat(suscripcionDTO1).isNotEqualTo(suscripcionDTO2);
        suscripcionDTO1.setId(null);
        assertThat(suscripcionDTO1).isNotEqualTo(suscripcionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(suscripcionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(suscripcionMapper.fromId(null)).isNull();
    }
}
