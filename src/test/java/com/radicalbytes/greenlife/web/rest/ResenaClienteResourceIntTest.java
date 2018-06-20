package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.ResenaCliente;
import com.radicalbytes.greenlife.repository.ResenaClienteRepository;
import com.radicalbytes.greenlife.repository.search.ResenaClienteSearchRepository;
import com.radicalbytes.greenlife.service.dto.ResenaClienteDTO;
import com.radicalbytes.greenlife.service.mapper.ResenaClienteMapper;
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
 * Test class for the ResenaClienteResource REST controller.
 *
 * @see ResenaClienteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class ResenaClienteResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_CALIFICACION = 1;
    private static final Integer UPDATED_CALIFICACION = 2;

    private static final String DEFAULT_COMENTARIO = "AAAAAAAAAA";
    private static final String UPDATED_COMENTARIO = "BBBBBBBBBB";

    @Autowired
    private ResenaClienteRepository resenaClienteRepository;

    @Autowired
    private ResenaClienteMapper resenaClienteMapper;

    @Autowired
    private ResenaClienteSearchRepository resenaClienteSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restResenaClienteMockMvc;

    private ResenaCliente resenaCliente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ResenaClienteResource resenaClienteResource = new ResenaClienteResource(resenaClienteRepository, resenaClienteMapper, resenaClienteSearchRepository);
        this.restResenaClienteMockMvc = MockMvcBuilders.standaloneSetup(resenaClienteResource)
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
    public static ResenaCliente createEntity(EntityManager em) {
        ResenaCliente resenaCliente = new ResenaCliente()
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .calificacion(DEFAULT_CALIFICACION)
            .comentario(DEFAULT_COMENTARIO);
        return resenaCliente;
    }

    @Before
    public void initTest() {
        resenaClienteSearchRepository.deleteAll();
        resenaCliente = createEntity(em);
    }

    @Test
    @Transactional
    public void createResenaCliente() throws Exception {
        int databaseSizeBeforeCreate = resenaClienteRepository.findAll().size();

        // Create the ResenaCliente
        ResenaClienteDTO resenaClienteDTO = resenaClienteMapper.toDto(resenaCliente);
        restResenaClienteMockMvc.perform(post("/api/resena-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resenaClienteDTO)))
            .andExpect(status().isCreated());

        // Validate the ResenaCliente in the database
        List<ResenaCliente> resenaClienteList = resenaClienteRepository.findAll();
        assertThat(resenaClienteList).hasSize(databaseSizeBeforeCreate + 1);
        ResenaCliente testResenaCliente = resenaClienteList.get(resenaClienteList.size() - 1);
        assertThat(testResenaCliente.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testResenaCliente.getCalificacion()).isEqualTo(DEFAULT_CALIFICACION);
        assertThat(testResenaCliente.getComentario()).isEqualTo(DEFAULT_COMENTARIO);

        // Validate the ResenaCliente in Elasticsearch
        ResenaCliente resenaClienteEs = resenaClienteSearchRepository.findOne(testResenaCliente.getId());
        assertThat(resenaClienteEs).isEqualToIgnoringGivenFields(testResenaCliente);
    }

    @Test
    @Transactional
    public void createResenaClienteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = resenaClienteRepository.findAll().size();

        // Create the ResenaCliente with an existing ID
        resenaCliente.setId(1L);
        ResenaClienteDTO resenaClienteDTO = resenaClienteMapper.toDto(resenaCliente);

        // An entity with an existing ID cannot be created, so this API call must fail
        restResenaClienteMockMvc.perform(post("/api/resena-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resenaClienteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ResenaCliente in the database
        List<ResenaCliente> resenaClienteList = resenaClienteRepository.findAll();
        assertThat(resenaClienteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = resenaClienteRepository.findAll().size();
        // set the field null
        resenaCliente.setFechaCreacion(null);

        // Create the ResenaCliente, which fails.
        ResenaClienteDTO resenaClienteDTO = resenaClienteMapper.toDto(resenaCliente);

        restResenaClienteMockMvc.perform(post("/api/resena-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resenaClienteDTO)))
            .andExpect(status().isBadRequest());

        List<ResenaCliente> resenaClienteList = resenaClienteRepository.findAll();
        assertThat(resenaClienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCalificacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = resenaClienteRepository.findAll().size();
        // set the field null
        resenaCliente.setCalificacion(null);

        // Create the ResenaCliente, which fails.
        ResenaClienteDTO resenaClienteDTO = resenaClienteMapper.toDto(resenaCliente);

        restResenaClienteMockMvc.perform(post("/api/resena-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resenaClienteDTO)))
            .andExpect(status().isBadRequest());

        List<ResenaCliente> resenaClienteList = resenaClienteRepository.findAll();
        assertThat(resenaClienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkComentarioIsRequired() throws Exception {
        int databaseSizeBeforeTest = resenaClienteRepository.findAll().size();
        // set the field null
        resenaCliente.setComentario(null);

        // Create the ResenaCliente, which fails.
        ResenaClienteDTO resenaClienteDTO = resenaClienteMapper.toDto(resenaCliente);

        restResenaClienteMockMvc.perform(post("/api/resena-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resenaClienteDTO)))
            .andExpect(status().isBadRequest());

        List<ResenaCliente> resenaClienteList = resenaClienteRepository.findAll();
        assertThat(resenaClienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllResenaClientes() throws Exception {
        // Initialize the database
        resenaClienteRepository.saveAndFlush(resenaCliente);

        // Get all the resenaClienteList
        restResenaClienteMockMvc.perform(get("/api/resena-clientes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(resenaCliente.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].calificacion").value(hasItem(DEFAULT_CALIFICACION)))
            .andExpect(jsonPath("$.[*].comentario").value(hasItem(DEFAULT_COMENTARIO.toString())));
    }

    @Test
    @Transactional
    public void getResenaCliente() throws Exception {
        // Initialize the database
        resenaClienteRepository.saveAndFlush(resenaCliente);

        // Get the resenaCliente
        restResenaClienteMockMvc.perform(get("/api/resena-clientes/{id}", resenaCliente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(resenaCliente.getId().intValue()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.calificacion").value(DEFAULT_CALIFICACION))
            .andExpect(jsonPath("$.comentario").value(DEFAULT_COMENTARIO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingResenaCliente() throws Exception {
        // Get the resenaCliente
        restResenaClienteMockMvc.perform(get("/api/resena-clientes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateResenaCliente() throws Exception {
        // Initialize the database
        resenaClienteRepository.saveAndFlush(resenaCliente);
        resenaClienteSearchRepository.save(resenaCliente);
        int databaseSizeBeforeUpdate = resenaClienteRepository.findAll().size();

        // Update the resenaCliente
        ResenaCliente updatedResenaCliente = resenaClienteRepository.findOne(resenaCliente.getId());
        // Disconnect from session so that the updates on updatedResenaCliente are not directly saved in db
        em.detach(updatedResenaCliente);
        updatedResenaCliente
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .calificacion(UPDATED_CALIFICACION)
            .comentario(UPDATED_COMENTARIO);
        ResenaClienteDTO resenaClienteDTO = resenaClienteMapper.toDto(updatedResenaCliente);

        restResenaClienteMockMvc.perform(put("/api/resena-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resenaClienteDTO)))
            .andExpect(status().isOk());

        // Validate the ResenaCliente in the database
        List<ResenaCliente> resenaClienteList = resenaClienteRepository.findAll();
        assertThat(resenaClienteList).hasSize(databaseSizeBeforeUpdate);
        ResenaCliente testResenaCliente = resenaClienteList.get(resenaClienteList.size() - 1);
        assertThat(testResenaCliente.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testResenaCliente.getCalificacion()).isEqualTo(UPDATED_CALIFICACION);
        assertThat(testResenaCliente.getComentario()).isEqualTo(UPDATED_COMENTARIO);

        // Validate the ResenaCliente in Elasticsearch
        ResenaCliente resenaClienteEs = resenaClienteSearchRepository.findOne(testResenaCliente.getId());
        assertThat(resenaClienteEs).isEqualToIgnoringGivenFields(testResenaCliente);
    }

    @Test
    @Transactional
    public void updateNonExistingResenaCliente() throws Exception {
        int databaseSizeBeforeUpdate = resenaClienteRepository.findAll().size();

        // Create the ResenaCliente
        ResenaClienteDTO resenaClienteDTO = resenaClienteMapper.toDto(resenaCliente);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restResenaClienteMockMvc.perform(put("/api/resena-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resenaClienteDTO)))
            .andExpect(status().isCreated());

        // Validate the ResenaCliente in the database
        List<ResenaCliente> resenaClienteList = resenaClienteRepository.findAll();
        assertThat(resenaClienteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteResenaCliente() throws Exception {
        // Initialize the database
        resenaClienteRepository.saveAndFlush(resenaCliente);
        resenaClienteSearchRepository.save(resenaCliente);
        int databaseSizeBeforeDelete = resenaClienteRepository.findAll().size();

        // Get the resenaCliente
        restResenaClienteMockMvc.perform(delete("/api/resena-clientes/{id}", resenaCliente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean resenaClienteExistsInEs = resenaClienteSearchRepository.exists(resenaCliente.getId());
        assertThat(resenaClienteExistsInEs).isFalse();

        // Validate the database is empty
        List<ResenaCliente> resenaClienteList = resenaClienteRepository.findAll();
        assertThat(resenaClienteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchResenaCliente() throws Exception {
        // Initialize the database
        resenaClienteRepository.saveAndFlush(resenaCliente);
        resenaClienteSearchRepository.save(resenaCliente);

        // Search the resenaCliente
        restResenaClienteMockMvc.perform(get("/api/_search/resena-clientes?query=id:" + resenaCliente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(resenaCliente.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].calificacion").value(hasItem(DEFAULT_CALIFICACION)))
            .andExpect(jsonPath("$.[*].comentario").value(hasItem(DEFAULT_COMENTARIO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ResenaCliente.class);
        ResenaCliente resenaCliente1 = new ResenaCliente();
        resenaCliente1.setId(1L);
        ResenaCliente resenaCliente2 = new ResenaCliente();
        resenaCliente2.setId(resenaCliente1.getId());
        assertThat(resenaCliente1).isEqualTo(resenaCliente2);
        resenaCliente2.setId(2L);
        assertThat(resenaCliente1).isNotEqualTo(resenaCliente2);
        resenaCliente1.setId(null);
        assertThat(resenaCliente1).isNotEqualTo(resenaCliente2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ResenaClienteDTO.class);
        ResenaClienteDTO resenaClienteDTO1 = new ResenaClienteDTO();
        resenaClienteDTO1.setId(1L);
        ResenaClienteDTO resenaClienteDTO2 = new ResenaClienteDTO();
        assertThat(resenaClienteDTO1).isNotEqualTo(resenaClienteDTO2);
        resenaClienteDTO2.setId(resenaClienteDTO1.getId());
        assertThat(resenaClienteDTO1).isEqualTo(resenaClienteDTO2);
        resenaClienteDTO2.setId(2L);
        assertThat(resenaClienteDTO1).isNotEqualTo(resenaClienteDTO2);
        resenaClienteDTO1.setId(null);
        assertThat(resenaClienteDTO1).isNotEqualTo(resenaClienteDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(resenaClienteMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(resenaClienteMapper.fromId(null)).isNull();
    }
}
