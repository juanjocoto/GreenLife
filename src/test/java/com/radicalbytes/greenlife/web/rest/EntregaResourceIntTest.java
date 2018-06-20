package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.Entrega;
import com.radicalbytes.greenlife.repository.EntregaRepository;
import com.radicalbytes.greenlife.repository.search.EntregaSearchRepository;
import com.radicalbytes.greenlife.service.dto.EntregaDTO;
import com.radicalbytes.greenlife.service.mapper.EntregaMapper;
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
 * Test class for the EntregaResource REST controller.
 *
 * @see EntregaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class EntregaResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_INICIO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private EntregaRepository entregaRepository;

    @Autowired
    private EntregaMapper entregaMapper;

    @Autowired
    private EntregaSearchRepository entregaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEntregaMockMvc;

    private Entrega entrega;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EntregaResource entregaResource = new EntregaResource(entregaRepository, entregaMapper, entregaSearchRepository);
        this.restEntregaMockMvc = MockMvcBuilders.standaloneSetup(entregaResource)
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
    public static Entrega createEntity(EntityManager em) {
        Entrega entrega = new Entrega()
            .fechaInicio(DEFAULT_FECHA_INICIO);
        return entrega;
    }

    @Before
    public void initTest() {
        entregaSearchRepository.deleteAll();
        entrega = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntrega() throws Exception {
        int databaseSizeBeforeCreate = entregaRepository.findAll().size();

        // Create the Entrega
        EntregaDTO entregaDTO = entregaMapper.toDto(entrega);
        restEntregaMockMvc.perform(post("/api/entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entregaDTO)))
            .andExpect(status().isCreated());

        // Validate the Entrega in the database
        List<Entrega> entregaList = entregaRepository.findAll();
        assertThat(entregaList).hasSize(databaseSizeBeforeCreate + 1);
        Entrega testEntrega = entregaList.get(entregaList.size() - 1);
        assertThat(testEntrega.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);

        // Validate the Entrega in Elasticsearch
        Entrega entregaEs = entregaSearchRepository.findOne(testEntrega.getId());
        assertThat(entregaEs).isEqualToIgnoringGivenFields(testEntrega);
    }

    @Test
    @Transactional
    public void createEntregaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entregaRepository.findAll().size();

        // Create the Entrega with an existing ID
        entrega.setId(1L);
        EntregaDTO entregaDTO = entregaMapper.toDto(entrega);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntregaMockMvc.perform(post("/api/entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entregaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Entrega in the database
        List<Entrega> entregaList = entregaRepository.findAll();
        assertThat(entregaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaInicioIsRequired() throws Exception {
        int databaseSizeBeforeTest = entregaRepository.findAll().size();
        // set the field null
        entrega.setFechaInicio(null);

        // Create the Entrega, which fails.
        EntregaDTO entregaDTO = entregaMapper.toDto(entrega);

        restEntregaMockMvc.perform(post("/api/entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entregaDTO)))
            .andExpect(status().isBadRequest());

        List<Entrega> entregaList = entregaRepository.findAll();
        assertThat(entregaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEntregas() throws Exception {
        // Initialize the database
        entregaRepository.saveAndFlush(entrega);

        // Get all the entregaList
        restEntregaMockMvc.perform(get("/api/entregas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entrega.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())));
    }

    @Test
    @Transactional
    public void getEntrega() throws Exception {
        // Initialize the database
        entregaRepository.saveAndFlush(entrega);

        // Get the entrega
        restEntregaMockMvc.perform(get("/api/entregas/{id}", entrega.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(entrega.getId().intValue()))
            .andExpect(jsonPath("$.fechaInicio").value(DEFAULT_FECHA_INICIO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEntrega() throws Exception {
        // Get the entrega
        restEntregaMockMvc.perform(get("/api/entregas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntrega() throws Exception {
        // Initialize the database
        entregaRepository.saveAndFlush(entrega);
        entregaSearchRepository.save(entrega);
        int databaseSizeBeforeUpdate = entregaRepository.findAll().size();

        // Update the entrega
        Entrega updatedEntrega = entregaRepository.findOne(entrega.getId());
        // Disconnect from session so that the updates on updatedEntrega are not directly saved in db
        em.detach(updatedEntrega);
        updatedEntrega
            .fechaInicio(UPDATED_FECHA_INICIO);
        EntregaDTO entregaDTO = entregaMapper.toDto(updatedEntrega);

        restEntregaMockMvc.perform(put("/api/entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entregaDTO)))
            .andExpect(status().isOk());

        // Validate the Entrega in the database
        List<Entrega> entregaList = entregaRepository.findAll();
        assertThat(entregaList).hasSize(databaseSizeBeforeUpdate);
        Entrega testEntrega = entregaList.get(entregaList.size() - 1);
        assertThat(testEntrega.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);

        // Validate the Entrega in Elasticsearch
        Entrega entregaEs = entregaSearchRepository.findOne(testEntrega.getId());
        assertThat(entregaEs).isEqualToIgnoringGivenFields(testEntrega);
    }

    @Test
    @Transactional
    public void updateNonExistingEntrega() throws Exception {
        int databaseSizeBeforeUpdate = entregaRepository.findAll().size();

        // Create the Entrega
        EntregaDTO entregaDTO = entregaMapper.toDto(entrega);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEntregaMockMvc.perform(put("/api/entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entregaDTO)))
            .andExpect(status().isCreated());

        // Validate the Entrega in the database
        List<Entrega> entregaList = entregaRepository.findAll();
        assertThat(entregaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEntrega() throws Exception {
        // Initialize the database
        entregaRepository.saveAndFlush(entrega);
        entregaSearchRepository.save(entrega);
        int databaseSizeBeforeDelete = entregaRepository.findAll().size();

        // Get the entrega
        restEntregaMockMvc.perform(delete("/api/entregas/{id}", entrega.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean entregaExistsInEs = entregaSearchRepository.exists(entrega.getId());
        assertThat(entregaExistsInEs).isFalse();

        // Validate the database is empty
        List<Entrega> entregaList = entregaRepository.findAll();
        assertThat(entregaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchEntrega() throws Exception {
        // Initialize the database
        entregaRepository.saveAndFlush(entrega);
        entregaSearchRepository.save(entrega);

        // Search the entrega
        restEntregaMockMvc.perform(get("/api/_search/entregas?query=id:" + entrega.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entrega.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Entrega.class);
        Entrega entrega1 = new Entrega();
        entrega1.setId(1L);
        Entrega entrega2 = new Entrega();
        entrega2.setId(entrega1.getId());
        assertThat(entrega1).isEqualTo(entrega2);
        entrega2.setId(2L);
        assertThat(entrega1).isNotEqualTo(entrega2);
        entrega1.setId(null);
        assertThat(entrega1).isNotEqualTo(entrega2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntregaDTO.class);
        EntregaDTO entregaDTO1 = new EntregaDTO();
        entregaDTO1.setId(1L);
        EntregaDTO entregaDTO2 = new EntregaDTO();
        assertThat(entregaDTO1).isNotEqualTo(entregaDTO2);
        entregaDTO2.setId(entregaDTO1.getId());
        assertThat(entregaDTO1).isEqualTo(entregaDTO2);
        entregaDTO2.setId(2L);
        assertThat(entregaDTO1).isNotEqualTo(entregaDTO2);
        entregaDTO1.setId(null);
        assertThat(entregaDTO1).isNotEqualTo(entregaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(entregaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(entregaMapper.fromId(null)).isNull();
    }
}
