package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.Contrato;
import com.radicalbytes.greenlife.repository.ContratoRepository;
import com.radicalbytes.greenlife.repository.search.ContratoSearchRepository;
import com.radicalbytes.greenlife.service.dto.ContratoDTO;
import com.radicalbytes.greenlife.service.mapper.ContratoMapper;
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
 * Test class for the ContratoResource REST controller.
 *
 * @see ContratoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class ContratoResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ContratoRepository contratoRepository;

    @Autowired
    private ContratoMapper contratoMapper;

    @Autowired
    private ContratoSearchRepository contratoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restContratoMockMvc;

    private Contrato contrato;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContratoResource contratoResource = new ContratoResource(contratoRepository, contratoMapper, contratoSearchRepository);
        this.restContratoMockMvc = MockMvcBuilders.standaloneSetup(contratoResource)
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
    public static Contrato createEntity(EntityManager em) {
        Contrato contrato = new Contrato()
            .fechaCreacion(DEFAULT_FECHA_CREACION);
        return contrato;
    }

    @Before
    public void initTest() {
        contratoSearchRepository.deleteAll();
        contrato = createEntity(em);
    }

    @Test
    @Transactional
    public void createContrato() throws Exception {
        int databaseSizeBeforeCreate = contratoRepository.findAll().size();

        // Create the Contrato
        ContratoDTO contratoDTO = contratoMapper.toDto(contrato);
        restContratoMockMvc.perform(post("/api/contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contratoDTO)))
            .andExpect(status().isCreated());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeCreate + 1);
        Contrato testContrato = contratoList.get(contratoList.size() - 1);
        assertThat(testContrato.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);

        // Validate the Contrato in Elasticsearch
        Contrato contratoEs = contratoSearchRepository.findOne(testContrato.getId());
        assertThat(contratoEs).isEqualToIgnoringGivenFields(testContrato);
    }

    @Test
    @Transactional
    public void createContratoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contratoRepository.findAll().size();

        // Create the Contrato with an existing ID
        contrato.setId(1L);
        ContratoDTO contratoDTO = contratoMapper.toDto(contrato);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContratoMockMvc.perform(post("/api/contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contratoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = contratoRepository.findAll().size();
        // set the field null
        contrato.setFechaCreacion(null);

        // Create the Contrato, which fails.
        ContratoDTO contratoDTO = contratoMapper.toDto(contrato);

        restContratoMockMvc.perform(post("/api/contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contratoDTO)))
            .andExpect(status().isBadRequest());

        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllContratoes() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);

        // Get all the contratoList
        restContratoMockMvc.perform(get("/api/contratoes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contrato.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())));
    }

    @Test
    @Transactional
    public void getContrato() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);

        // Get the contrato
        restContratoMockMvc.perform(get("/api/contratoes/{id}", contrato.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contrato.getId().intValue()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContrato() throws Exception {
        // Get the contrato
        restContratoMockMvc.perform(get("/api/contratoes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContrato() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);
        contratoSearchRepository.save(contrato);
        int databaseSizeBeforeUpdate = contratoRepository.findAll().size();

        // Update the contrato
        Contrato updatedContrato = contratoRepository.findOne(contrato.getId());
        // Disconnect from session so that the updates on updatedContrato are not directly saved in db
        em.detach(updatedContrato);
        updatedContrato
            .fechaCreacion(UPDATED_FECHA_CREACION);
        ContratoDTO contratoDTO = contratoMapper.toDto(updatedContrato);

        restContratoMockMvc.perform(put("/api/contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contratoDTO)))
            .andExpect(status().isOk());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeUpdate);
        Contrato testContrato = contratoList.get(contratoList.size() - 1);
        assertThat(testContrato.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);

        // Validate the Contrato in Elasticsearch
        Contrato contratoEs = contratoSearchRepository.findOne(testContrato.getId());
        assertThat(contratoEs).isEqualToIgnoringGivenFields(testContrato);
    }

    @Test
    @Transactional
    public void updateNonExistingContrato() throws Exception {
        int databaseSizeBeforeUpdate = contratoRepository.findAll().size();

        // Create the Contrato
        ContratoDTO contratoDTO = contratoMapper.toDto(contrato);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restContratoMockMvc.perform(put("/api/contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contratoDTO)))
            .andExpect(status().isCreated());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteContrato() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);
        contratoSearchRepository.save(contrato);
        int databaseSizeBeforeDelete = contratoRepository.findAll().size();

        // Get the contrato
        restContratoMockMvc.perform(delete("/api/contratoes/{id}", contrato.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean contratoExistsInEs = contratoSearchRepository.exists(contrato.getId());
        assertThat(contratoExistsInEs).isFalse();

        // Validate the database is empty
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchContrato() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);
        contratoSearchRepository.save(contrato);

        // Search the contrato
        restContratoMockMvc.perform(get("/api/_search/contratoes?query=id:" + contrato.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contrato.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contrato.class);
        Contrato contrato1 = new Contrato();
        contrato1.setId(1L);
        Contrato contrato2 = new Contrato();
        contrato2.setId(contrato1.getId());
        assertThat(contrato1).isEqualTo(contrato2);
        contrato2.setId(2L);
        assertThat(contrato1).isNotEqualTo(contrato2);
        contrato1.setId(null);
        assertThat(contrato1).isNotEqualTo(contrato2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContratoDTO.class);
        ContratoDTO contratoDTO1 = new ContratoDTO();
        contratoDTO1.setId(1L);
        ContratoDTO contratoDTO2 = new ContratoDTO();
        assertThat(contratoDTO1).isNotEqualTo(contratoDTO2);
        contratoDTO2.setId(contratoDTO1.getId());
        assertThat(contratoDTO1).isEqualTo(contratoDTO2);
        contratoDTO2.setId(2L);
        assertThat(contratoDTO1).isNotEqualTo(contratoDTO2);
        contratoDTO1.setId(null);
        assertThat(contratoDTO1).isNotEqualTo(contratoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(contratoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(contratoMapper.fromId(null)).isNull();
    }
}
