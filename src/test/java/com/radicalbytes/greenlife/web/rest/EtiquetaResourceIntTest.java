package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.Etiqueta;
import com.radicalbytes.greenlife.repository.EtiquetaRepository;
import com.radicalbytes.greenlife.repository.search.EtiquetaSearchRepository;
import com.radicalbytes.greenlife.service.dto.EtiquetaDTO;
import com.radicalbytes.greenlife.service.mapper.EtiquetaMapper;
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
 * Test class for the EtiquetaResource REST controller.
 *
 * @see EtiquetaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class EtiquetaResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DISPONIBLE = false;
    private static final Boolean UPDATED_DISPONIBLE = true;

    @Autowired
    private EtiquetaRepository etiquetaRepository;

    @Autowired
    private EtiquetaMapper etiquetaMapper;

    @Autowired
    private EtiquetaSearchRepository etiquetaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEtiquetaMockMvc;

    private Etiqueta etiqueta;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EtiquetaResource etiquetaResource = new EtiquetaResource(etiquetaRepository, etiquetaMapper, etiquetaSearchRepository);
        this.restEtiquetaMockMvc = MockMvcBuilders.standaloneSetup(etiquetaResource)
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
    public static Etiqueta createEntity(EntityManager em) {
        Etiqueta etiqueta = new Etiqueta()
            .nombre(DEFAULT_NOMBRE)
            .disponible(DEFAULT_DISPONIBLE);
        return etiqueta;
    }

    @Before
    public void initTest() {
        etiquetaSearchRepository.deleteAll();
        etiqueta = createEntity(em);
    }

    @Test
    @Transactional
    public void createEtiqueta() throws Exception {
        int databaseSizeBeforeCreate = etiquetaRepository.findAll().size();

        // Create the Etiqueta
        EtiquetaDTO etiquetaDTO = etiquetaMapper.toDto(etiqueta);
        restEtiquetaMockMvc.perform(post("/api/etiquetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etiquetaDTO)))
            .andExpect(status().isCreated());

        // Validate the Etiqueta in the database
        List<Etiqueta> etiquetaList = etiquetaRepository.findAll();
        assertThat(etiquetaList).hasSize(databaseSizeBeforeCreate + 1);
        Etiqueta testEtiqueta = etiquetaList.get(etiquetaList.size() - 1);
        assertThat(testEtiqueta.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEtiqueta.isDisponible()).isEqualTo(DEFAULT_DISPONIBLE);

        // Validate the Etiqueta in Elasticsearch
        Etiqueta etiquetaEs = etiquetaSearchRepository.findOne(testEtiqueta.getId());
        assertThat(etiquetaEs).isEqualToIgnoringGivenFields(testEtiqueta);
    }

    @Test
    @Transactional
    public void createEtiquetaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = etiquetaRepository.findAll().size();

        // Create the Etiqueta with an existing ID
        etiqueta.setId(1L);
        EtiquetaDTO etiquetaDTO = etiquetaMapper.toDto(etiqueta);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtiquetaMockMvc.perform(post("/api/etiquetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etiquetaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Etiqueta in the database
        List<Etiqueta> etiquetaList = etiquetaRepository.findAll();
        assertThat(etiquetaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = etiquetaRepository.findAll().size();
        // set the field null
        etiqueta.setNombre(null);

        // Create the Etiqueta, which fails.
        EtiquetaDTO etiquetaDTO = etiquetaMapper.toDto(etiqueta);

        restEtiquetaMockMvc.perform(post("/api/etiquetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etiquetaDTO)))
            .andExpect(status().isBadRequest());

        List<Etiqueta> etiquetaList = etiquetaRepository.findAll();
        assertThat(etiquetaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDisponibleIsRequired() throws Exception {
        int databaseSizeBeforeTest = etiquetaRepository.findAll().size();
        // set the field null
        etiqueta.setDisponible(null);

        // Create the Etiqueta, which fails.
        EtiquetaDTO etiquetaDTO = etiquetaMapper.toDto(etiqueta);

        restEtiquetaMockMvc.perform(post("/api/etiquetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etiquetaDTO)))
            .andExpect(status().isBadRequest());

        List<Etiqueta> etiquetaList = etiquetaRepository.findAll();
        assertThat(etiquetaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEtiquetas() throws Exception {
        // Initialize the database
        etiquetaRepository.saveAndFlush(etiqueta);

        // Get all the etiquetaList
        restEtiquetaMockMvc.perform(get("/api/etiquetas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etiqueta.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].disponible").value(hasItem(DEFAULT_DISPONIBLE.booleanValue())));
    }

    @Test
    @Transactional
    public void getEtiqueta() throws Exception {
        // Initialize the database
        etiquetaRepository.saveAndFlush(etiqueta);

        // Get the etiqueta
        restEtiquetaMockMvc.perform(get("/api/etiquetas/{id}", etiqueta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(etiqueta.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.disponible").value(DEFAULT_DISPONIBLE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEtiqueta() throws Exception {
        // Get the etiqueta
        restEtiquetaMockMvc.perform(get("/api/etiquetas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEtiqueta() throws Exception {
        // Initialize the database
        etiquetaRepository.saveAndFlush(etiqueta);
        etiquetaSearchRepository.save(etiqueta);
        int databaseSizeBeforeUpdate = etiquetaRepository.findAll().size();

        // Update the etiqueta
        Etiqueta updatedEtiqueta = etiquetaRepository.findOne(etiqueta.getId());
        // Disconnect from session so that the updates on updatedEtiqueta are not directly saved in db
        em.detach(updatedEtiqueta);
        updatedEtiqueta
            .nombre(UPDATED_NOMBRE)
            .disponible(UPDATED_DISPONIBLE);
        EtiquetaDTO etiquetaDTO = etiquetaMapper.toDto(updatedEtiqueta);

        restEtiquetaMockMvc.perform(put("/api/etiquetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etiquetaDTO)))
            .andExpect(status().isOk());

        // Validate the Etiqueta in the database
        List<Etiqueta> etiquetaList = etiquetaRepository.findAll();
        assertThat(etiquetaList).hasSize(databaseSizeBeforeUpdate);
        Etiqueta testEtiqueta = etiquetaList.get(etiquetaList.size() - 1);
        assertThat(testEtiqueta.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEtiqueta.isDisponible()).isEqualTo(UPDATED_DISPONIBLE);

        // Validate the Etiqueta in Elasticsearch
        Etiqueta etiquetaEs = etiquetaSearchRepository.findOne(testEtiqueta.getId());
        assertThat(etiquetaEs).isEqualToIgnoringGivenFields(testEtiqueta);
    }

    @Test
    @Transactional
    public void updateNonExistingEtiqueta() throws Exception {
        int databaseSizeBeforeUpdate = etiquetaRepository.findAll().size();

        // Create the Etiqueta
        EtiquetaDTO etiquetaDTO = etiquetaMapper.toDto(etiqueta);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEtiquetaMockMvc.perform(put("/api/etiquetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etiquetaDTO)))
            .andExpect(status().isCreated());

        // Validate the Etiqueta in the database
        List<Etiqueta> etiquetaList = etiquetaRepository.findAll();
        assertThat(etiquetaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEtiqueta() throws Exception {
        // Initialize the database
        etiquetaRepository.saveAndFlush(etiqueta);
        etiquetaSearchRepository.save(etiqueta);
        int databaseSizeBeforeDelete = etiquetaRepository.findAll().size();

        // Get the etiqueta
        restEtiquetaMockMvc.perform(delete("/api/etiquetas/{id}", etiqueta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean etiquetaExistsInEs = etiquetaSearchRepository.exists(etiqueta.getId());
        assertThat(etiquetaExistsInEs).isFalse();

        // Validate the database is empty
        List<Etiqueta> etiquetaList = etiquetaRepository.findAll();
        assertThat(etiquetaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchEtiqueta() throws Exception {
        // Initialize the database
        etiquetaRepository.saveAndFlush(etiqueta);
        etiquetaSearchRepository.save(etiqueta);

        // Search the etiqueta
        restEtiquetaMockMvc.perform(get("/api/_search/etiquetas?query=id:" + etiqueta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etiqueta.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].disponible").value(hasItem(DEFAULT_DISPONIBLE.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Etiqueta.class);
        Etiqueta etiqueta1 = new Etiqueta();
        etiqueta1.setId(1L);
        Etiqueta etiqueta2 = new Etiqueta();
        etiqueta2.setId(etiqueta1.getId());
        assertThat(etiqueta1).isEqualTo(etiqueta2);
        etiqueta2.setId(2L);
        assertThat(etiqueta1).isNotEqualTo(etiqueta2);
        etiqueta1.setId(null);
        assertThat(etiqueta1).isNotEqualTo(etiqueta2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EtiquetaDTO.class);
        EtiquetaDTO etiquetaDTO1 = new EtiquetaDTO();
        etiquetaDTO1.setId(1L);
        EtiquetaDTO etiquetaDTO2 = new EtiquetaDTO();
        assertThat(etiquetaDTO1).isNotEqualTo(etiquetaDTO2);
        etiquetaDTO2.setId(etiquetaDTO1.getId());
        assertThat(etiquetaDTO1).isEqualTo(etiquetaDTO2);
        etiquetaDTO2.setId(2L);
        assertThat(etiquetaDTO1).isNotEqualTo(etiquetaDTO2);
        etiquetaDTO1.setId(null);
        assertThat(etiquetaDTO1).isNotEqualTo(etiquetaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(etiquetaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(etiquetaMapper.fromId(null)).isNull();
    }
}
