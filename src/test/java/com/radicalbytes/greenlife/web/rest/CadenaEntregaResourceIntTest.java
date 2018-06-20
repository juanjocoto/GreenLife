package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.CadenaEntrega;
import com.radicalbytes.greenlife.repository.CadenaEntregaRepository;
import com.radicalbytes.greenlife.repository.search.CadenaEntregaSearchRepository;
import com.radicalbytes.greenlife.service.dto.CadenaEntregaDTO;
import com.radicalbytes.greenlife.service.mapper.CadenaEntregaMapper;
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

import com.radicalbytes.greenlife.domain.enumeration.EstadoCadena;
/**
 * Test class for the CadenaEntregaResource REST controller.
 *
 * @see CadenaEntregaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class CadenaEntregaResourceIntTest {

    private static final String DEFAULT_INFO = "AAAAAAAAAA";
    private static final String UPDATED_INFO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    private static final EstadoCadena DEFAULT_ESTADO = EstadoCadena.PREPARACION;
    private static final EstadoCadena UPDATED_ESTADO = EstadoCadena.EN_CAMINO;

    @Autowired
    private CadenaEntregaRepository cadenaEntregaRepository;

    @Autowired
    private CadenaEntregaMapper cadenaEntregaMapper;

    @Autowired
    private CadenaEntregaSearchRepository cadenaEntregaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCadenaEntregaMockMvc;

    private CadenaEntrega cadenaEntrega;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CadenaEntregaResource cadenaEntregaResource = new CadenaEntregaResource(cadenaEntregaRepository, cadenaEntregaMapper, cadenaEntregaSearchRepository);
        this.restCadenaEntregaMockMvc = MockMvcBuilders.standaloneSetup(cadenaEntregaResource)
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
    public static CadenaEntrega createEntity(EntityManager em) {
        CadenaEntrega cadenaEntrega = new CadenaEntrega()
            .info(DEFAULT_INFO)
            .fecha(DEFAULT_FECHA)
            .estado(DEFAULT_ESTADO);
        return cadenaEntrega;
    }

    @Before
    public void initTest() {
        cadenaEntregaSearchRepository.deleteAll();
        cadenaEntrega = createEntity(em);
    }

    @Test
    @Transactional
    public void createCadenaEntrega() throws Exception {
        int databaseSizeBeforeCreate = cadenaEntregaRepository.findAll().size();

        // Create the CadenaEntrega
        CadenaEntregaDTO cadenaEntregaDTO = cadenaEntregaMapper.toDto(cadenaEntrega);
        restCadenaEntregaMockMvc.perform(post("/api/cadena-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cadenaEntregaDTO)))
            .andExpect(status().isCreated());

        // Validate the CadenaEntrega in the database
        List<CadenaEntrega> cadenaEntregaList = cadenaEntregaRepository.findAll();
        assertThat(cadenaEntregaList).hasSize(databaseSizeBeforeCreate + 1);
        CadenaEntrega testCadenaEntrega = cadenaEntregaList.get(cadenaEntregaList.size() - 1);
        assertThat(testCadenaEntrega.getInfo()).isEqualTo(DEFAULT_INFO);
        assertThat(testCadenaEntrega.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testCadenaEntrega.getEstado()).isEqualTo(DEFAULT_ESTADO);

        // Validate the CadenaEntrega in Elasticsearch
        CadenaEntrega cadenaEntregaEs = cadenaEntregaSearchRepository.findOne(testCadenaEntrega.getId());
        assertThat(cadenaEntregaEs).isEqualToIgnoringGivenFields(testCadenaEntrega);
    }

    @Test
    @Transactional
    public void createCadenaEntregaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cadenaEntregaRepository.findAll().size();

        // Create the CadenaEntrega with an existing ID
        cadenaEntrega.setId(1L);
        CadenaEntregaDTO cadenaEntregaDTO = cadenaEntregaMapper.toDto(cadenaEntrega);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCadenaEntregaMockMvc.perform(post("/api/cadena-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cadenaEntregaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CadenaEntrega in the database
        List<CadenaEntrega> cadenaEntregaList = cadenaEntregaRepository.findAll();
        assertThat(cadenaEntregaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkInfoIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadenaEntregaRepository.findAll().size();
        // set the field null
        cadenaEntrega.setInfo(null);

        // Create the CadenaEntrega, which fails.
        CadenaEntregaDTO cadenaEntregaDTO = cadenaEntregaMapper.toDto(cadenaEntrega);

        restCadenaEntregaMockMvc.perform(post("/api/cadena-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cadenaEntregaDTO)))
            .andExpect(status().isBadRequest());

        List<CadenaEntrega> cadenaEntregaList = cadenaEntregaRepository.findAll();
        assertThat(cadenaEntregaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadenaEntregaRepository.findAll().size();
        // set the field null
        cadenaEntrega.setFecha(null);

        // Create the CadenaEntrega, which fails.
        CadenaEntregaDTO cadenaEntregaDTO = cadenaEntregaMapper.toDto(cadenaEntrega);

        restCadenaEntregaMockMvc.perform(post("/api/cadena-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cadenaEntregaDTO)))
            .andExpect(status().isBadRequest());

        List<CadenaEntrega> cadenaEntregaList = cadenaEntregaRepository.findAll();
        assertThat(cadenaEntregaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCadenaEntregas() throws Exception {
        // Initialize the database
        cadenaEntregaRepository.saveAndFlush(cadenaEntrega);

        // Get all the cadenaEntregaList
        restCadenaEntregaMockMvc.perform(get("/api/cadena-entregas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cadenaEntrega.getId().intValue())))
            .andExpect(jsonPath("$.[*].info").value(hasItem(DEFAULT_INFO.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())));
    }

    @Test
    @Transactional
    public void getCadenaEntrega() throws Exception {
        // Initialize the database
        cadenaEntregaRepository.saveAndFlush(cadenaEntrega);

        // Get the cadenaEntrega
        restCadenaEntregaMockMvc.perform(get("/api/cadena-entregas/{id}", cadenaEntrega.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cadenaEntrega.getId().intValue()))
            .andExpect(jsonPath("$.info").value(DEFAULT_INFO.toString()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCadenaEntrega() throws Exception {
        // Get the cadenaEntrega
        restCadenaEntregaMockMvc.perform(get("/api/cadena-entregas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCadenaEntrega() throws Exception {
        // Initialize the database
        cadenaEntregaRepository.saveAndFlush(cadenaEntrega);
        cadenaEntregaSearchRepository.save(cadenaEntrega);
        int databaseSizeBeforeUpdate = cadenaEntregaRepository.findAll().size();

        // Update the cadenaEntrega
        CadenaEntrega updatedCadenaEntrega = cadenaEntregaRepository.findOne(cadenaEntrega.getId());
        // Disconnect from session so that the updates on updatedCadenaEntrega are not directly saved in db
        em.detach(updatedCadenaEntrega);
        updatedCadenaEntrega
            .info(UPDATED_INFO)
            .fecha(UPDATED_FECHA)
            .estado(UPDATED_ESTADO);
        CadenaEntregaDTO cadenaEntregaDTO = cadenaEntregaMapper.toDto(updatedCadenaEntrega);

        restCadenaEntregaMockMvc.perform(put("/api/cadena-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cadenaEntregaDTO)))
            .andExpect(status().isOk());

        // Validate the CadenaEntrega in the database
        List<CadenaEntrega> cadenaEntregaList = cadenaEntregaRepository.findAll();
        assertThat(cadenaEntregaList).hasSize(databaseSizeBeforeUpdate);
        CadenaEntrega testCadenaEntrega = cadenaEntregaList.get(cadenaEntregaList.size() - 1);
        assertThat(testCadenaEntrega.getInfo()).isEqualTo(UPDATED_INFO);
        assertThat(testCadenaEntrega.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testCadenaEntrega.getEstado()).isEqualTo(UPDATED_ESTADO);

        // Validate the CadenaEntrega in Elasticsearch
        CadenaEntrega cadenaEntregaEs = cadenaEntregaSearchRepository.findOne(testCadenaEntrega.getId());
        assertThat(cadenaEntregaEs).isEqualToIgnoringGivenFields(testCadenaEntrega);
    }

    @Test
    @Transactional
    public void updateNonExistingCadenaEntrega() throws Exception {
        int databaseSizeBeforeUpdate = cadenaEntregaRepository.findAll().size();

        // Create the CadenaEntrega
        CadenaEntregaDTO cadenaEntregaDTO = cadenaEntregaMapper.toDto(cadenaEntrega);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCadenaEntregaMockMvc.perform(put("/api/cadena-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cadenaEntregaDTO)))
            .andExpect(status().isCreated());

        // Validate the CadenaEntrega in the database
        List<CadenaEntrega> cadenaEntregaList = cadenaEntregaRepository.findAll();
        assertThat(cadenaEntregaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCadenaEntrega() throws Exception {
        // Initialize the database
        cadenaEntregaRepository.saveAndFlush(cadenaEntrega);
        cadenaEntregaSearchRepository.save(cadenaEntrega);
        int databaseSizeBeforeDelete = cadenaEntregaRepository.findAll().size();

        // Get the cadenaEntrega
        restCadenaEntregaMockMvc.perform(delete("/api/cadena-entregas/{id}", cadenaEntrega.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean cadenaEntregaExistsInEs = cadenaEntregaSearchRepository.exists(cadenaEntrega.getId());
        assertThat(cadenaEntregaExistsInEs).isFalse();

        // Validate the database is empty
        List<CadenaEntrega> cadenaEntregaList = cadenaEntregaRepository.findAll();
        assertThat(cadenaEntregaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCadenaEntrega() throws Exception {
        // Initialize the database
        cadenaEntregaRepository.saveAndFlush(cadenaEntrega);
        cadenaEntregaSearchRepository.save(cadenaEntrega);

        // Search the cadenaEntrega
        restCadenaEntregaMockMvc.perform(get("/api/_search/cadena-entregas?query=id:" + cadenaEntrega.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cadenaEntrega.getId().intValue())))
            .andExpect(jsonPath("$.[*].info").value(hasItem(DEFAULT_INFO.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CadenaEntrega.class);
        CadenaEntrega cadenaEntrega1 = new CadenaEntrega();
        cadenaEntrega1.setId(1L);
        CadenaEntrega cadenaEntrega2 = new CadenaEntrega();
        cadenaEntrega2.setId(cadenaEntrega1.getId());
        assertThat(cadenaEntrega1).isEqualTo(cadenaEntrega2);
        cadenaEntrega2.setId(2L);
        assertThat(cadenaEntrega1).isNotEqualTo(cadenaEntrega2);
        cadenaEntrega1.setId(null);
        assertThat(cadenaEntrega1).isNotEqualTo(cadenaEntrega2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CadenaEntregaDTO.class);
        CadenaEntregaDTO cadenaEntregaDTO1 = new CadenaEntregaDTO();
        cadenaEntregaDTO1.setId(1L);
        CadenaEntregaDTO cadenaEntregaDTO2 = new CadenaEntregaDTO();
        assertThat(cadenaEntregaDTO1).isNotEqualTo(cadenaEntregaDTO2);
        cadenaEntregaDTO2.setId(cadenaEntregaDTO1.getId());
        assertThat(cadenaEntregaDTO1).isEqualTo(cadenaEntregaDTO2);
        cadenaEntregaDTO2.setId(2L);
        assertThat(cadenaEntregaDTO1).isNotEqualTo(cadenaEntregaDTO2);
        cadenaEntregaDTO1.setId(null);
        assertThat(cadenaEntregaDTO1).isNotEqualTo(cadenaEntregaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cadenaEntregaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cadenaEntregaMapper.fromId(null)).isNull();
    }
}
