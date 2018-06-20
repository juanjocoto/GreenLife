package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.DiaEntrega;
import com.radicalbytes.greenlife.repository.DiaEntregaRepository;
import com.radicalbytes.greenlife.repository.search.DiaEntregaSearchRepository;
import com.radicalbytes.greenlife.service.dto.DiaEntregaDTO;
import com.radicalbytes.greenlife.service.mapper.DiaEntregaMapper;
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

/**
 * Test class for the DiaEntregaResource REST controller.
 *
 * @see DiaEntregaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class DiaEntregaResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private DiaEntregaRepository diaEntregaRepository;

    @Autowired
    private DiaEntregaMapper diaEntregaMapper;

    @Autowired
    private DiaEntregaSearchRepository diaEntregaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDiaEntregaMockMvc;

    private DiaEntrega diaEntrega;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DiaEntregaResource diaEntregaResource = new DiaEntregaResource(diaEntregaRepository, diaEntregaMapper, diaEntregaSearchRepository);
        this.restDiaEntregaMockMvc = MockMvcBuilders.standaloneSetup(diaEntregaResource)
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
    public static DiaEntrega createEntity(EntityManager em) {
        DiaEntrega diaEntrega = new DiaEntrega()
            .nombre(DEFAULT_NOMBRE);
        return diaEntrega;
    }

    @Before
    public void initTest() {
        diaEntregaSearchRepository.deleteAll();
        diaEntrega = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiaEntrega() throws Exception {
        int databaseSizeBeforeCreate = diaEntregaRepository.findAll().size();

        // Create the DiaEntrega
        DiaEntregaDTO diaEntregaDTO = diaEntregaMapper.toDto(diaEntrega);
        restDiaEntregaMockMvc.perform(post("/api/dia-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diaEntregaDTO)))
            .andExpect(status().isCreated());

        // Validate the DiaEntrega in the database
        List<DiaEntrega> diaEntregaList = diaEntregaRepository.findAll();
        assertThat(diaEntregaList).hasSize(databaseSizeBeforeCreate + 1);
        DiaEntrega testDiaEntrega = diaEntregaList.get(diaEntregaList.size() - 1);
        assertThat(testDiaEntrega.getNombre()).isEqualTo(DEFAULT_NOMBRE);

        // Validate the DiaEntrega in Elasticsearch
        DiaEntrega diaEntregaEs = diaEntregaSearchRepository.findOne(testDiaEntrega.getId());
        assertThat(diaEntregaEs).isEqualToIgnoringGivenFields(testDiaEntrega);
    }

    @Test
    @Transactional
    public void createDiaEntregaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diaEntregaRepository.findAll().size();

        // Create the DiaEntrega with an existing ID
        diaEntrega.setId(1L);
        DiaEntregaDTO diaEntregaDTO = diaEntregaMapper.toDto(diaEntrega);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiaEntregaMockMvc.perform(post("/api/dia-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diaEntregaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DiaEntrega in the database
        List<DiaEntrega> diaEntregaList = diaEntregaRepository.findAll();
        assertThat(diaEntregaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = diaEntregaRepository.findAll().size();
        // set the field null
        diaEntrega.setNombre(null);

        // Create the DiaEntrega, which fails.
        DiaEntregaDTO diaEntregaDTO = diaEntregaMapper.toDto(diaEntrega);

        restDiaEntregaMockMvc.perform(post("/api/dia-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diaEntregaDTO)))
            .andExpect(status().isBadRequest());

        List<DiaEntrega> diaEntregaList = diaEntregaRepository.findAll();
        assertThat(diaEntregaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDiaEntregas() throws Exception {
        // Initialize the database
        diaEntregaRepository.saveAndFlush(diaEntrega);

        // Get all the diaEntregaList
        restDiaEntregaMockMvc.perform(get("/api/dia-entregas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diaEntrega.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void getDiaEntrega() throws Exception {
        // Initialize the database
        diaEntregaRepository.saveAndFlush(diaEntrega);

        // Get the diaEntrega
        restDiaEntregaMockMvc.perform(get("/api/dia-entregas/{id}", diaEntrega.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(diaEntrega.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDiaEntrega() throws Exception {
        // Get the diaEntrega
        restDiaEntregaMockMvc.perform(get("/api/dia-entregas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiaEntrega() throws Exception {
        // Initialize the database
        diaEntregaRepository.saveAndFlush(diaEntrega);
        diaEntregaSearchRepository.save(diaEntrega);
        int databaseSizeBeforeUpdate = diaEntregaRepository.findAll().size();

        // Update the diaEntrega
        DiaEntrega updatedDiaEntrega = diaEntregaRepository.findOne(diaEntrega.getId());
        // Disconnect from session so that the updates on updatedDiaEntrega are not directly saved in db
        em.detach(updatedDiaEntrega);
        updatedDiaEntrega
            .nombre(UPDATED_NOMBRE);
        DiaEntregaDTO diaEntregaDTO = diaEntregaMapper.toDto(updatedDiaEntrega);

        restDiaEntregaMockMvc.perform(put("/api/dia-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diaEntregaDTO)))
            .andExpect(status().isOk());

        // Validate the DiaEntrega in the database
        List<DiaEntrega> diaEntregaList = diaEntregaRepository.findAll();
        assertThat(diaEntregaList).hasSize(databaseSizeBeforeUpdate);
        DiaEntrega testDiaEntrega = diaEntregaList.get(diaEntregaList.size() - 1);
        assertThat(testDiaEntrega.getNombre()).isEqualTo(UPDATED_NOMBRE);

        // Validate the DiaEntrega in Elasticsearch
        DiaEntrega diaEntregaEs = diaEntregaSearchRepository.findOne(testDiaEntrega.getId());
        assertThat(diaEntregaEs).isEqualToIgnoringGivenFields(testDiaEntrega);
    }

    @Test
    @Transactional
    public void updateNonExistingDiaEntrega() throws Exception {
        int databaseSizeBeforeUpdate = diaEntregaRepository.findAll().size();

        // Create the DiaEntrega
        DiaEntregaDTO diaEntregaDTO = diaEntregaMapper.toDto(diaEntrega);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDiaEntregaMockMvc.perform(put("/api/dia-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diaEntregaDTO)))
            .andExpect(status().isCreated());

        // Validate the DiaEntrega in the database
        List<DiaEntrega> diaEntregaList = diaEntregaRepository.findAll();
        assertThat(diaEntregaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDiaEntrega() throws Exception {
        // Initialize the database
        diaEntregaRepository.saveAndFlush(diaEntrega);
        diaEntregaSearchRepository.save(diaEntrega);
        int databaseSizeBeforeDelete = diaEntregaRepository.findAll().size();

        // Get the diaEntrega
        restDiaEntregaMockMvc.perform(delete("/api/dia-entregas/{id}", diaEntrega.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean diaEntregaExistsInEs = diaEntregaSearchRepository.exists(diaEntrega.getId());
        assertThat(diaEntregaExistsInEs).isFalse();

        // Validate the database is empty
        List<DiaEntrega> diaEntregaList = diaEntregaRepository.findAll();
        assertThat(diaEntregaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchDiaEntrega() throws Exception {
        // Initialize the database
        diaEntregaRepository.saveAndFlush(diaEntrega);
        diaEntregaSearchRepository.save(diaEntrega);

        // Search the diaEntrega
        restDiaEntregaMockMvc.perform(get("/api/_search/dia-entregas?query=id:" + diaEntrega.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diaEntrega.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DiaEntrega.class);
        DiaEntrega diaEntrega1 = new DiaEntrega();
        diaEntrega1.setId(1L);
        DiaEntrega diaEntrega2 = new DiaEntrega();
        diaEntrega2.setId(diaEntrega1.getId());
        assertThat(diaEntrega1).isEqualTo(diaEntrega2);
        diaEntrega2.setId(2L);
        assertThat(diaEntrega1).isNotEqualTo(diaEntrega2);
        diaEntrega1.setId(null);
        assertThat(diaEntrega1).isNotEqualTo(diaEntrega2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DiaEntregaDTO.class);
        DiaEntregaDTO diaEntregaDTO1 = new DiaEntregaDTO();
        diaEntregaDTO1.setId(1L);
        DiaEntregaDTO diaEntregaDTO2 = new DiaEntregaDTO();
        assertThat(diaEntregaDTO1).isNotEqualTo(diaEntregaDTO2);
        diaEntregaDTO2.setId(diaEntregaDTO1.getId());
        assertThat(diaEntregaDTO1).isEqualTo(diaEntregaDTO2);
        diaEntregaDTO2.setId(2L);
        assertThat(diaEntregaDTO1).isNotEqualTo(diaEntregaDTO2);
        diaEntregaDTO1.setId(null);
        assertThat(diaEntregaDTO1).isNotEqualTo(diaEntregaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(diaEntregaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(diaEntregaMapper.fromId(null)).isNull();
    }
}
