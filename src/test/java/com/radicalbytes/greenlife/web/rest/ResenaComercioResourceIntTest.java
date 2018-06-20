package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.ResenaComercio;
import com.radicalbytes.greenlife.repository.ResenaComercioRepository;
import com.radicalbytes.greenlife.repository.search.ResenaComercioSearchRepository;
import com.radicalbytes.greenlife.service.dto.ResenaComercioDTO;
import com.radicalbytes.greenlife.service.mapper.ResenaComercioMapper;
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
 * Test class for the ResenaComercioResource REST controller.
 *
 * @see ResenaComercioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class ResenaComercioResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_CALIFICACION = 1;
    private static final Integer UPDATED_CALIFICACION = 2;

    private static final String DEFAULT_COMENTARIO = "AAAAAAAAAA";
    private static final String UPDATED_COMENTARIO = "BBBBBBBBBB";

    @Autowired
    private ResenaComercioRepository resenaComercioRepository;

    @Autowired
    private ResenaComercioMapper resenaComercioMapper;

    @Autowired
    private ResenaComercioSearchRepository resenaComercioSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restResenaComercioMockMvc;

    private ResenaComercio resenaComercio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ResenaComercioResource resenaComercioResource = new ResenaComercioResource(resenaComercioRepository, resenaComercioMapper, resenaComercioSearchRepository);
        this.restResenaComercioMockMvc = MockMvcBuilders.standaloneSetup(resenaComercioResource)
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
    public static ResenaComercio createEntity(EntityManager em) {
        ResenaComercio resenaComercio = new ResenaComercio()
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .calificacion(DEFAULT_CALIFICACION)
            .comentario(DEFAULT_COMENTARIO);
        return resenaComercio;
    }

    @Before
    public void initTest() {
        resenaComercioSearchRepository.deleteAll();
        resenaComercio = createEntity(em);
    }

    @Test
    @Transactional
    public void createResenaComercio() throws Exception {
        int databaseSizeBeforeCreate = resenaComercioRepository.findAll().size();

        // Create the ResenaComercio
        ResenaComercioDTO resenaComercioDTO = resenaComercioMapper.toDto(resenaComercio);
        restResenaComercioMockMvc.perform(post("/api/resena-comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resenaComercioDTO)))
            .andExpect(status().isCreated());

        // Validate the ResenaComercio in the database
        List<ResenaComercio> resenaComercioList = resenaComercioRepository.findAll();
        assertThat(resenaComercioList).hasSize(databaseSizeBeforeCreate + 1);
        ResenaComercio testResenaComercio = resenaComercioList.get(resenaComercioList.size() - 1);
        assertThat(testResenaComercio.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testResenaComercio.getCalificacion()).isEqualTo(DEFAULT_CALIFICACION);
        assertThat(testResenaComercio.getComentario()).isEqualTo(DEFAULT_COMENTARIO);

        // Validate the ResenaComercio in Elasticsearch
        ResenaComercio resenaComercioEs = resenaComercioSearchRepository.findOne(testResenaComercio.getId());
        assertThat(resenaComercioEs).isEqualToIgnoringGivenFields(testResenaComercio);
    }

    @Test
    @Transactional
    public void createResenaComercioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = resenaComercioRepository.findAll().size();

        // Create the ResenaComercio with an existing ID
        resenaComercio.setId(1L);
        ResenaComercioDTO resenaComercioDTO = resenaComercioMapper.toDto(resenaComercio);

        // An entity with an existing ID cannot be created, so this API call must fail
        restResenaComercioMockMvc.perform(post("/api/resena-comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resenaComercioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ResenaComercio in the database
        List<ResenaComercio> resenaComercioList = resenaComercioRepository.findAll();
        assertThat(resenaComercioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = resenaComercioRepository.findAll().size();
        // set the field null
        resenaComercio.setFechaCreacion(null);

        // Create the ResenaComercio, which fails.
        ResenaComercioDTO resenaComercioDTO = resenaComercioMapper.toDto(resenaComercio);

        restResenaComercioMockMvc.perform(post("/api/resena-comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resenaComercioDTO)))
            .andExpect(status().isBadRequest());

        List<ResenaComercio> resenaComercioList = resenaComercioRepository.findAll();
        assertThat(resenaComercioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCalificacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = resenaComercioRepository.findAll().size();
        // set the field null
        resenaComercio.setCalificacion(null);

        // Create the ResenaComercio, which fails.
        ResenaComercioDTO resenaComercioDTO = resenaComercioMapper.toDto(resenaComercio);

        restResenaComercioMockMvc.perform(post("/api/resena-comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resenaComercioDTO)))
            .andExpect(status().isBadRequest());

        List<ResenaComercio> resenaComercioList = resenaComercioRepository.findAll();
        assertThat(resenaComercioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkComentarioIsRequired() throws Exception {
        int databaseSizeBeforeTest = resenaComercioRepository.findAll().size();
        // set the field null
        resenaComercio.setComentario(null);

        // Create the ResenaComercio, which fails.
        ResenaComercioDTO resenaComercioDTO = resenaComercioMapper.toDto(resenaComercio);

        restResenaComercioMockMvc.perform(post("/api/resena-comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resenaComercioDTO)))
            .andExpect(status().isBadRequest());

        List<ResenaComercio> resenaComercioList = resenaComercioRepository.findAll();
        assertThat(resenaComercioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllResenaComercios() throws Exception {
        // Initialize the database
        resenaComercioRepository.saveAndFlush(resenaComercio);

        // Get all the resenaComercioList
        restResenaComercioMockMvc.perform(get("/api/resena-comercios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(resenaComercio.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].calificacion").value(hasItem(DEFAULT_CALIFICACION)))
            .andExpect(jsonPath("$.[*].comentario").value(hasItem(DEFAULT_COMENTARIO.toString())));
    }

    @Test
    @Transactional
    public void getResenaComercio() throws Exception {
        // Initialize the database
        resenaComercioRepository.saveAndFlush(resenaComercio);

        // Get the resenaComercio
        restResenaComercioMockMvc.perform(get("/api/resena-comercios/{id}", resenaComercio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(resenaComercio.getId().intValue()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.calificacion").value(DEFAULT_CALIFICACION))
            .andExpect(jsonPath("$.comentario").value(DEFAULT_COMENTARIO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingResenaComercio() throws Exception {
        // Get the resenaComercio
        restResenaComercioMockMvc.perform(get("/api/resena-comercios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateResenaComercio() throws Exception {
        // Initialize the database
        resenaComercioRepository.saveAndFlush(resenaComercio);
        resenaComercioSearchRepository.save(resenaComercio);
        int databaseSizeBeforeUpdate = resenaComercioRepository.findAll().size();

        // Update the resenaComercio
        ResenaComercio updatedResenaComercio = resenaComercioRepository.findOne(resenaComercio.getId());
        // Disconnect from session so that the updates on updatedResenaComercio are not directly saved in db
        em.detach(updatedResenaComercio);
        updatedResenaComercio
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .calificacion(UPDATED_CALIFICACION)
            .comentario(UPDATED_COMENTARIO);
        ResenaComercioDTO resenaComercioDTO = resenaComercioMapper.toDto(updatedResenaComercio);

        restResenaComercioMockMvc.perform(put("/api/resena-comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resenaComercioDTO)))
            .andExpect(status().isOk());

        // Validate the ResenaComercio in the database
        List<ResenaComercio> resenaComercioList = resenaComercioRepository.findAll();
        assertThat(resenaComercioList).hasSize(databaseSizeBeforeUpdate);
        ResenaComercio testResenaComercio = resenaComercioList.get(resenaComercioList.size() - 1);
        assertThat(testResenaComercio.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testResenaComercio.getCalificacion()).isEqualTo(UPDATED_CALIFICACION);
        assertThat(testResenaComercio.getComentario()).isEqualTo(UPDATED_COMENTARIO);

        // Validate the ResenaComercio in Elasticsearch
        ResenaComercio resenaComercioEs = resenaComercioSearchRepository.findOne(testResenaComercio.getId());
        assertThat(resenaComercioEs).isEqualToIgnoringGivenFields(testResenaComercio);
    }

    @Test
    @Transactional
    public void updateNonExistingResenaComercio() throws Exception {
        int databaseSizeBeforeUpdate = resenaComercioRepository.findAll().size();

        // Create the ResenaComercio
        ResenaComercioDTO resenaComercioDTO = resenaComercioMapper.toDto(resenaComercio);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restResenaComercioMockMvc.perform(put("/api/resena-comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resenaComercioDTO)))
            .andExpect(status().isCreated());

        // Validate the ResenaComercio in the database
        List<ResenaComercio> resenaComercioList = resenaComercioRepository.findAll();
        assertThat(resenaComercioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteResenaComercio() throws Exception {
        // Initialize the database
        resenaComercioRepository.saveAndFlush(resenaComercio);
        resenaComercioSearchRepository.save(resenaComercio);
        int databaseSizeBeforeDelete = resenaComercioRepository.findAll().size();

        // Get the resenaComercio
        restResenaComercioMockMvc.perform(delete("/api/resena-comercios/{id}", resenaComercio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean resenaComercioExistsInEs = resenaComercioSearchRepository.exists(resenaComercio.getId());
        assertThat(resenaComercioExistsInEs).isFalse();

        // Validate the database is empty
        List<ResenaComercio> resenaComercioList = resenaComercioRepository.findAll();
        assertThat(resenaComercioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchResenaComercio() throws Exception {
        // Initialize the database
        resenaComercioRepository.saveAndFlush(resenaComercio);
        resenaComercioSearchRepository.save(resenaComercio);

        // Search the resenaComercio
        restResenaComercioMockMvc.perform(get("/api/_search/resena-comercios?query=id:" + resenaComercio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(resenaComercio.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].calificacion").value(hasItem(DEFAULT_CALIFICACION)))
            .andExpect(jsonPath("$.[*].comentario").value(hasItem(DEFAULT_COMENTARIO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ResenaComercio.class);
        ResenaComercio resenaComercio1 = new ResenaComercio();
        resenaComercio1.setId(1L);
        ResenaComercio resenaComercio2 = new ResenaComercio();
        resenaComercio2.setId(resenaComercio1.getId());
        assertThat(resenaComercio1).isEqualTo(resenaComercio2);
        resenaComercio2.setId(2L);
        assertThat(resenaComercio1).isNotEqualTo(resenaComercio2);
        resenaComercio1.setId(null);
        assertThat(resenaComercio1).isNotEqualTo(resenaComercio2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ResenaComercioDTO.class);
        ResenaComercioDTO resenaComercioDTO1 = new ResenaComercioDTO();
        resenaComercioDTO1.setId(1L);
        ResenaComercioDTO resenaComercioDTO2 = new ResenaComercioDTO();
        assertThat(resenaComercioDTO1).isNotEqualTo(resenaComercioDTO2);
        resenaComercioDTO2.setId(resenaComercioDTO1.getId());
        assertThat(resenaComercioDTO1).isEqualTo(resenaComercioDTO2);
        resenaComercioDTO2.setId(2L);
        assertThat(resenaComercioDTO1).isNotEqualTo(resenaComercioDTO2);
        resenaComercioDTO1.setId(null);
        assertThat(resenaComercioDTO1).isNotEqualTo(resenaComercioDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(resenaComercioMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(resenaComercioMapper.fromId(null)).isNull();
    }
}
