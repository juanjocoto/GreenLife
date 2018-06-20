package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.SolicitudSuscripcion;
import com.radicalbytes.greenlife.repository.SolicitudSuscripcionRepository;
import com.radicalbytes.greenlife.repository.search.SolicitudSuscripcionSearchRepository;
import com.radicalbytes.greenlife.service.dto.SolicitudSuscripcionDTO;
import com.radicalbytes.greenlife.service.mapper.SolicitudSuscripcionMapper;
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

import com.radicalbytes.greenlife.domain.enumeration.EstadoSolicitud;
/**
 * Test class for the SolicitudSuscripcionResource REST controller.
 *
 * @see SolicitudSuscripcionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class SolicitudSuscripcionResourceIntTest {

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    private static final EstadoSolicitud DEFAULT_ESTADO = EstadoSolicitud.ACEPATDO;
    private static final EstadoSolicitud UPDATED_ESTADO = EstadoSolicitud.DENEGADO;

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private SolicitudSuscripcionRepository solicitudSuscripcionRepository;

    @Autowired
    private SolicitudSuscripcionMapper solicitudSuscripcionMapper;

    @Autowired
    private SolicitudSuscripcionSearchRepository solicitudSuscripcionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSolicitudSuscripcionMockMvc;

    private SolicitudSuscripcion solicitudSuscripcion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SolicitudSuscripcionResource solicitudSuscripcionResource = new SolicitudSuscripcionResource(solicitudSuscripcionRepository, solicitudSuscripcionMapper, solicitudSuscripcionSearchRepository);
        this.restSolicitudSuscripcionMockMvc = MockMvcBuilders.standaloneSetup(solicitudSuscripcionResource)
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
    public static SolicitudSuscripcion createEntity(EntityManager em) {
        SolicitudSuscripcion solicitudSuscripcion = new SolicitudSuscripcion()
            .fecha(DEFAULT_FECHA)
            .estado(DEFAULT_ESTADO)
            .descripcion(DEFAULT_DESCRIPCION);
        return solicitudSuscripcion;
    }

    @Before
    public void initTest() {
        solicitudSuscripcionSearchRepository.deleteAll();
        solicitudSuscripcion = createEntity(em);
    }

    @Test
    @Transactional
    public void createSolicitudSuscripcion() throws Exception {
        int databaseSizeBeforeCreate = solicitudSuscripcionRepository.findAll().size();

        // Create the SolicitudSuscripcion
        SolicitudSuscripcionDTO solicitudSuscripcionDTO = solicitudSuscripcionMapper.toDto(solicitudSuscripcion);
        restSolicitudSuscripcionMockMvc.perform(post("/api/solicitud-suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitudSuscripcionDTO)))
            .andExpect(status().isCreated());

        // Validate the SolicitudSuscripcion in the database
        List<SolicitudSuscripcion> solicitudSuscripcionList = solicitudSuscripcionRepository.findAll();
        assertThat(solicitudSuscripcionList).hasSize(databaseSizeBeforeCreate + 1);
        SolicitudSuscripcion testSolicitudSuscripcion = solicitudSuscripcionList.get(solicitudSuscripcionList.size() - 1);
        assertThat(testSolicitudSuscripcion.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testSolicitudSuscripcion.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testSolicitudSuscripcion.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);

        // Validate the SolicitudSuscripcion in Elasticsearch
        SolicitudSuscripcion solicitudSuscripcionEs = solicitudSuscripcionSearchRepository.findOne(testSolicitudSuscripcion.getId());
        assertThat(solicitudSuscripcionEs).isEqualToIgnoringGivenFields(testSolicitudSuscripcion);
    }

    @Test
    @Transactional
    public void createSolicitudSuscripcionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = solicitudSuscripcionRepository.findAll().size();

        // Create the SolicitudSuscripcion with an existing ID
        solicitudSuscripcion.setId(1L);
        SolicitudSuscripcionDTO solicitudSuscripcionDTO = solicitudSuscripcionMapper.toDto(solicitudSuscripcion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSolicitudSuscripcionMockMvc.perform(post("/api/solicitud-suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitudSuscripcionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SolicitudSuscripcion in the database
        List<SolicitudSuscripcion> solicitudSuscripcionList = solicitudSuscripcionRepository.findAll();
        assertThat(solicitudSuscripcionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicitudSuscripcionRepository.findAll().size();
        // set the field null
        solicitudSuscripcion.setFecha(null);

        // Create the SolicitudSuscripcion, which fails.
        SolicitudSuscripcionDTO solicitudSuscripcionDTO = solicitudSuscripcionMapper.toDto(solicitudSuscripcion);

        restSolicitudSuscripcionMockMvc.perform(post("/api/solicitud-suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitudSuscripcionDTO)))
            .andExpect(status().isBadRequest());

        List<SolicitudSuscripcion> solicitudSuscripcionList = solicitudSuscripcionRepository.findAll();
        assertThat(solicitudSuscripcionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicitudSuscripcionRepository.findAll().size();
        // set the field null
        solicitudSuscripcion.setDescripcion(null);

        // Create the SolicitudSuscripcion, which fails.
        SolicitudSuscripcionDTO solicitudSuscripcionDTO = solicitudSuscripcionMapper.toDto(solicitudSuscripcion);

        restSolicitudSuscripcionMockMvc.perform(post("/api/solicitud-suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitudSuscripcionDTO)))
            .andExpect(status().isBadRequest());

        List<SolicitudSuscripcion> solicitudSuscripcionList = solicitudSuscripcionRepository.findAll();
        assertThat(solicitudSuscripcionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSolicitudSuscripcions() throws Exception {
        // Initialize the database
        solicitudSuscripcionRepository.saveAndFlush(solicitudSuscripcion);

        // Get all the solicitudSuscripcionList
        restSolicitudSuscripcionMockMvc.perform(get("/api/solicitud-suscripcions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(solicitudSuscripcion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void getSolicitudSuscripcion() throws Exception {
        // Initialize the database
        solicitudSuscripcionRepository.saveAndFlush(solicitudSuscripcion);

        // Get the solicitudSuscripcion
        restSolicitudSuscripcionMockMvc.perform(get("/api/solicitud-suscripcions/{id}", solicitudSuscripcion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(solicitudSuscripcion.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSolicitudSuscripcion() throws Exception {
        // Get the solicitudSuscripcion
        restSolicitudSuscripcionMockMvc.perform(get("/api/solicitud-suscripcions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSolicitudSuscripcion() throws Exception {
        // Initialize the database
        solicitudSuscripcionRepository.saveAndFlush(solicitudSuscripcion);
        solicitudSuscripcionSearchRepository.save(solicitudSuscripcion);
        int databaseSizeBeforeUpdate = solicitudSuscripcionRepository.findAll().size();

        // Update the solicitudSuscripcion
        SolicitudSuscripcion updatedSolicitudSuscripcion = solicitudSuscripcionRepository.findOne(solicitudSuscripcion.getId());
        // Disconnect from session so that the updates on updatedSolicitudSuscripcion are not directly saved in db
        em.detach(updatedSolicitudSuscripcion);
        updatedSolicitudSuscripcion
            .fecha(UPDATED_FECHA)
            .estado(UPDATED_ESTADO)
            .descripcion(UPDATED_DESCRIPCION);
        SolicitudSuscripcionDTO solicitudSuscripcionDTO = solicitudSuscripcionMapper.toDto(updatedSolicitudSuscripcion);

        restSolicitudSuscripcionMockMvc.perform(put("/api/solicitud-suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitudSuscripcionDTO)))
            .andExpect(status().isOk());

        // Validate the SolicitudSuscripcion in the database
        List<SolicitudSuscripcion> solicitudSuscripcionList = solicitudSuscripcionRepository.findAll();
        assertThat(solicitudSuscripcionList).hasSize(databaseSizeBeforeUpdate);
        SolicitudSuscripcion testSolicitudSuscripcion = solicitudSuscripcionList.get(solicitudSuscripcionList.size() - 1);
        assertThat(testSolicitudSuscripcion.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testSolicitudSuscripcion.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testSolicitudSuscripcion.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);

        // Validate the SolicitudSuscripcion in Elasticsearch
        SolicitudSuscripcion solicitudSuscripcionEs = solicitudSuscripcionSearchRepository.findOne(testSolicitudSuscripcion.getId());
        assertThat(solicitudSuscripcionEs).isEqualToIgnoringGivenFields(testSolicitudSuscripcion);
    }

    @Test
    @Transactional
    public void updateNonExistingSolicitudSuscripcion() throws Exception {
        int databaseSizeBeforeUpdate = solicitudSuscripcionRepository.findAll().size();

        // Create the SolicitudSuscripcion
        SolicitudSuscripcionDTO solicitudSuscripcionDTO = solicitudSuscripcionMapper.toDto(solicitudSuscripcion);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSolicitudSuscripcionMockMvc.perform(put("/api/solicitud-suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitudSuscripcionDTO)))
            .andExpect(status().isCreated());

        // Validate the SolicitudSuscripcion in the database
        List<SolicitudSuscripcion> solicitudSuscripcionList = solicitudSuscripcionRepository.findAll();
        assertThat(solicitudSuscripcionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSolicitudSuscripcion() throws Exception {
        // Initialize the database
        solicitudSuscripcionRepository.saveAndFlush(solicitudSuscripcion);
        solicitudSuscripcionSearchRepository.save(solicitudSuscripcion);
        int databaseSizeBeforeDelete = solicitudSuscripcionRepository.findAll().size();

        // Get the solicitudSuscripcion
        restSolicitudSuscripcionMockMvc.perform(delete("/api/solicitud-suscripcions/{id}", solicitudSuscripcion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean solicitudSuscripcionExistsInEs = solicitudSuscripcionSearchRepository.exists(solicitudSuscripcion.getId());
        assertThat(solicitudSuscripcionExistsInEs).isFalse();

        // Validate the database is empty
        List<SolicitudSuscripcion> solicitudSuscripcionList = solicitudSuscripcionRepository.findAll();
        assertThat(solicitudSuscripcionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSolicitudSuscripcion() throws Exception {
        // Initialize the database
        solicitudSuscripcionRepository.saveAndFlush(solicitudSuscripcion);
        solicitudSuscripcionSearchRepository.save(solicitudSuscripcion);

        // Search the solicitudSuscripcion
        restSolicitudSuscripcionMockMvc.perform(get("/api/_search/solicitud-suscripcions?query=id:" + solicitudSuscripcion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(solicitudSuscripcion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SolicitudSuscripcion.class);
        SolicitudSuscripcion solicitudSuscripcion1 = new SolicitudSuscripcion();
        solicitudSuscripcion1.setId(1L);
        SolicitudSuscripcion solicitudSuscripcion2 = new SolicitudSuscripcion();
        solicitudSuscripcion2.setId(solicitudSuscripcion1.getId());
        assertThat(solicitudSuscripcion1).isEqualTo(solicitudSuscripcion2);
        solicitudSuscripcion2.setId(2L);
        assertThat(solicitudSuscripcion1).isNotEqualTo(solicitudSuscripcion2);
        solicitudSuscripcion1.setId(null);
        assertThat(solicitudSuscripcion1).isNotEqualTo(solicitudSuscripcion2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SolicitudSuscripcionDTO.class);
        SolicitudSuscripcionDTO solicitudSuscripcionDTO1 = new SolicitudSuscripcionDTO();
        solicitudSuscripcionDTO1.setId(1L);
        SolicitudSuscripcionDTO solicitudSuscripcionDTO2 = new SolicitudSuscripcionDTO();
        assertThat(solicitudSuscripcionDTO1).isNotEqualTo(solicitudSuscripcionDTO2);
        solicitudSuscripcionDTO2.setId(solicitudSuscripcionDTO1.getId());
        assertThat(solicitudSuscripcionDTO1).isEqualTo(solicitudSuscripcionDTO2);
        solicitudSuscripcionDTO2.setId(2L);
        assertThat(solicitudSuscripcionDTO1).isNotEqualTo(solicitudSuscripcionDTO2);
        solicitudSuscripcionDTO1.setId(null);
        assertThat(solicitudSuscripcionDTO1).isNotEqualTo(solicitudSuscripcionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(solicitudSuscripcionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(solicitudSuscripcionMapper.fromId(null)).isNull();
    }
}
