package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.TipoContrato;
import com.radicalbytes.greenlife.repository.TipoContratoRepository;
import com.radicalbytes.greenlife.repository.search.TipoContratoSearchRepository;
import com.radicalbytes.greenlife.service.dto.TipoContratoDTO;
import com.radicalbytes.greenlife.service.mapper.TipoContratoMapper;
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
 * Test class for the TipoContratoResource REST controller.
 *
 * @see TipoContratoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class TipoContratoResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Double DEFAULT_COSTO = 1D;
    private static final Double UPDATED_COSTO = 2D;

    @Autowired
    private TipoContratoRepository tipoContratoRepository;

    @Autowired
    private TipoContratoMapper tipoContratoMapper;

    @Autowired
    private TipoContratoSearchRepository tipoContratoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTipoContratoMockMvc;

    private TipoContrato tipoContrato;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoContratoResource tipoContratoResource = new TipoContratoResource(tipoContratoRepository, tipoContratoMapper, tipoContratoSearchRepository);
        this.restTipoContratoMockMvc = MockMvcBuilders.standaloneSetup(tipoContratoResource)
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
    public static TipoContrato createEntity(EntityManager em) {
        TipoContrato tipoContrato = new TipoContrato()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION)
            .costo(DEFAULT_COSTO);
        return tipoContrato;
    }

    @Before
    public void initTest() {
        tipoContratoSearchRepository.deleteAll();
        tipoContrato = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoContrato() throws Exception {
        int databaseSizeBeforeCreate = tipoContratoRepository.findAll().size();

        // Create the TipoContrato
        TipoContratoDTO tipoContratoDTO = tipoContratoMapper.toDto(tipoContrato);
        restTipoContratoMockMvc.perform(post("/api/tipo-contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoContratoDTO)))
            .andExpect(status().isCreated());

        // Validate the TipoContrato in the database
        List<TipoContrato> tipoContratoList = tipoContratoRepository.findAll();
        assertThat(tipoContratoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoContrato testTipoContrato = tipoContratoList.get(tipoContratoList.size() - 1);
        assertThat(testTipoContrato.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testTipoContrato.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testTipoContrato.getCosto()).isEqualTo(DEFAULT_COSTO);

        // Validate the TipoContrato in Elasticsearch
        TipoContrato tipoContratoEs = tipoContratoSearchRepository.findOne(testTipoContrato.getId());
        assertThat(tipoContratoEs).isEqualToIgnoringGivenFields(testTipoContrato);
    }

    @Test
    @Transactional
    public void createTipoContratoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoContratoRepository.findAll().size();

        // Create the TipoContrato with an existing ID
        tipoContrato.setId(1L);
        TipoContratoDTO tipoContratoDTO = tipoContratoMapper.toDto(tipoContrato);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoContratoMockMvc.perform(post("/api/tipo-contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoContratoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoContrato in the database
        List<TipoContrato> tipoContratoList = tipoContratoRepository.findAll();
        assertThat(tipoContratoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoContratoRepository.findAll().size();
        // set the field null
        tipoContrato.setNombre(null);

        // Create the TipoContrato, which fails.
        TipoContratoDTO tipoContratoDTO = tipoContratoMapper.toDto(tipoContrato);

        restTipoContratoMockMvc.perform(post("/api/tipo-contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoContratoDTO)))
            .andExpect(status().isBadRequest());

        List<TipoContrato> tipoContratoList = tipoContratoRepository.findAll();
        assertThat(tipoContratoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoContratoRepository.findAll().size();
        // set the field null
        tipoContrato.setDescripcion(null);

        // Create the TipoContrato, which fails.
        TipoContratoDTO tipoContratoDTO = tipoContratoMapper.toDto(tipoContrato);

        restTipoContratoMockMvc.perform(post("/api/tipo-contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoContratoDTO)))
            .andExpect(status().isBadRequest());

        List<TipoContrato> tipoContratoList = tipoContratoRepository.findAll();
        assertThat(tipoContratoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCostoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoContratoRepository.findAll().size();
        // set the field null
        tipoContrato.setCosto(null);

        // Create the TipoContrato, which fails.
        TipoContratoDTO tipoContratoDTO = tipoContratoMapper.toDto(tipoContrato);

        restTipoContratoMockMvc.perform(post("/api/tipo-contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoContratoDTO)))
            .andExpect(status().isBadRequest());

        List<TipoContrato> tipoContratoList = tipoContratoRepository.findAll();
        assertThat(tipoContratoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoContratoes() throws Exception {
        // Initialize the database
        tipoContratoRepository.saveAndFlush(tipoContrato);

        // Get all the tipoContratoList
        restTipoContratoMockMvc.perform(get("/api/tipo-contratoes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoContrato.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].costo").value(hasItem(DEFAULT_COSTO.doubleValue())));
    }

    @Test
    @Transactional
    public void getTipoContrato() throws Exception {
        // Initialize the database
        tipoContratoRepository.saveAndFlush(tipoContrato);

        // Get the tipoContrato
        restTipoContratoMockMvc.perform(get("/api/tipo-contratoes/{id}", tipoContrato.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoContrato.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.costo").value(DEFAULT_COSTO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoContrato() throws Exception {
        // Get the tipoContrato
        restTipoContratoMockMvc.perform(get("/api/tipo-contratoes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoContrato() throws Exception {
        // Initialize the database
        tipoContratoRepository.saveAndFlush(tipoContrato);
        tipoContratoSearchRepository.save(tipoContrato);
        int databaseSizeBeforeUpdate = tipoContratoRepository.findAll().size();

        // Update the tipoContrato
        TipoContrato updatedTipoContrato = tipoContratoRepository.findOne(tipoContrato.getId());
        // Disconnect from session so that the updates on updatedTipoContrato are not directly saved in db
        em.detach(updatedTipoContrato);
        updatedTipoContrato
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .costo(UPDATED_COSTO);
        TipoContratoDTO tipoContratoDTO = tipoContratoMapper.toDto(updatedTipoContrato);

        restTipoContratoMockMvc.perform(put("/api/tipo-contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoContratoDTO)))
            .andExpect(status().isOk());

        // Validate the TipoContrato in the database
        List<TipoContrato> tipoContratoList = tipoContratoRepository.findAll();
        assertThat(tipoContratoList).hasSize(databaseSizeBeforeUpdate);
        TipoContrato testTipoContrato = tipoContratoList.get(tipoContratoList.size() - 1);
        assertThat(testTipoContrato.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testTipoContrato.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testTipoContrato.getCosto()).isEqualTo(UPDATED_COSTO);

        // Validate the TipoContrato in Elasticsearch
        TipoContrato tipoContratoEs = tipoContratoSearchRepository.findOne(testTipoContrato.getId());
        assertThat(tipoContratoEs).isEqualToIgnoringGivenFields(testTipoContrato);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoContrato() throws Exception {
        int databaseSizeBeforeUpdate = tipoContratoRepository.findAll().size();

        // Create the TipoContrato
        TipoContratoDTO tipoContratoDTO = tipoContratoMapper.toDto(tipoContrato);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTipoContratoMockMvc.perform(put("/api/tipo-contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoContratoDTO)))
            .andExpect(status().isCreated());

        // Validate the TipoContrato in the database
        List<TipoContrato> tipoContratoList = tipoContratoRepository.findAll();
        assertThat(tipoContratoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTipoContrato() throws Exception {
        // Initialize the database
        tipoContratoRepository.saveAndFlush(tipoContrato);
        tipoContratoSearchRepository.save(tipoContrato);
        int databaseSizeBeforeDelete = tipoContratoRepository.findAll().size();

        // Get the tipoContrato
        restTipoContratoMockMvc.perform(delete("/api/tipo-contratoes/{id}", tipoContrato.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean tipoContratoExistsInEs = tipoContratoSearchRepository.exists(tipoContrato.getId());
        assertThat(tipoContratoExistsInEs).isFalse();

        // Validate the database is empty
        List<TipoContrato> tipoContratoList = tipoContratoRepository.findAll();
        assertThat(tipoContratoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTipoContrato() throws Exception {
        // Initialize the database
        tipoContratoRepository.saveAndFlush(tipoContrato);
        tipoContratoSearchRepository.save(tipoContrato);

        // Search the tipoContrato
        restTipoContratoMockMvc.perform(get("/api/_search/tipo-contratoes?query=id:" + tipoContrato.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoContrato.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].costo").value(hasItem(DEFAULT_COSTO.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoContrato.class);
        TipoContrato tipoContrato1 = new TipoContrato();
        tipoContrato1.setId(1L);
        TipoContrato tipoContrato2 = new TipoContrato();
        tipoContrato2.setId(tipoContrato1.getId());
        assertThat(tipoContrato1).isEqualTo(tipoContrato2);
        tipoContrato2.setId(2L);
        assertThat(tipoContrato1).isNotEqualTo(tipoContrato2);
        tipoContrato1.setId(null);
        assertThat(tipoContrato1).isNotEqualTo(tipoContrato2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoContratoDTO.class);
        TipoContratoDTO tipoContratoDTO1 = new TipoContratoDTO();
        tipoContratoDTO1.setId(1L);
        TipoContratoDTO tipoContratoDTO2 = new TipoContratoDTO();
        assertThat(tipoContratoDTO1).isNotEqualTo(tipoContratoDTO2);
        tipoContratoDTO2.setId(tipoContratoDTO1.getId());
        assertThat(tipoContratoDTO1).isEqualTo(tipoContratoDTO2);
        tipoContratoDTO2.setId(2L);
        assertThat(tipoContratoDTO1).isNotEqualTo(tipoContratoDTO2);
        tipoContratoDTO1.setId(null);
        assertThat(tipoContratoDTO1).isNotEqualTo(tipoContratoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(tipoContratoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(tipoContratoMapper.fromId(null)).isNull();
    }
}
