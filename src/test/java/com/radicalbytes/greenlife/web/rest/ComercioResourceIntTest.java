package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.Comercio;
import com.radicalbytes.greenlife.repository.ComercioRepository;
import com.radicalbytes.greenlife.repository.search.ComercioSearchRepository;
import com.radicalbytes.greenlife.service.dto.ComercioDTO;
import com.radicalbytes.greenlife.service.mapper.ComercioMapper;
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

import com.radicalbytes.greenlife.domain.enumeration.TipoComercio;
/**
 * Test class for the ComercioResource REST controller.
 *
 * @see ComercioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class ComercioResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CED_JURIDICA = "AAAAAAAAAA";
    private static final String UPDATED_CED_JURIDICA = "BBBBBBBBBB";

    private static final String DEFAULT_RAZON_SOCIAL = "AAAAAAAAAA";
    private static final String UPDATED_RAZON_SOCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE_COMERCIAL = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_COMERCIAL = "BBBBBBBBBB";

    private static final TipoComercio DEFAULT_TIPO = TipoComercio.RESTAURANTE;
    private static final TipoComercio UPDATED_TIPO = TipoComercio.TIENDA;

    private static final String DEFAULT_LOGO_URL = "AAAAAAAAAA";
    private static final String UPDATED_LOGO_URL = "BBBBBBBBBB";

    @Autowired
    private ComercioRepository comercioRepository;

    @Autowired
    private ComercioMapper comercioMapper;

    @Autowired
    private ComercioSearchRepository comercioSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restComercioMockMvc;

    private Comercio comercio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComercioResource comercioResource = new ComercioResource(comercioRepository, comercioMapper, comercioSearchRepository);
        this.restComercioMockMvc = MockMvcBuilders.standaloneSetup(comercioResource)
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
    public static Comercio createEntity(EntityManager em) {
        Comercio comercio = new Comercio()
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .cedJuridica(DEFAULT_CED_JURIDICA)
            .razonSocial(DEFAULT_RAZON_SOCIAL)
            .nombreComercial(DEFAULT_NOMBRE_COMERCIAL)
            .tipo(DEFAULT_TIPO)
            .logoUrl(DEFAULT_LOGO_URL);
        return comercio;
    }

    @Before
    public void initTest() {
        comercioSearchRepository.deleteAll();
        comercio = createEntity(em);
    }

    @Test
    @Transactional
    public void createComercio() throws Exception {
        int databaseSizeBeforeCreate = comercioRepository.findAll().size();

        // Create the Comercio
        ComercioDTO comercioDTO = comercioMapper.toDto(comercio);
        restComercioMockMvc.perform(post("/api/comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comercioDTO)))
            .andExpect(status().isCreated());

        // Validate the Comercio in the database
        List<Comercio> comercioList = comercioRepository.findAll();
        assertThat(comercioList).hasSize(databaseSizeBeforeCreate + 1);
        Comercio testComercio = comercioList.get(comercioList.size() - 1);
        assertThat(testComercio.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testComercio.getCedJuridica()).isEqualTo(DEFAULT_CED_JURIDICA);
        assertThat(testComercio.getRazonSocial()).isEqualTo(DEFAULT_RAZON_SOCIAL);
        assertThat(testComercio.getNombreComercial()).isEqualTo(DEFAULT_NOMBRE_COMERCIAL);
        assertThat(testComercio.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testComercio.getLogoUrl()).isEqualTo(DEFAULT_LOGO_URL);

        // Validate the Comercio in Elasticsearch
        Comercio comercioEs = comercioSearchRepository.findOne(testComercio.getId());
        assertThat(comercioEs).isEqualToIgnoringGivenFields(testComercio);
    }

    @Test
    @Transactional
    public void createComercioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = comercioRepository.findAll().size();

        // Create the Comercio with an existing ID
        comercio.setId(1L);
        ComercioDTO comercioDTO = comercioMapper.toDto(comercio);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComercioMockMvc.perform(post("/api/comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comercioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Comercio in the database
        List<Comercio> comercioList = comercioRepository.findAll();
        assertThat(comercioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = comercioRepository.findAll().size();
        // set the field null
        comercio.setFechaCreacion(null);

        // Create the Comercio, which fails.
        ComercioDTO comercioDTO = comercioMapper.toDto(comercio);

        restComercioMockMvc.perform(post("/api/comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comercioDTO)))
            .andExpect(status().isBadRequest());

        List<Comercio> comercioList = comercioRepository.findAll();
        assertThat(comercioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCedJuridicaIsRequired() throws Exception {
        int databaseSizeBeforeTest = comercioRepository.findAll().size();
        // set the field null
        comercio.setCedJuridica(null);

        // Create the Comercio, which fails.
        ComercioDTO comercioDTO = comercioMapper.toDto(comercio);

        restComercioMockMvc.perform(post("/api/comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comercioDTO)))
            .andExpect(status().isBadRequest());

        List<Comercio> comercioList = comercioRepository.findAll();
        assertThat(comercioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRazonSocialIsRequired() throws Exception {
        int databaseSizeBeforeTest = comercioRepository.findAll().size();
        // set the field null
        comercio.setRazonSocial(null);

        // Create the Comercio, which fails.
        ComercioDTO comercioDTO = comercioMapper.toDto(comercio);

        restComercioMockMvc.perform(post("/api/comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comercioDTO)))
            .andExpect(status().isBadRequest());

        List<Comercio> comercioList = comercioRepository.findAll();
        assertThat(comercioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreComercialIsRequired() throws Exception {
        int databaseSizeBeforeTest = comercioRepository.findAll().size();
        // set the field null
        comercio.setNombreComercial(null);

        // Create the Comercio, which fails.
        ComercioDTO comercioDTO = comercioMapper.toDto(comercio);

        restComercioMockMvc.perform(post("/api/comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comercioDTO)))
            .andExpect(status().isBadRequest());

        List<Comercio> comercioList = comercioRepository.findAll();
        assertThat(comercioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllComercios() throws Exception {
        // Initialize the database
        comercioRepository.saveAndFlush(comercio);

        // Get all the comercioList
        restComercioMockMvc.perform(get("/api/comercios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(comercio.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].cedJuridica").value(hasItem(DEFAULT_CED_JURIDICA.toString())))
            .andExpect(jsonPath("$.[*].razonSocial").value(hasItem(DEFAULT_RAZON_SOCIAL.toString())))
            .andExpect(jsonPath("$.[*].nombreComercial").value(hasItem(DEFAULT_NOMBRE_COMERCIAL.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].logoUrl").value(hasItem(DEFAULT_LOGO_URL.toString())));
    }

    @Test
    @Transactional
    public void getComercio() throws Exception {
        // Initialize the database
        comercioRepository.saveAndFlush(comercio);

        // Get the comercio
        restComercioMockMvc.perform(get("/api/comercios/{id}", comercio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(comercio.getId().intValue()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.cedJuridica").value(DEFAULT_CED_JURIDICA.toString()))
            .andExpect(jsonPath("$.razonSocial").value(DEFAULT_RAZON_SOCIAL.toString()))
            .andExpect(jsonPath("$.nombreComercial").value(DEFAULT_NOMBRE_COMERCIAL.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.logoUrl").value(DEFAULT_LOGO_URL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingComercio() throws Exception {
        // Get the comercio
        restComercioMockMvc.perform(get("/api/comercios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComercio() throws Exception {
        // Initialize the database
        comercioRepository.saveAndFlush(comercio);
        comercioSearchRepository.save(comercio);
        int databaseSizeBeforeUpdate = comercioRepository.findAll().size();

        // Update the comercio
        Comercio updatedComercio = comercioRepository.findOne(comercio.getId());
        // Disconnect from session so that the updates on updatedComercio are not directly saved in db
        em.detach(updatedComercio);
        updatedComercio
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .cedJuridica(UPDATED_CED_JURIDICA)
            .razonSocial(UPDATED_RAZON_SOCIAL)
            .nombreComercial(UPDATED_NOMBRE_COMERCIAL)
            .tipo(UPDATED_TIPO)
            .logoUrl(UPDATED_LOGO_URL);
        ComercioDTO comercioDTO = comercioMapper.toDto(updatedComercio);

        restComercioMockMvc.perform(put("/api/comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comercioDTO)))
            .andExpect(status().isOk());

        // Validate the Comercio in the database
        List<Comercio> comercioList = comercioRepository.findAll();
        assertThat(comercioList).hasSize(databaseSizeBeforeUpdate);
        Comercio testComercio = comercioList.get(comercioList.size() - 1);
        assertThat(testComercio.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testComercio.getCedJuridica()).isEqualTo(UPDATED_CED_JURIDICA);
        assertThat(testComercio.getRazonSocial()).isEqualTo(UPDATED_RAZON_SOCIAL);
        assertThat(testComercio.getNombreComercial()).isEqualTo(UPDATED_NOMBRE_COMERCIAL);
        assertThat(testComercio.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testComercio.getLogoUrl()).isEqualTo(UPDATED_LOGO_URL);

        // Validate the Comercio in Elasticsearch
        Comercio comercioEs = comercioSearchRepository.findOne(testComercio.getId());
        assertThat(comercioEs).isEqualToIgnoringGivenFields(testComercio);
    }

    @Test
    @Transactional
    public void updateNonExistingComercio() throws Exception {
        int databaseSizeBeforeUpdate = comercioRepository.findAll().size();

        // Create the Comercio
        ComercioDTO comercioDTO = comercioMapper.toDto(comercio);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restComercioMockMvc.perform(put("/api/comercios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comercioDTO)))
            .andExpect(status().isCreated());

        // Validate the Comercio in the database
        List<Comercio> comercioList = comercioRepository.findAll();
        assertThat(comercioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteComercio() throws Exception {
        // Initialize the database
        comercioRepository.saveAndFlush(comercio);
        comercioSearchRepository.save(comercio);
        int databaseSizeBeforeDelete = comercioRepository.findAll().size();

        // Get the comercio
        restComercioMockMvc.perform(delete("/api/comercios/{id}", comercio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean comercioExistsInEs = comercioSearchRepository.exists(comercio.getId());
        assertThat(comercioExistsInEs).isFalse();

        // Validate the database is empty
        List<Comercio> comercioList = comercioRepository.findAll();
        assertThat(comercioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchComercio() throws Exception {
        // Initialize the database
        comercioRepository.saveAndFlush(comercio);
        comercioSearchRepository.save(comercio);

        // Search the comercio
        restComercioMockMvc.perform(get("/api/_search/comercios?query=id:" + comercio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(comercio.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].cedJuridica").value(hasItem(DEFAULT_CED_JURIDICA.toString())))
            .andExpect(jsonPath("$.[*].razonSocial").value(hasItem(DEFAULT_RAZON_SOCIAL.toString())))
            .andExpect(jsonPath("$.[*].nombreComercial").value(hasItem(DEFAULT_NOMBRE_COMERCIAL.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].logoUrl").value(hasItem(DEFAULT_LOGO_URL.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Comercio.class);
        Comercio comercio1 = new Comercio();
        comercio1.setId(1L);
        Comercio comercio2 = new Comercio();
        comercio2.setId(comercio1.getId());
        assertThat(comercio1).isEqualTo(comercio2);
        comercio2.setId(2L);
        assertThat(comercio1).isNotEqualTo(comercio2);
        comercio1.setId(null);
        assertThat(comercio1).isNotEqualTo(comercio2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComercioDTO.class);
        ComercioDTO comercioDTO1 = new ComercioDTO();
        comercioDTO1.setId(1L);
        ComercioDTO comercioDTO2 = new ComercioDTO();
        assertThat(comercioDTO1).isNotEqualTo(comercioDTO2);
        comercioDTO2.setId(comercioDTO1.getId());
        assertThat(comercioDTO1).isEqualTo(comercioDTO2);
        comercioDTO2.setId(2L);
        assertThat(comercioDTO1).isNotEqualTo(comercioDTO2);
        comercioDTO1.setId(null);
        assertThat(comercioDTO1).isNotEqualTo(comercioDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(comercioMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(comercioMapper.fromId(null)).isNull();
    }
}
