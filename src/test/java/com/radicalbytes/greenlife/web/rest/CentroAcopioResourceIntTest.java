package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.CentroAcopio;
import com.radicalbytes.greenlife.repository.CentroAcopioRepository;
import com.radicalbytes.greenlife.repository.search.CentroAcopioSearchRepository;
import com.radicalbytes.greenlife.service.dto.CentroAcopioDTO;
import com.radicalbytes.greenlife.service.mapper.CentroAcopioMapper;
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
 * Test class for the CentroAcopioResource REST controller.
 *
 * @see CentroAcopioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class CentroAcopioResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBB";

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final Double DEFAULT_LATITUD = 1D;
    private static final Double UPDATED_LATITUD = 2D;

    private static final Double DEFAULT_LONGITUD = 1D;
    private static final Double UPDATED_LONGITUD = 2D;

    private static final String DEFAULT_SITIO_WEB = "AAAAAAAAAA";
    private static final String UPDATED_SITIO_WEB = "BBBBBBBBBB";

    private static final String DEFAULT_CORREO = "AAAAAAAAAA";
    private static final String UPDATED_CORREO = "BBBBBBBBBB";

    @Autowired
    private CentroAcopioRepository centroAcopioRepository;

    @Autowired
    private CentroAcopioMapper centroAcopioMapper;

    @Autowired
    private CentroAcopioSearchRepository centroAcopioSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCentroAcopioMockMvc;

    private CentroAcopio centroAcopio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CentroAcopioResource centroAcopioResource = new CentroAcopioResource(centroAcopioRepository, centroAcopioMapper, centroAcopioSearchRepository);
        this.restCentroAcopioMockMvc = MockMvcBuilders.standaloneSetup(centroAcopioResource)
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
    public static CentroAcopio createEntity(EntityManager em) {
        CentroAcopio centroAcopio = new CentroAcopio()
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .nombre(DEFAULT_NOMBRE)
            .telefono(DEFAULT_TELEFONO)
            .direccion(DEFAULT_DIRECCION)
            .latitud(DEFAULT_LATITUD)
            .longitud(DEFAULT_LONGITUD)
            .sitioWeb(DEFAULT_SITIO_WEB)
            .correo(DEFAULT_CORREO);
        return centroAcopio;
    }

    @Before
    public void initTest() {
        centroAcopioSearchRepository.deleteAll();
        centroAcopio = createEntity(em);
    }

    @Test
    @Transactional
    public void createCentroAcopio() throws Exception {
        int databaseSizeBeforeCreate = centroAcopioRepository.findAll().size();

        // Create the CentroAcopio
        CentroAcopioDTO centroAcopioDTO = centroAcopioMapper.toDto(centroAcopio);
        restCentroAcopioMockMvc.perform(post("/api/centro-acopios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centroAcopioDTO)))
            .andExpect(status().isCreated());

        // Validate the CentroAcopio in the database
        List<CentroAcopio> centroAcopioList = centroAcopioRepository.findAll();
        assertThat(centroAcopioList).hasSize(databaseSizeBeforeCreate + 1);
        CentroAcopio testCentroAcopio = centroAcopioList.get(centroAcopioList.size() - 1);
        assertThat(testCentroAcopio.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testCentroAcopio.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testCentroAcopio.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testCentroAcopio.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testCentroAcopio.getLatitud()).isEqualTo(DEFAULT_LATITUD);
        assertThat(testCentroAcopio.getLongitud()).isEqualTo(DEFAULT_LONGITUD);
        assertThat(testCentroAcopio.getSitioWeb()).isEqualTo(DEFAULT_SITIO_WEB);
        assertThat(testCentroAcopio.getCorreo()).isEqualTo(DEFAULT_CORREO);

        // Validate the CentroAcopio in Elasticsearch
        CentroAcopio centroAcopioEs = centroAcopioSearchRepository.findOne(testCentroAcopio.getId());
        assertThat(centroAcopioEs).isEqualToIgnoringGivenFields(testCentroAcopio);
    }

    @Test
    @Transactional
    public void createCentroAcopioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = centroAcopioRepository.findAll().size();

        // Create the CentroAcopio with an existing ID
        centroAcopio.setId(1L);
        CentroAcopioDTO centroAcopioDTO = centroAcopioMapper.toDto(centroAcopio);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCentroAcopioMockMvc.perform(post("/api/centro-acopios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centroAcopioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CentroAcopio in the database
        List<CentroAcopio> centroAcopioList = centroAcopioRepository.findAll();
        assertThat(centroAcopioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = centroAcopioRepository.findAll().size();
        // set the field null
        centroAcopio.setFechaCreacion(null);

        // Create the CentroAcopio, which fails.
        CentroAcopioDTO centroAcopioDTO = centroAcopioMapper.toDto(centroAcopio);

        restCentroAcopioMockMvc.perform(post("/api/centro-acopios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centroAcopioDTO)))
            .andExpect(status().isBadRequest());

        List<CentroAcopio> centroAcopioList = centroAcopioRepository.findAll();
        assertThat(centroAcopioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = centroAcopioRepository.findAll().size();
        // set the field null
        centroAcopio.setNombre(null);

        // Create the CentroAcopio, which fails.
        CentroAcopioDTO centroAcopioDTO = centroAcopioMapper.toDto(centroAcopio);

        restCentroAcopioMockMvc.perform(post("/api/centro-acopios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centroAcopioDTO)))
            .andExpect(status().isBadRequest());

        List<CentroAcopio> centroAcopioList = centroAcopioRepository.findAll();
        assertThat(centroAcopioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTelefonoIsRequired() throws Exception {
        int databaseSizeBeforeTest = centroAcopioRepository.findAll().size();
        // set the field null
        centroAcopio.setTelefono(null);

        // Create the CentroAcopio, which fails.
        CentroAcopioDTO centroAcopioDTO = centroAcopioMapper.toDto(centroAcopio);

        restCentroAcopioMockMvc.perform(post("/api/centro-acopios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centroAcopioDTO)))
            .andExpect(status().isBadRequest());

        List<CentroAcopio> centroAcopioList = centroAcopioRepository.findAll();
        assertThat(centroAcopioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDireccionIsRequired() throws Exception {
        int databaseSizeBeforeTest = centroAcopioRepository.findAll().size();
        // set the field null
        centroAcopio.setDireccion(null);

        // Create the CentroAcopio, which fails.
        CentroAcopioDTO centroAcopioDTO = centroAcopioMapper.toDto(centroAcopio);

        restCentroAcopioMockMvc.perform(post("/api/centro-acopios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centroAcopioDTO)))
            .andExpect(status().isBadRequest());

        List<CentroAcopio> centroAcopioList = centroAcopioRepository.findAll();
        assertThat(centroAcopioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLatitudIsRequired() throws Exception {
        int databaseSizeBeforeTest = centroAcopioRepository.findAll().size();
        // set the field null
        centroAcopio.setLatitud(null);

        // Create the CentroAcopio, which fails.
        CentroAcopioDTO centroAcopioDTO = centroAcopioMapper.toDto(centroAcopio);

        restCentroAcopioMockMvc.perform(post("/api/centro-acopios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centroAcopioDTO)))
            .andExpect(status().isBadRequest());

        List<CentroAcopio> centroAcopioList = centroAcopioRepository.findAll();
        assertThat(centroAcopioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLongitudIsRequired() throws Exception {
        int databaseSizeBeforeTest = centroAcopioRepository.findAll().size();
        // set the field null
        centroAcopio.setLongitud(null);

        // Create the CentroAcopio, which fails.
        CentroAcopioDTO centroAcopioDTO = centroAcopioMapper.toDto(centroAcopio);

        restCentroAcopioMockMvc.perform(post("/api/centro-acopios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centroAcopioDTO)))
            .andExpect(status().isBadRequest());

        List<CentroAcopio> centroAcopioList = centroAcopioRepository.findAll();
        assertThat(centroAcopioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCentroAcopios() throws Exception {
        // Initialize the database
        centroAcopioRepository.saveAndFlush(centroAcopio);

        // Get all the centroAcopioList
        restCentroAcopioMockMvc.perform(get("/api/centro-acopios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(centroAcopio.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].latitud").value(hasItem(DEFAULT_LATITUD.doubleValue())))
            .andExpect(jsonPath("$.[*].longitud").value(hasItem(DEFAULT_LONGITUD.doubleValue())))
            .andExpect(jsonPath("$.[*].sitioWeb").value(hasItem(DEFAULT_SITIO_WEB.toString())))
            .andExpect(jsonPath("$.[*].correo").value(hasItem(DEFAULT_CORREO.toString())));
    }

    @Test
    @Transactional
    public void getCentroAcopio() throws Exception {
        // Initialize the database
        centroAcopioRepository.saveAndFlush(centroAcopio);

        // Get the centroAcopio
        restCentroAcopioMockMvc.perform(get("/api/centro-acopios/{id}", centroAcopio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(centroAcopio.getId().intValue()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO.toString()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()))
            .andExpect(jsonPath("$.latitud").value(DEFAULT_LATITUD.doubleValue()))
            .andExpect(jsonPath("$.longitud").value(DEFAULT_LONGITUD.doubleValue()))
            .andExpect(jsonPath("$.sitioWeb").value(DEFAULT_SITIO_WEB.toString()))
            .andExpect(jsonPath("$.correo").value(DEFAULT_CORREO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCentroAcopio() throws Exception {
        // Get the centroAcopio
        restCentroAcopioMockMvc.perform(get("/api/centro-acopios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCentroAcopio() throws Exception {
        // Initialize the database
        centroAcopioRepository.saveAndFlush(centroAcopio);
        centroAcopioSearchRepository.save(centroAcopio);
        int databaseSizeBeforeUpdate = centroAcopioRepository.findAll().size();

        // Update the centroAcopio
        CentroAcopio updatedCentroAcopio = centroAcopioRepository.findOne(centroAcopio.getId());
        // Disconnect from session so that the updates on updatedCentroAcopio are not directly saved in db
        em.detach(updatedCentroAcopio);
        updatedCentroAcopio
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .nombre(UPDATED_NOMBRE)
            .telefono(UPDATED_TELEFONO)
            .direccion(UPDATED_DIRECCION)
            .latitud(UPDATED_LATITUD)
            .longitud(UPDATED_LONGITUD)
            .sitioWeb(UPDATED_SITIO_WEB)
            .correo(UPDATED_CORREO);
        CentroAcopioDTO centroAcopioDTO = centroAcopioMapper.toDto(updatedCentroAcopio);

        restCentroAcopioMockMvc.perform(put("/api/centro-acopios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centroAcopioDTO)))
            .andExpect(status().isOk());

        // Validate the CentroAcopio in the database
        List<CentroAcopio> centroAcopioList = centroAcopioRepository.findAll();
        assertThat(centroAcopioList).hasSize(databaseSizeBeforeUpdate);
        CentroAcopio testCentroAcopio = centroAcopioList.get(centroAcopioList.size() - 1);
        assertThat(testCentroAcopio.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testCentroAcopio.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testCentroAcopio.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testCentroAcopio.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testCentroAcopio.getLatitud()).isEqualTo(UPDATED_LATITUD);
        assertThat(testCentroAcopio.getLongitud()).isEqualTo(UPDATED_LONGITUD);
        assertThat(testCentroAcopio.getSitioWeb()).isEqualTo(UPDATED_SITIO_WEB);
        assertThat(testCentroAcopio.getCorreo()).isEqualTo(UPDATED_CORREO);

        // Validate the CentroAcopio in Elasticsearch
        CentroAcopio centroAcopioEs = centroAcopioSearchRepository.findOne(testCentroAcopio.getId());
        assertThat(centroAcopioEs).isEqualToIgnoringGivenFields(testCentroAcopio);
    }

    @Test
    @Transactional
    public void updateNonExistingCentroAcopio() throws Exception {
        int databaseSizeBeforeUpdate = centroAcopioRepository.findAll().size();

        // Create the CentroAcopio
        CentroAcopioDTO centroAcopioDTO = centroAcopioMapper.toDto(centroAcopio);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCentroAcopioMockMvc.perform(put("/api/centro-acopios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centroAcopioDTO)))
            .andExpect(status().isCreated());

        // Validate the CentroAcopio in the database
        List<CentroAcopio> centroAcopioList = centroAcopioRepository.findAll();
        assertThat(centroAcopioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCentroAcopio() throws Exception {
        // Initialize the database
        centroAcopioRepository.saveAndFlush(centroAcopio);
        centroAcopioSearchRepository.save(centroAcopio);
        int databaseSizeBeforeDelete = centroAcopioRepository.findAll().size();

        // Get the centroAcopio
        restCentroAcopioMockMvc.perform(delete("/api/centro-acopios/{id}", centroAcopio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean centroAcopioExistsInEs = centroAcopioSearchRepository.exists(centroAcopio.getId());
        assertThat(centroAcopioExistsInEs).isFalse();

        // Validate the database is empty
        List<CentroAcopio> centroAcopioList = centroAcopioRepository.findAll();
        assertThat(centroAcopioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCentroAcopio() throws Exception {
        // Initialize the database
        centroAcopioRepository.saveAndFlush(centroAcopio);
        centroAcopioSearchRepository.save(centroAcopio);

        // Search the centroAcopio
        restCentroAcopioMockMvc.perform(get("/api/_search/centro-acopios?query=id:" + centroAcopio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(centroAcopio.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].latitud").value(hasItem(DEFAULT_LATITUD.doubleValue())))
            .andExpect(jsonPath("$.[*].longitud").value(hasItem(DEFAULT_LONGITUD.doubleValue())))
            .andExpect(jsonPath("$.[*].sitioWeb").value(hasItem(DEFAULT_SITIO_WEB.toString())))
            .andExpect(jsonPath("$.[*].correo").value(hasItem(DEFAULT_CORREO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CentroAcopio.class);
        CentroAcopio centroAcopio1 = new CentroAcopio();
        centroAcopio1.setId(1L);
        CentroAcopio centroAcopio2 = new CentroAcopio();
        centroAcopio2.setId(centroAcopio1.getId());
        assertThat(centroAcopio1).isEqualTo(centroAcopio2);
        centroAcopio2.setId(2L);
        assertThat(centroAcopio1).isNotEqualTo(centroAcopio2);
        centroAcopio1.setId(null);
        assertThat(centroAcopio1).isNotEqualTo(centroAcopio2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CentroAcopioDTO.class);
        CentroAcopioDTO centroAcopioDTO1 = new CentroAcopioDTO();
        centroAcopioDTO1.setId(1L);
        CentroAcopioDTO centroAcopioDTO2 = new CentroAcopioDTO();
        assertThat(centroAcopioDTO1).isNotEqualTo(centroAcopioDTO2);
        centroAcopioDTO2.setId(centroAcopioDTO1.getId());
        assertThat(centroAcopioDTO1).isEqualTo(centroAcopioDTO2);
        centroAcopioDTO2.setId(2L);
        assertThat(centroAcopioDTO1).isNotEqualTo(centroAcopioDTO2);
        centroAcopioDTO1.setId(null);
        assertThat(centroAcopioDTO1).isNotEqualTo(centroAcopioDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(centroAcopioMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(centroAcopioMapper.fromId(null)).isNull();
    }
}
