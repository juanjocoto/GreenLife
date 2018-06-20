package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.CadenaOrdenRecoleccion;
import com.radicalbytes.greenlife.repository.CadenaOrdenRecoleccionRepository;
import com.radicalbytes.greenlife.repository.search.CadenaOrdenRecoleccionSearchRepository;
import com.radicalbytes.greenlife.service.dto.CadenaOrdenRecoleccionDTO;
import com.radicalbytes.greenlife.service.mapper.CadenaOrdenRecoleccionMapper;
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

import com.radicalbytes.greenlife.domain.enumeration.EstadoOrdenRecoleccion;
/**
 * Test class for the CadenaOrdenRecoleccionResource REST controller.
 *
 * @see CadenaOrdenRecoleccionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class CadenaOrdenRecoleccionResourceIntTest {

    private static final EstadoOrdenRecoleccion DEFAULT_ESTADO = EstadoOrdenRecoleccion.APROBADA;
    private static final EstadoOrdenRecoleccion UPDATED_ESTADO = EstadoOrdenRecoleccion.EN_RUTA;

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private CadenaOrdenRecoleccionRepository cadenaOrdenRecoleccionRepository;

    @Autowired
    private CadenaOrdenRecoleccionMapper cadenaOrdenRecoleccionMapper;

    @Autowired
    private CadenaOrdenRecoleccionSearchRepository cadenaOrdenRecoleccionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCadenaOrdenRecoleccionMockMvc;

    private CadenaOrdenRecoleccion cadenaOrdenRecoleccion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CadenaOrdenRecoleccionResource cadenaOrdenRecoleccionResource = new CadenaOrdenRecoleccionResource(cadenaOrdenRecoleccionRepository, cadenaOrdenRecoleccionMapper, cadenaOrdenRecoleccionSearchRepository);
        this.restCadenaOrdenRecoleccionMockMvc = MockMvcBuilders.standaloneSetup(cadenaOrdenRecoleccionResource)
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
    public static CadenaOrdenRecoleccion createEntity(EntityManager em) {
        CadenaOrdenRecoleccion cadenaOrdenRecoleccion = new CadenaOrdenRecoleccion()
            .estado(DEFAULT_ESTADO)
            .descripcion(DEFAULT_DESCRIPCION);
        return cadenaOrdenRecoleccion;
    }

    @Before
    public void initTest() {
        cadenaOrdenRecoleccionSearchRepository.deleteAll();
        cadenaOrdenRecoleccion = createEntity(em);
    }

    @Test
    @Transactional
    public void createCadenaOrdenRecoleccion() throws Exception {
        int databaseSizeBeforeCreate = cadenaOrdenRecoleccionRepository.findAll().size();

        // Create the CadenaOrdenRecoleccion
        CadenaOrdenRecoleccionDTO cadenaOrdenRecoleccionDTO = cadenaOrdenRecoleccionMapper.toDto(cadenaOrdenRecoleccion);
        restCadenaOrdenRecoleccionMockMvc.perform(post("/api/cadena-orden-recoleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cadenaOrdenRecoleccionDTO)))
            .andExpect(status().isCreated());

        // Validate the CadenaOrdenRecoleccion in the database
        List<CadenaOrdenRecoleccion> cadenaOrdenRecoleccionList = cadenaOrdenRecoleccionRepository.findAll();
        assertThat(cadenaOrdenRecoleccionList).hasSize(databaseSizeBeforeCreate + 1);
        CadenaOrdenRecoleccion testCadenaOrdenRecoleccion = cadenaOrdenRecoleccionList.get(cadenaOrdenRecoleccionList.size() - 1);
        assertThat(testCadenaOrdenRecoleccion.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testCadenaOrdenRecoleccion.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);

        // Validate the CadenaOrdenRecoleccion in Elasticsearch
        CadenaOrdenRecoleccion cadenaOrdenRecoleccionEs = cadenaOrdenRecoleccionSearchRepository.findOne(testCadenaOrdenRecoleccion.getId());
        assertThat(cadenaOrdenRecoleccionEs).isEqualToIgnoringGivenFields(testCadenaOrdenRecoleccion);
    }

    @Test
    @Transactional
    public void createCadenaOrdenRecoleccionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cadenaOrdenRecoleccionRepository.findAll().size();

        // Create the CadenaOrdenRecoleccion with an existing ID
        cadenaOrdenRecoleccion.setId(1L);
        CadenaOrdenRecoleccionDTO cadenaOrdenRecoleccionDTO = cadenaOrdenRecoleccionMapper.toDto(cadenaOrdenRecoleccion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCadenaOrdenRecoleccionMockMvc.perform(post("/api/cadena-orden-recoleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cadenaOrdenRecoleccionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CadenaOrdenRecoleccion in the database
        List<CadenaOrdenRecoleccion> cadenaOrdenRecoleccionList = cadenaOrdenRecoleccionRepository.findAll();
        assertThat(cadenaOrdenRecoleccionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadenaOrdenRecoleccionRepository.findAll().size();
        // set the field null
        cadenaOrdenRecoleccion.setDescripcion(null);

        // Create the CadenaOrdenRecoleccion, which fails.
        CadenaOrdenRecoleccionDTO cadenaOrdenRecoleccionDTO = cadenaOrdenRecoleccionMapper.toDto(cadenaOrdenRecoleccion);

        restCadenaOrdenRecoleccionMockMvc.perform(post("/api/cadena-orden-recoleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cadenaOrdenRecoleccionDTO)))
            .andExpect(status().isBadRequest());

        List<CadenaOrdenRecoleccion> cadenaOrdenRecoleccionList = cadenaOrdenRecoleccionRepository.findAll();
        assertThat(cadenaOrdenRecoleccionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCadenaOrdenRecoleccions() throws Exception {
        // Initialize the database
        cadenaOrdenRecoleccionRepository.saveAndFlush(cadenaOrdenRecoleccion);

        // Get all the cadenaOrdenRecoleccionList
        restCadenaOrdenRecoleccionMockMvc.perform(get("/api/cadena-orden-recoleccions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cadenaOrdenRecoleccion.getId().intValue())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void getCadenaOrdenRecoleccion() throws Exception {
        // Initialize the database
        cadenaOrdenRecoleccionRepository.saveAndFlush(cadenaOrdenRecoleccion);

        // Get the cadenaOrdenRecoleccion
        restCadenaOrdenRecoleccionMockMvc.perform(get("/api/cadena-orden-recoleccions/{id}", cadenaOrdenRecoleccion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cadenaOrdenRecoleccion.getId().intValue()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCadenaOrdenRecoleccion() throws Exception {
        // Get the cadenaOrdenRecoleccion
        restCadenaOrdenRecoleccionMockMvc.perform(get("/api/cadena-orden-recoleccions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCadenaOrdenRecoleccion() throws Exception {
        // Initialize the database
        cadenaOrdenRecoleccionRepository.saveAndFlush(cadenaOrdenRecoleccion);
        cadenaOrdenRecoleccionSearchRepository.save(cadenaOrdenRecoleccion);
        int databaseSizeBeforeUpdate = cadenaOrdenRecoleccionRepository.findAll().size();

        // Update the cadenaOrdenRecoleccion
        CadenaOrdenRecoleccion updatedCadenaOrdenRecoleccion = cadenaOrdenRecoleccionRepository.findOne(cadenaOrdenRecoleccion.getId());
        // Disconnect from session so that the updates on updatedCadenaOrdenRecoleccion are not directly saved in db
        em.detach(updatedCadenaOrdenRecoleccion);
        updatedCadenaOrdenRecoleccion
            .estado(UPDATED_ESTADO)
            .descripcion(UPDATED_DESCRIPCION);
        CadenaOrdenRecoleccionDTO cadenaOrdenRecoleccionDTO = cadenaOrdenRecoleccionMapper.toDto(updatedCadenaOrdenRecoleccion);

        restCadenaOrdenRecoleccionMockMvc.perform(put("/api/cadena-orden-recoleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cadenaOrdenRecoleccionDTO)))
            .andExpect(status().isOk());

        // Validate the CadenaOrdenRecoleccion in the database
        List<CadenaOrdenRecoleccion> cadenaOrdenRecoleccionList = cadenaOrdenRecoleccionRepository.findAll();
        assertThat(cadenaOrdenRecoleccionList).hasSize(databaseSizeBeforeUpdate);
        CadenaOrdenRecoleccion testCadenaOrdenRecoleccion = cadenaOrdenRecoleccionList.get(cadenaOrdenRecoleccionList.size() - 1);
        assertThat(testCadenaOrdenRecoleccion.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testCadenaOrdenRecoleccion.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);

        // Validate the CadenaOrdenRecoleccion in Elasticsearch
        CadenaOrdenRecoleccion cadenaOrdenRecoleccionEs = cadenaOrdenRecoleccionSearchRepository.findOne(testCadenaOrdenRecoleccion.getId());
        assertThat(cadenaOrdenRecoleccionEs).isEqualToIgnoringGivenFields(testCadenaOrdenRecoleccion);
    }

    @Test
    @Transactional
    public void updateNonExistingCadenaOrdenRecoleccion() throws Exception {
        int databaseSizeBeforeUpdate = cadenaOrdenRecoleccionRepository.findAll().size();

        // Create the CadenaOrdenRecoleccion
        CadenaOrdenRecoleccionDTO cadenaOrdenRecoleccionDTO = cadenaOrdenRecoleccionMapper.toDto(cadenaOrdenRecoleccion);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCadenaOrdenRecoleccionMockMvc.perform(put("/api/cadena-orden-recoleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cadenaOrdenRecoleccionDTO)))
            .andExpect(status().isCreated());

        // Validate the CadenaOrdenRecoleccion in the database
        List<CadenaOrdenRecoleccion> cadenaOrdenRecoleccionList = cadenaOrdenRecoleccionRepository.findAll();
        assertThat(cadenaOrdenRecoleccionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCadenaOrdenRecoleccion() throws Exception {
        // Initialize the database
        cadenaOrdenRecoleccionRepository.saveAndFlush(cadenaOrdenRecoleccion);
        cadenaOrdenRecoleccionSearchRepository.save(cadenaOrdenRecoleccion);
        int databaseSizeBeforeDelete = cadenaOrdenRecoleccionRepository.findAll().size();

        // Get the cadenaOrdenRecoleccion
        restCadenaOrdenRecoleccionMockMvc.perform(delete("/api/cadena-orden-recoleccions/{id}", cadenaOrdenRecoleccion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean cadenaOrdenRecoleccionExistsInEs = cadenaOrdenRecoleccionSearchRepository.exists(cadenaOrdenRecoleccion.getId());
        assertThat(cadenaOrdenRecoleccionExistsInEs).isFalse();

        // Validate the database is empty
        List<CadenaOrdenRecoleccion> cadenaOrdenRecoleccionList = cadenaOrdenRecoleccionRepository.findAll();
        assertThat(cadenaOrdenRecoleccionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCadenaOrdenRecoleccion() throws Exception {
        // Initialize the database
        cadenaOrdenRecoleccionRepository.saveAndFlush(cadenaOrdenRecoleccion);
        cadenaOrdenRecoleccionSearchRepository.save(cadenaOrdenRecoleccion);

        // Search the cadenaOrdenRecoleccion
        restCadenaOrdenRecoleccionMockMvc.perform(get("/api/_search/cadena-orden-recoleccions?query=id:" + cadenaOrdenRecoleccion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cadenaOrdenRecoleccion.getId().intValue())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CadenaOrdenRecoleccion.class);
        CadenaOrdenRecoleccion cadenaOrdenRecoleccion1 = new CadenaOrdenRecoleccion();
        cadenaOrdenRecoleccion1.setId(1L);
        CadenaOrdenRecoleccion cadenaOrdenRecoleccion2 = new CadenaOrdenRecoleccion();
        cadenaOrdenRecoleccion2.setId(cadenaOrdenRecoleccion1.getId());
        assertThat(cadenaOrdenRecoleccion1).isEqualTo(cadenaOrdenRecoleccion2);
        cadenaOrdenRecoleccion2.setId(2L);
        assertThat(cadenaOrdenRecoleccion1).isNotEqualTo(cadenaOrdenRecoleccion2);
        cadenaOrdenRecoleccion1.setId(null);
        assertThat(cadenaOrdenRecoleccion1).isNotEqualTo(cadenaOrdenRecoleccion2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CadenaOrdenRecoleccionDTO.class);
        CadenaOrdenRecoleccionDTO cadenaOrdenRecoleccionDTO1 = new CadenaOrdenRecoleccionDTO();
        cadenaOrdenRecoleccionDTO1.setId(1L);
        CadenaOrdenRecoleccionDTO cadenaOrdenRecoleccionDTO2 = new CadenaOrdenRecoleccionDTO();
        assertThat(cadenaOrdenRecoleccionDTO1).isNotEqualTo(cadenaOrdenRecoleccionDTO2);
        cadenaOrdenRecoleccionDTO2.setId(cadenaOrdenRecoleccionDTO1.getId());
        assertThat(cadenaOrdenRecoleccionDTO1).isEqualTo(cadenaOrdenRecoleccionDTO2);
        cadenaOrdenRecoleccionDTO2.setId(2L);
        assertThat(cadenaOrdenRecoleccionDTO1).isNotEqualTo(cadenaOrdenRecoleccionDTO2);
        cadenaOrdenRecoleccionDTO1.setId(null);
        assertThat(cadenaOrdenRecoleccionDTO1).isNotEqualTo(cadenaOrdenRecoleccionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cadenaOrdenRecoleccionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cadenaOrdenRecoleccionMapper.fromId(null)).isNull();
    }
}
