package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.Configuracion;
import com.radicalbytes.greenlife.repository.ConfiguracionRepository;
import com.radicalbytes.greenlife.repository.search.ConfiguracionSearchRepository;
import com.radicalbytes.greenlife.service.dto.ConfiguracionDTO;
import com.radicalbytes.greenlife.service.mapper.ConfiguracionMapper;
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
 * Test class for the ConfiguracionResource REST controller.
 *
 * @see ConfiguracionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class ConfiguracionResourceIntTest {

    private static final Integer DEFAULT_CALIFICACION_MINIMA = 1;
    private static final Integer UPDATED_CALIFICACION_MINIMA = 2;

    private static final Integer DEFAULT_CALIFICACION_MAXIMA = 1;
    private static final Integer UPDATED_CALIFICACION_MAXIMA = 2;

    private static final String DEFAULT_NOMBRE_APLICACION = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_APLICACION = "BBBBBBBBBB";

    private static final String DEFAULT_RAZON_SOCIAL = "AAAAAAAAAA";
    private static final String UPDATED_RAZON_SOCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_CED_JURIDICA = "AAAAAAAAAA";
    private static final String UPDATED_CED_JURIDICA = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final Double DEFAULT_LATITUD = 1D;
    private static final Double UPDATED_LATITUD = 2D;

    private static final Double DEFAULT_LONGITUD = 1D;
    private static final Double UPDATED_LONGITUD = 2D;

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_URL_LOGO = "AAAAAAAAAA";
    private static final String UPDATED_URL_LOGO = "BBBBBBBBBB";

    @Autowired
    private ConfiguracionRepository configuracionRepository;

    @Autowired
    private ConfiguracionMapper configuracionMapper;

    @Autowired
    private ConfiguracionSearchRepository configuracionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConfiguracionMockMvc;

    private Configuracion configuracion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConfiguracionResource configuracionResource = new ConfiguracionResource(configuracionRepository, configuracionMapper, configuracionSearchRepository);
        this.restConfiguracionMockMvc = MockMvcBuilders.standaloneSetup(configuracionResource)
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
    public static Configuracion createEntity(EntityManager em) {
        Configuracion configuracion = new Configuracion()
            .calificacionMinima(DEFAULT_CALIFICACION_MINIMA)
            .calificacionMaxima(DEFAULT_CALIFICACION_MAXIMA)
            .nombreAplicacion(DEFAULT_NOMBRE_APLICACION)
            .razonSocial(DEFAULT_RAZON_SOCIAL)
            .cedJuridica(DEFAULT_CED_JURIDICA)
            .direccion(DEFAULT_DIRECCION)
            .latitud(DEFAULT_LATITUD)
            .longitud(DEFAULT_LONGITUD)
            .telefono(DEFAULT_TELEFONO)
            .urlLogo(DEFAULT_URL_LOGO);
        return configuracion;
    }

    @Before
    public void initTest() {
        configuracionSearchRepository.deleteAll();
        configuracion = createEntity(em);
    }

    @Test
    @Transactional
    public void createConfiguracion() throws Exception {
        int databaseSizeBeforeCreate = configuracionRepository.findAll().size();

        // Create the Configuracion
        ConfiguracionDTO configuracionDTO = configuracionMapper.toDto(configuracion);
        restConfiguracionMockMvc.perform(post("/api/configuracions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configuracionDTO)))
            .andExpect(status().isCreated());

        // Validate the Configuracion in the database
        List<Configuracion> configuracionList = configuracionRepository.findAll();
        assertThat(configuracionList).hasSize(databaseSizeBeforeCreate + 1);
        Configuracion testConfiguracion = configuracionList.get(configuracionList.size() - 1);
        assertThat(testConfiguracion.getCalificacionMinima()).isEqualTo(DEFAULT_CALIFICACION_MINIMA);
        assertThat(testConfiguracion.getCalificacionMaxima()).isEqualTo(DEFAULT_CALIFICACION_MAXIMA);
        assertThat(testConfiguracion.getNombreAplicacion()).isEqualTo(DEFAULT_NOMBRE_APLICACION);
        assertThat(testConfiguracion.getRazonSocial()).isEqualTo(DEFAULT_RAZON_SOCIAL);
        assertThat(testConfiguracion.getCedJuridica()).isEqualTo(DEFAULT_CED_JURIDICA);
        assertThat(testConfiguracion.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testConfiguracion.getLatitud()).isEqualTo(DEFAULT_LATITUD);
        assertThat(testConfiguracion.getLongitud()).isEqualTo(DEFAULT_LONGITUD);
        assertThat(testConfiguracion.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testConfiguracion.getUrlLogo()).isEqualTo(DEFAULT_URL_LOGO);

        // Validate the Configuracion in Elasticsearch
        Configuracion configuracionEs = configuracionSearchRepository.findOne(testConfiguracion.getId());
        assertThat(configuracionEs).isEqualToIgnoringGivenFields(testConfiguracion);
    }

    @Test
    @Transactional
    public void createConfiguracionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = configuracionRepository.findAll().size();

        // Create the Configuracion with an existing ID
        configuracion.setId(1L);
        ConfiguracionDTO configuracionDTO = configuracionMapper.toDto(configuracion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConfiguracionMockMvc.perform(post("/api/configuracions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configuracionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Configuracion in the database
        List<Configuracion> configuracionList = configuracionRepository.findAll();
        assertThat(configuracionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCalificacionMinimaIsRequired() throws Exception {
        int databaseSizeBeforeTest = configuracionRepository.findAll().size();
        // set the field null
        configuracion.setCalificacionMinima(null);

        // Create the Configuracion, which fails.
        ConfiguracionDTO configuracionDTO = configuracionMapper.toDto(configuracion);

        restConfiguracionMockMvc.perform(post("/api/configuracions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configuracionDTO)))
            .andExpect(status().isBadRequest());

        List<Configuracion> configuracionList = configuracionRepository.findAll();
        assertThat(configuracionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCalificacionMaximaIsRequired() throws Exception {
        int databaseSizeBeforeTest = configuracionRepository.findAll().size();
        // set the field null
        configuracion.setCalificacionMaxima(null);

        // Create the Configuracion, which fails.
        ConfiguracionDTO configuracionDTO = configuracionMapper.toDto(configuracion);

        restConfiguracionMockMvc.perform(post("/api/configuracions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configuracionDTO)))
            .andExpect(status().isBadRequest());

        List<Configuracion> configuracionList = configuracionRepository.findAll();
        assertThat(configuracionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreAplicacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = configuracionRepository.findAll().size();
        // set the field null
        configuracion.setNombreAplicacion(null);

        // Create the Configuracion, which fails.
        ConfiguracionDTO configuracionDTO = configuracionMapper.toDto(configuracion);

        restConfiguracionMockMvc.perform(post("/api/configuracions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configuracionDTO)))
            .andExpect(status().isBadRequest());

        List<Configuracion> configuracionList = configuracionRepository.findAll();
        assertThat(configuracionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRazonSocialIsRequired() throws Exception {
        int databaseSizeBeforeTest = configuracionRepository.findAll().size();
        // set the field null
        configuracion.setRazonSocial(null);

        // Create the Configuracion, which fails.
        ConfiguracionDTO configuracionDTO = configuracionMapper.toDto(configuracion);

        restConfiguracionMockMvc.perform(post("/api/configuracions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configuracionDTO)))
            .andExpect(status().isBadRequest());

        List<Configuracion> configuracionList = configuracionRepository.findAll();
        assertThat(configuracionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCedJuridicaIsRequired() throws Exception {
        int databaseSizeBeforeTest = configuracionRepository.findAll().size();
        // set the field null
        configuracion.setCedJuridica(null);

        // Create the Configuracion, which fails.
        ConfiguracionDTO configuracionDTO = configuracionMapper.toDto(configuracion);

        restConfiguracionMockMvc.perform(post("/api/configuracions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configuracionDTO)))
            .andExpect(status().isBadRequest());

        List<Configuracion> configuracionList = configuracionRepository.findAll();
        assertThat(configuracionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDireccionIsRequired() throws Exception {
        int databaseSizeBeforeTest = configuracionRepository.findAll().size();
        // set the field null
        configuracion.setDireccion(null);

        // Create the Configuracion, which fails.
        ConfiguracionDTO configuracionDTO = configuracionMapper.toDto(configuracion);

        restConfiguracionMockMvc.perform(post("/api/configuracions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configuracionDTO)))
            .andExpect(status().isBadRequest());

        List<Configuracion> configuracionList = configuracionRepository.findAll();
        assertThat(configuracionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTelefonoIsRequired() throws Exception {
        int databaseSizeBeforeTest = configuracionRepository.findAll().size();
        // set the field null
        configuracion.setTelefono(null);

        // Create the Configuracion, which fails.
        ConfiguracionDTO configuracionDTO = configuracionMapper.toDto(configuracion);

        restConfiguracionMockMvc.perform(post("/api/configuracions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configuracionDTO)))
            .andExpect(status().isBadRequest());

        List<Configuracion> configuracionList = configuracionRepository.findAll();
        assertThat(configuracionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUrlLogoIsRequired() throws Exception {
        int databaseSizeBeforeTest = configuracionRepository.findAll().size();
        // set the field null
        configuracion.setUrlLogo(null);

        // Create the Configuracion, which fails.
        ConfiguracionDTO configuracionDTO = configuracionMapper.toDto(configuracion);

        restConfiguracionMockMvc.perform(post("/api/configuracions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configuracionDTO)))
            .andExpect(status().isBadRequest());

        List<Configuracion> configuracionList = configuracionRepository.findAll();
        assertThat(configuracionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConfiguracions() throws Exception {
        // Initialize the database
        configuracionRepository.saveAndFlush(configuracion);

        // Get all the configuracionList
        restConfiguracionMockMvc.perform(get("/api/configuracions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(configuracion.getId().intValue())))
            .andExpect(jsonPath("$.[*].calificacionMinima").value(hasItem(DEFAULT_CALIFICACION_MINIMA)))
            .andExpect(jsonPath("$.[*].calificacionMaxima").value(hasItem(DEFAULT_CALIFICACION_MAXIMA)))
            .andExpect(jsonPath("$.[*].nombreAplicacion").value(hasItem(DEFAULT_NOMBRE_APLICACION.toString())))
            .andExpect(jsonPath("$.[*].razonSocial").value(hasItem(DEFAULT_RAZON_SOCIAL.toString())))
            .andExpect(jsonPath("$.[*].cedJuridica").value(hasItem(DEFAULT_CED_JURIDICA.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].latitud").value(hasItem(DEFAULT_LATITUD.doubleValue())))
            .andExpect(jsonPath("$.[*].longitud").value(hasItem(DEFAULT_LONGITUD.doubleValue())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].urlLogo").value(hasItem(DEFAULT_URL_LOGO.toString())));
    }

    @Test
    @Transactional
    public void getConfiguracion() throws Exception {
        // Initialize the database
        configuracionRepository.saveAndFlush(configuracion);

        // Get the configuracion
        restConfiguracionMockMvc.perform(get("/api/configuracions/{id}", configuracion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(configuracion.getId().intValue()))
            .andExpect(jsonPath("$.calificacionMinima").value(DEFAULT_CALIFICACION_MINIMA))
            .andExpect(jsonPath("$.calificacionMaxima").value(DEFAULT_CALIFICACION_MAXIMA))
            .andExpect(jsonPath("$.nombreAplicacion").value(DEFAULT_NOMBRE_APLICACION.toString()))
            .andExpect(jsonPath("$.razonSocial").value(DEFAULT_RAZON_SOCIAL.toString()))
            .andExpect(jsonPath("$.cedJuridica").value(DEFAULT_CED_JURIDICA.toString()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()))
            .andExpect(jsonPath("$.latitud").value(DEFAULT_LATITUD.doubleValue()))
            .andExpect(jsonPath("$.longitud").value(DEFAULT_LONGITUD.doubleValue()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO.toString()))
            .andExpect(jsonPath("$.urlLogo").value(DEFAULT_URL_LOGO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingConfiguracion() throws Exception {
        // Get the configuracion
        restConfiguracionMockMvc.perform(get("/api/configuracions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConfiguracion() throws Exception {
        // Initialize the database
        configuracionRepository.saveAndFlush(configuracion);
        configuracionSearchRepository.save(configuracion);
        int databaseSizeBeforeUpdate = configuracionRepository.findAll().size();

        // Update the configuracion
        Configuracion updatedConfiguracion = configuracionRepository.findOne(configuracion.getId());
        // Disconnect from session so that the updates on updatedConfiguracion are not directly saved in db
        em.detach(updatedConfiguracion);
        updatedConfiguracion
            .calificacionMinima(UPDATED_CALIFICACION_MINIMA)
            .calificacionMaxima(UPDATED_CALIFICACION_MAXIMA)
            .nombreAplicacion(UPDATED_NOMBRE_APLICACION)
            .razonSocial(UPDATED_RAZON_SOCIAL)
            .cedJuridica(UPDATED_CED_JURIDICA)
            .direccion(UPDATED_DIRECCION)
            .latitud(UPDATED_LATITUD)
            .longitud(UPDATED_LONGITUD)
            .telefono(UPDATED_TELEFONO)
            .urlLogo(UPDATED_URL_LOGO);
        ConfiguracionDTO configuracionDTO = configuracionMapper.toDto(updatedConfiguracion);

        restConfiguracionMockMvc.perform(put("/api/configuracions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configuracionDTO)))
            .andExpect(status().isOk());

        // Validate the Configuracion in the database
        List<Configuracion> configuracionList = configuracionRepository.findAll();
        assertThat(configuracionList).hasSize(databaseSizeBeforeUpdate);
        Configuracion testConfiguracion = configuracionList.get(configuracionList.size() - 1);
        assertThat(testConfiguracion.getCalificacionMinima()).isEqualTo(UPDATED_CALIFICACION_MINIMA);
        assertThat(testConfiguracion.getCalificacionMaxima()).isEqualTo(UPDATED_CALIFICACION_MAXIMA);
        assertThat(testConfiguracion.getNombreAplicacion()).isEqualTo(UPDATED_NOMBRE_APLICACION);
        assertThat(testConfiguracion.getRazonSocial()).isEqualTo(UPDATED_RAZON_SOCIAL);
        assertThat(testConfiguracion.getCedJuridica()).isEqualTo(UPDATED_CED_JURIDICA);
        assertThat(testConfiguracion.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testConfiguracion.getLatitud()).isEqualTo(UPDATED_LATITUD);
        assertThat(testConfiguracion.getLongitud()).isEqualTo(UPDATED_LONGITUD);
        assertThat(testConfiguracion.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testConfiguracion.getUrlLogo()).isEqualTo(UPDATED_URL_LOGO);

        // Validate the Configuracion in Elasticsearch
        Configuracion configuracionEs = configuracionSearchRepository.findOne(testConfiguracion.getId());
        assertThat(configuracionEs).isEqualToIgnoringGivenFields(testConfiguracion);
    }

    @Test
    @Transactional
    public void updateNonExistingConfiguracion() throws Exception {
        int databaseSizeBeforeUpdate = configuracionRepository.findAll().size();

        // Create the Configuracion
        ConfiguracionDTO configuracionDTO = configuracionMapper.toDto(configuracion);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restConfiguracionMockMvc.perform(put("/api/configuracions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configuracionDTO)))
            .andExpect(status().isCreated());

        // Validate the Configuracion in the database
        List<Configuracion> configuracionList = configuracionRepository.findAll();
        assertThat(configuracionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteConfiguracion() throws Exception {
        // Initialize the database
        configuracionRepository.saveAndFlush(configuracion);
        configuracionSearchRepository.save(configuracion);
        int databaseSizeBeforeDelete = configuracionRepository.findAll().size();

        // Get the configuracion
        restConfiguracionMockMvc.perform(delete("/api/configuracions/{id}", configuracion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean configuracionExistsInEs = configuracionSearchRepository.exists(configuracion.getId());
        assertThat(configuracionExistsInEs).isFalse();

        // Validate the database is empty
        List<Configuracion> configuracionList = configuracionRepository.findAll();
        assertThat(configuracionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchConfiguracion() throws Exception {
        // Initialize the database
        configuracionRepository.saveAndFlush(configuracion);
        configuracionSearchRepository.save(configuracion);

        // Search the configuracion
        restConfiguracionMockMvc.perform(get("/api/_search/configuracions?query=id:" + configuracion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(configuracion.getId().intValue())))
            .andExpect(jsonPath("$.[*].calificacionMinima").value(hasItem(DEFAULT_CALIFICACION_MINIMA)))
            .andExpect(jsonPath("$.[*].calificacionMaxima").value(hasItem(DEFAULT_CALIFICACION_MAXIMA)))
            .andExpect(jsonPath("$.[*].nombreAplicacion").value(hasItem(DEFAULT_NOMBRE_APLICACION.toString())))
            .andExpect(jsonPath("$.[*].razonSocial").value(hasItem(DEFAULT_RAZON_SOCIAL.toString())))
            .andExpect(jsonPath("$.[*].cedJuridica").value(hasItem(DEFAULT_CED_JURIDICA.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].latitud").value(hasItem(DEFAULT_LATITUD.doubleValue())))
            .andExpect(jsonPath("$.[*].longitud").value(hasItem(DEFAULT_LONGITUD.doubleValue())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].urlLogo").value(hasItem(DEFAULT_URL_LOGO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Configuracion.class);
        Configuracion configuracion1 = new Configuracion();
        configuracion1.setId(1L);
        Configuracion configuracion2 = new Configuracion();
        configuracion2.setId(configuracion1.getId());
        assertThat(configuracion1).isEqualTo(configuracion2);
        configuracion2.setId(2L);
        assertThat(configuracion1).isNotEqualTo(configuracion2);
        configuracion1.setId(null);
        assertThat(configuracion1).isNotEqualTo(configuracion2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConfiguracionDTO.class);
        ConfiguracionDTO configuracionDTO1 = new ConfiguracionDTO();
        configuracionDTO1.setId(1L);
        ConfiguracionDTO configuracionDTO2 = new ConfiguracionDTO();
        assertThat(configuracionDTO1).isNotEqualTo(configuracionDTO2);
        configuracionDTO2.setId(configuracionDTO1.getId());
        assertThat(configuracionDTO1).isEqualTo(configuracionDTO2);
        configuracionDTO2.setId(2L);
        assertThat(configuracionDTO1).isNotEqualTo(configuracionDTO2);
        configuracionDTO1.setId(null);
        assertThat(configuracionDTO1).isNotEqualTo(configuracionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(configuracionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(configuracionMapper.fromId(null)).isNull();
    }
}
