package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.Patrocinador;
import com.radicalbytes.greenlife.repository.PatrocinadorRepository;
import com.radicalbytes.greenlife.repository.search.PatrocinadorSearchRepository;
import com.radicalbytes.greenlife.service.dto.PatrocinadorDTO;
import com.radicalbytes.greenlife.service.mapper.PatrocinadorMapper;
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
 * Test class for the PatrocinadorResource REST controller.
 *
 * @see PatrocinadorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class PatrocinadorResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_CED_JURIDICA = "AAAAAAAAAA";
    private static final String UPDATED_CED_JURIDICA = "BBBBBBBBBB";

    private static final String DEFAULT_CORREO = "AAAAAAAAAA";
    private static final String UPDATED_CORREO = "BBBBBBBBBB";

    @Autowired
    private PatrocinadorRepository patrocinadorRepository;

    @Autowired
    private PatrocinadorMapper patrocinadorMapper;

    @Autowired
    private PatrocinadorSearchRepository patrocinadorSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPatrocinadorMockMvc;

    private Patrocinador patrocinador;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PatrocinadorResource patrocinadorResource = new PatrocinadorResource(patrocinadorRepository, patrocinadorMapper, patrocinadorSearchRepository);
        this.restPatrocinadorMockMvc = MockMvcBuilders.standaloneSetup(patrocinadorResource)
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
    public static Patrocinador createEntity(EntityManager em) {
        Patrocinador patrocinador = new Patrocinador()
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .nombre(DEFAULT_NOMBRE)
            .cedJuridica(DEFAULT_CED_JURIDICA)
            .correo(DEFAULT_CORREO);
        return patrocinador;
    }

    @Before
    public void initTest() {
        patrocinadorSearchRepository.deleteAll();
        patrocinador = createEntity(em);
    }

    @Test
    @Transactional
    public void createPatrocinador() throws Exception {
        int databaseSizeBeforeCreate = patrocinadorRepository.findAll().size();

        // Create the Patrocinador
        PatrocinadorDTO patrocinadorDTO = patrocinadorMapper.toDto(patrocinador);
        restPatrocinadorMockMvc.perform(post("/api/patrocinadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patrocinadorDTO)))
            .andExpect(status().isCreated());

        // Validate the Patrocinador in the database
        List<Patrocinador> patrocinadorList = patrocinadorRepository.findAll();
        assertThat(patrocinadorList).hasSize(databaseSizeBeforeCreate + 1);
        Patrocinador testPatrocinador = patrocinadorList.get(patrocinadorList.size() - 1);
        assertThat(testPatrocinador.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testPatrocinador.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPatrocinador.getCedJuridica()).isEqualTo(DEFAULT_CED_JURIDICA);
        assertThat(testPatrocinador.getCorreo()).isEqualTo(DEFAULT_CORREO);

        // Validate the Patrocinador in Elasticsearch
        Patrocinador patrocinadorEs = patrocinadorSearchRepository.findOne(testPatrocinador.getId());
        assertThat(patrocinadorEs).isEqualToIgnoringGivenFields(testPatrocinador);
    }

    @Test
    @Transactional
    public void createPatrocinadorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = patrocinadorRepository.findAll().size();

        // Create the Patrocinador with an existing ID
        patrocinador.setId(1L);
        PatrocinadorDTO patrocinadorDTO = patrocinadorMapper.toDto(patrocinador);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPatrocinadorMockMvc.perform(post("/api/patrocinadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patrocinadorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Patrocinador in the database
        List<Patrocinador> patrocinadorList = patrocinadorRepository.findAll();
        assertThat(patrocinadorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = patrocinadorRepository.findAll().size();
        // set the field null
        patrocinador.setFechaCreacion(null);

        // Create the Patrocinador, which fails.
        PatrocinadorDTO patrocinadorDTO = patrocinadorMapper.toDto(patrocinador);

        restPatrocinadorMockMvc.perform(post("/api/patrocinadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patrocinadorDTO)))
            .andExpect(status().isBadRequest());

        List<Patrocinador> patrocinadorList = patrocinadorRepository.findAll();
        assertThat(patrocinadorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = patrocinadorRepository.findAll().size();
        // set the field null
        patrocinador.setNombre(null);

        // Create the Patrocinador, which fails.
        PatrocinadorDTO patrocinadorDTO = patrocinadorMapper.toDto(patrocinador);

        restPatrocinadorMockMvc.perform(post("/api/patrocinadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patrocinadorDTO)))
            .andExpect(status().isBadRequest());

        List<Patrocinador> patrocinadorList = patrocinadorRepository.findAll();
        assertThat(patrocinadorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCedJuridicaIsRequired() throws Exception {
        int databaseSizeBeforeTest = patrocinadorRepository.findAll().size();
        // set the field null
        patrocinador.setCedJuridica(null);

        // Create the Patrocinador, which fails.
        PatrocinadorDTO patrocinadorDTO = patrocinadorMapper.toDto(patrocinador);

        restPatrocinadorMockMvc.perform(post("/api/patrocinadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patrocinadorDTO)))
            .andExpect(status().isBadRequest());

        List<Patrocinador> patrocinadorList = patrocinadorRepository.findAll();
        assertThat(patrocinadorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCorreoIsRequired() throws Exception {
        int databaseSizeBeforeTest = patrocinadorRepository.findAll().size();
        // set the field null
        patrocinador.setCorreo(null);

        // Create the Patrocinador, which fails.
        PatrocinadorDTO patrocinadorDTO = patrocinadorMapper.toDto(patrocinador);

        restPatrocinadorMockMvc.perform(post("/api/patrocinadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patrocinadorDTO)))
            .andExpect(status().isBadRequest());

        List<Patrocinador> patrocinadorList = patrocinadorRepository.findAll();
        assertThat(patrocinadorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPatrocinadors() throws Exception {
        // Initialize the database
        patrocinadorRepository.saveAndFlush(patrocinador);

        // Get all the patrocinadorList
        restPatrocinadorMockMvc.perform(get("/api/patrocinadors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(patrocinador.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].cedJuridica").value(hasItem(DEFAULT_CED_JURIDICA.toString())))
            .andExpect(jsonPath("$.[*].correo").value(hasItem(DEFAULT_CORREO.toString())));
    }

    @Test
    @Transactional
    public void getPatrocinador() throws Exception {
        // Initialize the database
        patrocinadorRepository.saveAndFlush(patrocinador);

        // Get the patrocinador
        restPatrocinadorMockMvc.perform(get("/api/patrocinadors/{id}", patrocinador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(patrocinador.getId().intValue()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.cedJuridica").value(DEFAULT_CED_JURIDICA.toString()))
            .andExpect(jsonPath("$.correo").value(DEFAULT_CORREO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPatrocinador() throws Exception {
        // Get the patrocinador
        restPatrocinadorMockMvc.perform(get("/api/patrocinadors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePatrocinador() throws Exception {
        // Initialize the database
        patrocinadorRepository.saveAndFlush(patrocinador);
        patrocinadorSearchRepository.save(patrocinador);
        int databaseSizeBeforeUpdate = patrocinadorRepository.findAll().size();

        // Update the patrocinador
        Patrocinador updatedPatrocinador = patrocinadorRepository.findOne(patrocinador.getId());
        // Disconnect from session so that the updates on updatedPatrocinador are not directly saved in db
        em.detach(updatedPatrocinador);
        updatedPatrocinador
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .nombre(UPDATED_NOMBRE)
            .cedJuridica(UPDATED_CED_JURIDICA)
            .correo(UPDATED_CORREO);
        PatrocinadorDTO patrocinadorDTO = patrocinadorMapper.toDto(updatedPatrocinador);

        restPatrocinadorMockMvc.perform(put("/api/patrocinadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patrocinadorDTO)))
            .andExpect(status().isOk());

        // Validate the Patrocinador in the database
        List<Patrocinador> patrocinadorList = patrocinadorRepository.findAll();
        assertThat(patrocinadorList).hasSize(databaseSizeBeforeUpdate);
        Patrocinador testPatrocinador = patrocinadorList.get(patrocinadorList.size() - 1);
        assertThat(testPatrocinador.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testPatrocinador.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPatrocinador.getCedJuridica()).isEqualTo(UPDATED_CED_JURIDICA);
        assertThat(testPatrocinador.getCorreo()).isEqualTo(UPDATED_CORREO);

        // Validate the Patrocinador in Elasticsearch
        Patrocinador patrocinadorEs = patrocinadorSearchRepository.findOne(testPatrocinador.getId());
        assertThat(patrocinadorEs).isEqualToIgnoringGivenFields(testPatrocinador);
    }

    @Test
    @Transactional
    public void updateNonExistingPatrocinador() throws Exception {
        int databaseSizeBeforeUpdate = patrocinadorRepository.findAll().size();

        // Create the Patrocinador
        PatrocinadorDTO patrocinadorDTO = patrocinadorMapper.toDto(patrocinador);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPatrocinadorMockMvc.perform(put("/api/patrocinadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patrocinadorDTO)))
            .andExpect(status().isCreated());

        // Validate the Patrocinador in the database
        List<Patrocinador> patrocinadorList = patrocinadorRepository.findAll();
        assertThat(patrocinadorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePatrocinador() throws Exception {
        // Initialize the database
        patrocinadorRepository.saveAndFlush(patrocinador);
        patrocinadorSearchRepository.save(patrocinador);
        int databaseSizeBeforeDelete = patrocinadorRepository.findAll().size();

        // Get the patrocinador
        restPatrocinadorMockMvc.perform(delete("/api/patrocinadors/{id}", patrocinador.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean patrocinadorExistsInEs = patrocinadorSearchRepository.exists(patrocinador.getId());
        assertThat(patrocinadorExistsInEs).isFalse();

        // Validate the database is empty
        List<Patrocinador> patrocinadorList = patrocinadorRepository.findAll();
        assertThat(patrocinadorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPatrocinador() throws Exception {
        // Initialize the database
        patrocinadorRepository.saveAndFlush(patrocinador);
        patrocinadorSearchRepository.save(patrocinador);

        // Search the patrocinador
        restPatrocinadorMockMvc.perform(get("/api/_search/patrocinadors?query=id:" + patrocinador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(patrocinador.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].cedJuridica").value(hasItem(DEFAULT_CED_JURIDICA.toString())))
            .andExpect(jsonPath("$.[*].correo").value(hasItem(DEFAULT_CORREO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Patrocinador.class);
        Patrocinador patrocinador1 = new Patrocinador();
        patrocinador1.setId(1L);
        Patrocinador patrocinador2 = new Patrocinador();
        patrocinador2.setId(patrocinador1.getId());
        assertThat(patrocinador1).isEqualTo(patrocinador2);
        patrocinador2.setId(2L);
        assertThat(patrocinador1).isNotEqualTo(patrocinador2);
        patrocinador1.setId(null);
        assertThat(patrocinador1).isNotEqualTo(patrocinador2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PatrocinadorDTO.class);
        PatrocinadorDTO patrocinadorDTO1 = new PatrocinadorDTO();
        patrocinadorDTO1.setId(1L);
        PatrocinadorDTO patrocinadorDTO2 = new PatrocinadorDTO();
        assertThat(patrocinadorDTO1).isNotEqualTo(patrocinadorDTO2);
        patrocinadorDTO2.setId(patrocinadorDTO1.getId());
        assertThat(patrocinadorDTO1).isEqualTo(patrocinadorDTO2);
        patrocinadorDTO2.setId(2L);
        assertThat(patrocinadorDTO1).isNotEqualTo(patrocinadorDTO2);
        patrocinadorDTO1.setId(null);
        assertThat(patrocinadorDTO1).isNotEqualTo(patrocinadorDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(patrocinadorMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(patrocinadorMapper.fromId(null)).isNull();
    }
}
