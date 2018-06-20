package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.CobroSuscripcion;
import com.radicalbytes.greenlife.repository.CobroSuscripcionRepository;
import com.radicalbytes.greenlife.repository.search.CobroSuscripcionSearchRepository;
import com.radicalbytes.greenlife.service.dto.CobroSuscripcionDTO;
import com.radicalbytes.greenlife.service.mapper.CobroSuscripcionMapper;
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
 * Test class for the CobroSuscripcionResource REST controller.
 *
 * @see CobroSuscripcionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class CobroSuscripcionResourceIntTest {

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CobroSuscripcionRepository cobroSuscripcionRepository;

    @Autowired
    private CobroSuscripcionMapper cobroSuscripcionMapper;

    @Autowired
    private CobroSuscripcionSearchRepository cobroSuscripcionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCobroSuscripcionMockMvc;

    private CobroSuscripcion cobroSuscripcion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CobroSuscripcionResource cobroSuscripcionResource = new CobroSuscripcionResource(cobroSuscripcionRepository, cobroSuscripcionMapper, cobroSuscripcionSearchRepository);
        this.restCobroSuscripcionMockMvc = MockMvcBuilders.standaloneSetup(cobroSuscripcionResource)
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
    public static CobroSuscripcion createEntity(EntityManager em) {
        CobroSuscripcion cobroSuscripcion = new CobroSuscripcion()
            .fecha(DEFAULT_FECHA);
        return cobroSuscripcion;
    }

    @Before
    public void initTest() {
        cobroSuscripcionSearchRepository.deleteAll();
        cobroSuscripcion = createEntity(em);
    }

    @Test
    @Transactional
    public void createCobroSuscripcion() throws Exception {
        int databaseSizeBeforeCreate = cobroSuscripcionRepository.findAll().size();

        // Create the CobroSuscripcion
        CobroSuscripcionDTO cobroSuscripcionDTO = cobroSuscripcionMapper.toDto(cobroSuscripcion);
        restCobroSuscripcionMockMvc.perform(post("/api/cobro-suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobroSuscripcionDTO)))
            .andExpect(status().isCreated());

        // Validate the CobroSuscripcion in the database
        List<CobroSuscripcion> cobroSuscripcionList = cobroSuscripcionRepository.findAll();
        assertThat(cobroSuscripcionList).hasSize(databaseSizeBeforeCreate + 1);
        CobroSuscripcion testCobroSuscripcion = cobroSuscripcionList.get(cobroSuscripcionList.size() - 1);
        assertThat(testCobroSuscripcion.getFecha()).isEqualTo(DEFAULT_FECHA);

        // Validate the CobroSuscripcion in Elasticsearch
        CobroSuscripcion cobroSuscripcionEs = cobroSuscripcionSearchRepository.findOne(testCobroSuscripcion.getId());
        assertThat(cobroSuscripcionEs).isEqualToIgnoringGivenFields(testCobroSuscripcion);
    }

    @Test
    @Transactional
    public void createCobroSuscripcionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cobroSuscripcionRepository.findAll().size();

        // Create the CobroSuscripcion with an existing ID
        cobroSuscripcion.setId(1L);
        CobroSuscripcionDTO cobroSuscripcionDTO = cobroSuscripcionMapper.toDto(cobroSuscripcion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCobroSuscripcionMockMvc.perform(post("/api/cobro-suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobroSuscripcionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CobroSuscripcion in the database
        List<CobroSuscripcion> cobroSuscripcionList = cobroSuscripcionRepository.findAll();
        assertThat(cobroSuscripcionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = cobroSuscripcionRepository.findAll().size();
        // set the field null
        cobroSuscripcion.setFecha(null);

        // Create the CobroSuscripcion, which fails.
        CobroSuscripcionDTO cobroSuscripcionDTO = cobroSuscripcionMapper.toDto(cobroSuscripcion);

        restCobroSuscripcionMockMvc.perform(post("/api/cobro-suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobroSuscripcionDTO)))
            .andExpect(status().isBadRequest());

        List<CobroSuscripcion> cobroSuscripcionList = cobroSuscripcionRepository.findAll();
        assertThat(cobroSuscripcionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCobroSuscripcions() throws Exception {
        // Initialize the database
        cobroSuscripcionRepository.saveAndFlush(cobroSuscripcion);

        // Get all the cobroSuscripcionList
        restCobroSuscripcionMockMvc.perform(get("/api/cobro-suscripcions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cobroSuscripcion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())));
    }

    @Test
    @Transactional
    public void getCobroSuscripcion() throws Exception {
        // Initialize the database
        cobroSuscripcionRepository.saveAndFlush(cobroSuscripcion);

        // Get the cobroSuscripcion
        restCobroSuscripcionMockMvc.perform(get("/api/cobro-suscripcions/{id}", cobroSuscripcion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cobroSuscripcion.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCobroSuscripcion() throws Exception {
        // Get the cobroSuscripcion
        restCobroSuscripcionMockMvc.perform(get("/api/cobro-suscripcions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCobroSuscripcion() throws Exception {
        // Initialize the database
        cobroSuscripcionRepository.saveAndFlush(cobroSuscripcion);
        cobroSuscripcionSearchRepository.save(cobroSuscripcion);
        int databaseSizeBeforeUpdate = cobroSuscripcionRepository.findAll().size();

        // Update the cobroSuscripcion
        CobroSuscripcion updatedCobroSuscripcion = cobroSuscripcionRepository.findOne(cobroSuscripcion.getId());
        // Disconnect from session so that the updates on updatedCobroSuscripcion are not directly saved in db
        em.detach(updatedCobroSuscripcion);
        updatedCobroSuscripcion
            .fecha(UPDATED_FECHA);
        CobroSuscripcionDTO cobroSuscripcionDTO = cobroSuscripcionMapper.toDto(updatedCobroSuscripcion);

        restCobroSuscripcionMockMvc.perform(put("/api/cobro-suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobroSuscripcionDTO)))
            .andExpect(status().isOk());

        // Validate the CobroSuscripcion in the database
        List<CobroSuscripcion> cobroSuscripcionList = cobroSuscripcionRepository.findAll();
        assertThat(cobroSuscripcionList).hasSize(databaseSizeBeforeUpdate);
        CobroSuscripcion testCobroSuscripcion = cobroSuscripcionList.get(cobroSuscripcionList.size() - 1);
        assertThat(testCobroSuscripcion.getFecha()).isEqualTo(UPDATED_FECHA);

        // Validate the CobroSuscripcion in Elasticsearch
        CobroSuscripcion cobroSuscripcionEs = cobroSuscripcionSearchRepository.findOne(testCobroSuscripcion.getId());
        assertThat(cobroSuscripcionEs).isEqualToIgnoringGivenFields(testCobroSuscripcion);
    }

    @Test
    @Transactional
    public void updateNonExistingCobroSuscripcion() throws Exception {
        int databaseSizeBeforeUpdate = cobroSuscripcionRepository.findAll().size();

        // Create the CobroSuscripcion
        CobroSuscripcionDTO cobroSuscripcionDTO = cobroSuscripcionMapper.toDto(cobroSuscripcion);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCobroSuscripcionMockMvc.perform(put("/api/cobro-suscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobroSuscripcionDTO)))
            .andExpect(status().isCreated());

        // Validate the CobroSuscripcion in the database
        List<CobroSuscripcion> cobroSuscripcionList = cobroSuscripcionRepository.findAll();
        assertThat(cobroSuscripcionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCobroSuscripcion() throws Exception {
        // Initialize the database
        cobroSuscripcionRepository.saveAndFlush(cobroSuscripcion);
        cobroSuscripcionSearchRepository.save(cobroSuscripcion);
        int databaseSizeBeforeDelete = cobroSuscripcionRepository.findAll().size();

        // Get the cobroSuscripcion
        restCobroSuscripcionMockMvc.perform(delete("/api/cobro-suscripcions/{id}", cobroSuscripcion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean cobroSuscripcionExistsInEs = cobroSuscripcionSearchRepository.exists(cobroSuscripcion.getId());
        assertThat(cobroSuscripcionExistsInEs).isFalse();

        // Validate the database is empty
        List<CobroSuscripcion> cobroSuscripcionList = cobroSuscripcionRepository.findAll();
        assertThat(cobroSuscripcionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCobroSuscripcion() throws Exception {
        // Initialize the database
        cobroSuscripcionRepository.saveAndFlush(cobroSuscripcion);
        cobroSuscripcionSearchRepository.save(cobroSuscripcion);

        // Search the cobroSuscripcion
        restCobroSuscripcionMockMvc.perform(get("/api/_search/cobro-suscripcions?query=id:" + cobroSuscripcion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cobroSuscripcion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CobroSuscripcion.class);
        CobroSuscripcion cobroSuscripcion1 = new CobroSuscripcion();
        cobroSuscripcion1.setId(1L);
        CobroSuscripcion cobroSuscripcion2 = new CobroSuscripcion();
        cobroSuscripcion2.setId(cobroSuscripcion1.getId());
        assertThat(cobroSuscripcion1).isEqualTo(cobroSuscripcion2);
        cobroSuscripcion2.setId(2L);
        assertThat(cobroSuscripcion1).isNotEqualTo(cobroSuscripcion2);
        cobroSuscripcion1.setId(null);
        assertThat(cobroSuscripcion1).isNotEqualTo(cobroSuscripcion2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CobroSuscripcionDTO.class);
        CobroSuscripcionDTO cobroSuscripcionDTO1 = new CobroSuscripcionDTO();
        cobroSuscripcionDTO1.setId(1L);
        CobroSuscripcionDTO cobroSuscripcionDTO2 = new CobroSuscripcionDTO();
        assertThat(cobroSuscripcionDTO1).isNotEqualTo(cobroSuscripcionDTO2);
        cobroSuscripcionDTO2.setId(cobroSuscripcionDTO1.getId());
        assertThat(cobroSuscripcionDTO1).isEqualTo(cobroSuscripcionDTO2);
        cobroSuscripcionDTO2.setId(2L);
        assertThat(cobroSuscripcionDTO1).isNotEqualTo(cobroSuscripcionDTO2);
        cobroSuscripcionDTO1.setId(null);
        assertThat(cobroSuscripcionDTO1).isNotEqualTo(cobroSuscripcionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cobroSuscripcionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cobroSuscripcionMapper.fromId(null)).isNull();
    }
}
