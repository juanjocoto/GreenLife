package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.CobroMensualidad;
import com.radicalbytes.greenlife.repository.CobroMensualidadRepository;
import com.radicalbytes.greenlife.repository.search.CobroMensualidadSearchRepository;
import com.radicalbytes.greenlife.service.dto.CobroMensualidadDTO;
import com.radicalbytes.greenlife.service.mapper.CobroMensualidadMapper;
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
 * Test class for the CobroMensualidadResource REST controller.
 *
 * @see CobroMensualidadResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class CobroMensualidadResourceIntTest {

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CobroMensualidadRepository cobroMensualidadRepository;

    @Autowired
    private CobroMensualidadMapper cobroMensualidadMapper;

    @Autowired
    private CobroMensualidadSearchRepository cobroMensualidadSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCobroMensualidadMockMvc;

    private CobroMensualidad cobroMensualidad;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CobroMensualidadResource cobroMensualidadResource = new CobroMensualidadResource(cobroMensualidadRepository, cobroMensualidadMapper, cobroMensualidadSearchRepository);
        this.restCobroMensualidadMockMvc = MockMvcBuilders.standaloneSetup(cobroMensualidadResource)
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
    public static CobroMensualidad createEntity(EntityManager em) {
        CobroMensualidad cobroMensualidad = new CobroMensualidad()
            .fecha(DEFAULT_FECHA);
        return cobroMensualidad;
    }

    @Before
    public void initTest() {
        cobroMensualidadSearchRepository.deleteAll();
        cobroMensualidad = createEntity(em);
    }

    @Test
    @Transactional
    public void createCobroMensualidad() throws Exception {
        int databaseSizeBeforeCreate = cobroMensualidadRepository.findAll().size();

        // Create the CobroMensualidad
        CobroMensualidadDTO cobroMensualidadDTO = cobroMensualidadMapper.toDto(cobroMensualidad);
        restCobroMensualidadMockMvc.perform(post("/api/cobro-mensualidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobroMensualidadDTO)))
            .andExpect(status().isCreated());

        // Validate the CobroMensualidad in the database
        List<CobroMensualidad> cobroMensualidadList = cobroMensualidadRepository.findAll();
        assertThat(cobroMensualidadList).hasSize(databaseSizeBeforeCreate + 1);
        CobroMensualidad testCobroMensualidad = cobroMensualidadList.get(cobroMensualidadList.size() - 1);
        assertThat(testCobroMensualidad.getFecha()).isEqualTo(DEFAULT_FECHA);

        // Validate the CobroMensualidad in Elasticsearch
        CobroMensualidad cobroMensualidadEs = cobroMensualidadSearchRepository.findOne(testCobroMensualidad.getId());
        assertThat(cobroMensualidadEs).isEqualToIgnoringGivenFields(testCobroMensualidad);
    }

    @Test
    @Transactional
    public void createCobroMensualidadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cobroMensualidadRepository.findAll().size();

        // Create the CobroMensualidad with an existing ID
        cobroMensualidad.setId(1L);
        CobroMensualidadDTO cobroMensualidadDTO = cobroMensualidadMapper.toDto(cobroMensualidad);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCobroMensualidadMockMvc.perform(post("/api/cobro-mensualidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobroMensualidadDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CobroMensualidad in the database
        List<CobroMensualidad> cobroMensualidadList = cobroMensualidadRepository.findAll();
        assertThat(cobroMensualidadList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = cobroMensualidadRepository.findAll().size();
        // set the field null
        cobroMensualidad.setFecha(null);

        // Create the CobroMensualidad, which fails.
        CobroMensualidadDTO cobroMensualidadDTO = cobroMensualidadMapper.toDto(cobroMensualidad);

        restCobroMensualidadMockMvc.perform(post("/api/cobro-mensualidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobroMensualidadDTO)))
            .andExpect(status().isBadRequest());

        List<CobroMensualidad> cobroMensualidadList = cobroMensualidadRepository.findAll();
        assertThat(cobroMensualidadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCobroMensualidads() throws Exception {
        // Initialize the database
        cobroMensualidadRepository.saveAndFlush(cobroMensualidad);

        // Get all the cobroMensualidadList
        restCobroMensualidadMockMvc.perform(get("/api/cobro-mensualidads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cobroMensualidad.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())));
    }

    @Test
    @Transactional
    public void getCobroMensualidad() throws Exception {
        // Initialize the database
        cobroMensualidadRepository.saveAndFlush(cobroMensualidad);

        // Get the cobroMensualidad
        restCobroMensualidadMockMvc.perform(get("/api/cobro-mensualidads/{id}", cobroMensualidad.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cobroMensualidad.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCobroMensualidad() throws Exception {
        // Get the cobroMensualidad
        restCobroMensualidadMockMvc.perform(get("/api/cobro-mensualidads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCobroMensualidad() throws Exception {
        // Initialize the database
        cobroMensualidadRepository.saveAndFlush(cobroMensualidad);
        cobroMensualidadSearchRepository.save(cobroMensualidad);
        int databaseSizeBeforeUpdate = cobroMensualidadRepository.findAll().size();

        // Update the cobroMensualidad
        CobroMensualidad updatedCobroMensualidad = cobroMensualidadRepository.findOne(cobroMensualidad.getId());
        // Disconnect from session so that the updates on updatedCobroMensualidad are not directly saved in db
        em.detach(updatedCobroMensualidad);
        updatedCobroMensualidad
            .fecha(UPDATED_FECHA);
        CobroMensualidadDTO cobroMensualidadDTO = cobroMensualidadMapper.toDto(updatedCobroMensualidad);

        restCobroMensualidadMockMvc.perform(put("/api/cobro-mensualidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobroMensualidadDTO)))
            .andExpect(status().isOk());

        // Validate the CobroMensualidad in the database
        List<CobroMensualidad> cobroMensualidadList = cobroMensualidadRepository.findAll();
        assertThat(cobroMensualidadList).hasSize(databaseSizeBeforeUpdate);
        CobroMensualidad testCobroMensualidad = cobroMensualidadList.get(cobroMensualidadList.size() - 1);
        assertThat(testCobroMensualidad.getFecha()).isEqualTo(UPDATED_FECHA);

        // Validate the CobroMensualidad in Elasticsearch
        CobroMensualidad cobroMensualidadEs = cobroMensualidadSearchRepository.findOne(testCobroMensualidad.getId());
        assertThat(cobroMensualidadEs).isEqualToIgnoringGivenFields(testCobroMensualidad);
    }

    @Test
    @Transactional
    public void updateNonExistingCobroMensualidad() throws Exception {
        int databaseSizeBeforeUpdate = cobroMensualidadRepository.findAll().size();

        // Create the CobroMensualidad
        CobroMensualidadDTO cobroMensualidadDTO = cobroMensualidadMapper.toDto(cobroMensualidad);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCobroMensualidadMockMvc.perform(put("/api/cobro-mensualidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobroMensualidadDTO)))
            .andExpect(status().isCreated());

        // Validate the CobroMensualidad in the database
        List<CobroMensualidad> cobroMensualidadList = cobroMensualidadRepository.findAll();
        assertThat(cobroMensualidadList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCobroMensualidad() throws Exception {
        // Initialize the database
        cobroMensualidadRepository.saveAndFlush(cobroMensualidad);
        cobroMensualidadSearchRepository.save(cobroMensualidad);
        int databaseSizeBeforeDelete = cobroMensualidadRepository.findAll().size();

        // Get the cobroMensualidad
        restCobroMensualidadMockMvc.perform(delete("/api/cobro-mensualidads/{id}", cobroMensualidad.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean cobroMensualidadExistsInEs = cobroMensualidadSearchRepository.exists(cobroMensualidad.getId());
        assertThat(cobroMensualidadExistsInEs).isFalse();

        // Validate the database is empty
        List<CobroMensualidad> cobroMensualidadList = cobroMensualidadRepository.findAll();
        assertThat(cobroMensualidadList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCobroMensualidad() throws Exception {
        // Initialize the database
        cobroMensualidadRepository.saveAndFlush(cobroMensualidad);
        cobroMensualidadSearchRepository.save(cobroMensualidad);

        // Search the cobroMensualidad
        restCobroMensualidadMockMvc.perform(get("/api/_search/cobro-mensualidads?query=id:" + cobroMensualidad.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cobroMensualidad.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CobroMensualidad.class);
        CobroMensualidad cobroMensualidad1 = new CobroMensualidad();
        cobroMensualidad1.setId(1L);
        CobroMensualidad cobroMensualidad2 = new CobroMensualidad();
        cobroMensualidad2.setId(cobroMensualidad1.getId());
        assertThat(cobroMensualidad1).isEqualTo(cobroMensualidad2);
        cobroMensualidad2.setId(2L);
        assertThat(cobroMensualidad1).isNotEqualTo(cobroMensualidad2);
        cobroMensualidad1.setId(null);
        assertThat(cobroMensualidad1).isNotEqualTo(cobroMensualidad2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CobroMensualidadDTO.class);
        CobroMensualidadDTO cobroMensualidadDTO1 = new CobroMensualidadDTO();
        cobroMensualidadDTO1.setId(1L);
        CobroMensualidadDTO cobroMensualidadDTO2 = new CobroMensualidadDTO();
        assertThat(cobroMensualidadDTO1).isNotEqualTo(cobroMensualidadDTO2);
        cobroMensualidadDTO2.setId(cobroMensualidadDTO1.getId());
        assertThat(cobroMensualidadDTO1).isEqualTo(cobroMensualidadDTO2);
        cobroMensualidadDTO2.setId(2L);
        assertThat(cobroMensualidadDTO1).isNotEqualTo(cobroMensualidadDTO2);
        cobroMensualidadDTO1.setId(null);
        assertThat(cobroMensualidadDTO1).isNotEqualTo(cobroMensualidadDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cobroMensualidadMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cobroMensualidadMapper.fromId(null)).isNull();
    }
}
