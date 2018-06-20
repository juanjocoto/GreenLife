package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.SolicitudPatrocinio;
import com.radicalbytes.greenlife.repository.SolicitudPatrocinioRepository;
import com.radicalbytes.greenlife.repository.search.SolicitudPatrocinioSearchRepository;
import com.radicalbytes.greenlife.service.dto.SolicitudPatrocinioDTO;
import com.radicalbytes.greenlife.service.mapper.SolicitudPatrocinioMapper;
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
 * Test class for the SolicitudPatrocinioResource REST controller.
 *
 * @see SolicitudPatrocinioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class SolicitudPatrocinioResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_CED_JURIDICA = "AAAAAAAAAA";
    private static final String UPDATED_CED_JURIDICA = "BBBBBBBBBB";

    private static final String DEFAULT_CORREO = "AAAAAAAAAA";
    private static final String UPDATED_CORREO = "BBBBBBBBBB";

    private static final String DEFAULT_DATOS_ADICIONALES = "AAAAAAAAAA";
    private static final String UPDATED_DATOS_ADICIONALES = "BBBBBBBBBB";

    @Autowired
    private SolicitudPatrocinioRepository solicitudPatrocinioRepository;

    @Autowired
    private SolicitudPatrocinioMapper solicitudPatrocinioMapper;

    @Autowired
    private SolicitudPatrocinioSearchRepository solicitudPatrocinioSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSolicitudPatrocinioMockMvc;

    private SolicitudPatrocinio solicitudPatrocinio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SolicitudPatrocinioResource solicitudPatrocinioResource = new SolicitudPatrocinioResource(solicitudPatrocinioRepository, solicitudPatrocinioMapper, solicitudPatrocinioSearchRepository);
        this.restSolicitudPatrocinioMockMvc = MockMvcBuilders.standaloneSetup(solicitudPatrocinioResource)
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
    public static SolicitudPatrocinio createEntity(EntityManager em) {
        SolicitudPatrocinio solicitudPatrocinio = new SolicitudPatrocinio()
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .nombre(DEFAULT_NOMBRE)
            .cedJuridica(DEFAULT_CED_JURIDICA)
            .correo(DEFAULT_CORREO)
            .datosAdicionales(DEFAULT_DATOS_ADICIONALES);
        return solicitudPatrocinio;
    }

    @Before
    public void initTest() {
        solicitudPatrocinioSearchRepository.deleteAll();
        solicitudPatrocinio = createEntity(em);
    }

    @Test
    @Transactional
    public void createSolicitudPatrocinio() throws Exception {
        int databaseSizeBeforeCreate = solicitudPatrocinioRepository.findAll().size();

        // Create the SolicitudPatrocinio
        SolicitudPatrocinioDTO solicitudPatrocinioDTO = solicitudPatrocinioMapper.toDto(solicitudPatrocinio);
        restSolicitudPatrocinioMockMvc.perform(post("/api/solicitud-patrocinios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitudPatrocinioDTO)))
            .andExpect(status().isCreated());

        // Validate the SolicitudPatrocinio in the database
        List<SolicitudPatrocinio> solicitudPatrocinioList = solicitudPatrocinioRepository.findAll();
        assertThat(solicitudPatrocinioList).hasSize(databaseSizeBeforeCreate + 1);
        SolicitudPatrocinio testSolicitudPatrocinio = solicitudPatrocinioList.get(solicitudPatrocinioList.size() - 1);
        assertThat(testSolicitudPatrocinio.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testSolicitudPatrocinio.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testSolicitudPatrocinio.getCedJuridica()).isEqualTo(DEFAULT_CED_JURIDICA);
        assertThat(testSolicitudPatrocinio.getCorreo()).isEqualTo(DEFAULT_CORREO);
        assertThat(testSolicitudPatrocinio.getDatosAdicionales()).isEqualTo(DEFAULT_DATOS_ADICIONALES);

        // Validate the SolicitudPatrocinio in Elasticsearch
        SolicitudPatrocinio solicitudPatrocinioEs = solicitudPatrocinioSearchRepository.findOne(testSolicitudPatrocinio.getId());
        assertThat(solicitudPatrocinioEs).isEqualToIgnoringGivenFields(testSolicitudPatrocinio);
    }

    @Test
    @Transactional
    public void createSolicitudPatrocinioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = solicitudPatrocinioRepository.findAll().size();

        // Create the SolicitudPatrocinio with an existing ID
        solicitudPatrocinio.setId(1L);
        SolicitudPatrocinioDTO solicitudPatrocinioDTO = solicitudPatrocinioMapper.toDto(solicitudPatrocinio);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSolicitudPatrocinioMockMvc.perform(post("/api/solicitud-patrocinios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitudPatrocinioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SolicitudPatrocinio in the database
        List<SolicitudPatrocinio> solicitudPatrocinioList = solicitudPatrocinioRepository.findAll();
        assertThat(solicitudPatrocinioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicitudPatrocinioRepository.findAll().size();
        // set the field null
        solicitudPatrocinio.setFechaCreacion(null);

        // Create the SolicitudPatrocinio, which fails.
        SolicitudPatrocinioDTO solicitudPatrocinioDTO = solicitudPatrocinioMapper.toDto(solicitudPatrocinio);

        restSolicitudPatrocinioMockMvc.perform(post("/api/solicitud-patrocinios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitudPatrocinioDTO)))
            .andExpect(status().isBadRequest());

        List<SolicitudPatrocinio> solicitudPatrocinioList = solicitudPatrocinioRepository.findAll();
        assertThat(solicitudPatrocinioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicitudPatrocinioRepository.findAll().size();
        // set the field null
        solicitudPatrocinio.setNombre(null);

        // Create the SolicitudPatrocinio, which fails.
        SolicitudPatrocinioDTO solicitudPatrocinioDTO = solicitudPatrocinioMapper.toDto(solicitudPatrocinio);

        restSolicitudPatrocinioMockMvc.perform(post("/api/solicitud-patrocinios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitudPatrocinioDTO)))
            .andExpect(status().isBadRequest());

        List<SolicitudPatrocinio> solicitudPatrocinioList = solicitudPatrocinioRepository.findAll();
        assertThat(solicitudPatrocinioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCedJuridicaIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicitudPatrocinioRepository.findAll().size();
        // set the field null
        solicitudPatrocinio.setCedJuridica(null);

        // Create the SolicitudPatrocinio, which fails.
        SolicitudPatrocinioDTO solicitudPatrocinioDTO = solicitudPatrocinioMapper.toDto(solicitudPatrocinio);

        restSolicitudPatrocinioMockMvc.perform(post("/api/solicitud-patrocinios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitudPatrocinioDTO)))
            .andExpect(status().isBadRequest());

        List<SolicitudPatrocinio> solicitudPatrocinioList = solicitudPatrocinioRepository.findAll();
        assertThat(solicitudPatrocinioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCorreoIsRequired() throws Exception {
        int databaseSizeBeforeTest = solicitudPatrocinioRepository.findAll().size();
        // set the field null
        solicitudPatrocinio.setCorreo(null);

        // Create the SolicitudPatrocinio, which fails.
        SolicitudPatrocinioDTO solicitudPatrocinioDTO = solicitudPatrocinioMapper.toDto(solicitudPatrocinio);

        restSolicitudPatrocinioMockMvc.perform(post("/api/solicitud-patrocinios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitudPatrocinioDTO)))
            .andExpect(status().isBadRequest());

        List<SolicitudPatrocinio> solicitudPatrocinioList = solicitudPatrocinioRepository.findAll();
        assertThat(solicitudPatrocinioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSolicitudPatrocinios() throws Exception {
        // Initialize the database
        solicitudPatrocinioRepository.saveAndFlush(solicitudPatrocinio);

        // Get all the solicitudPatrocinioList
        restSolicitudPatrocinioMockMvc.perform(get("/api/solicitud-patrocinios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(solicitudPatrocinio.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].cedJuridica").value(hasItem(DEFAULT_CED_JURIDICA.toString())))
            .andExpect(jsonPath("$.[*].correo").value(hasItem(DEFAULT_CORREO.toString())))
            .andExpect(jsonPath("$.[*].datosAdicionales").value(hasItem(DEFAULT_DATOS_ADICIONALES.toString())));
    }

    @Test
    @Transactional
    public void getSolicitudPatrocinio() throws Exception {
        // Initialize the database
        solicitudPatrocinioRepository.saveAndFlush(solicitudPatrocinio);

        // Get the solicitudPatrocinio
        restSolicitudPatrocinioMockMvc.perform(get("/api/solicitud-patrocinios/{id}", solicitudPatrocinio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(solicitudPatrocinio.getId().intValue()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.cedJuridica").value(DEFAULT_CED_JURIDICA.toString()))
            .andExpect(jsonPath("$.correo").value(DEFAULT_CORREO.toString()))
            .andExpect(jsonPath("$.datosAdicionales").value(DEFAULT_DATOS_ADICIONALES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSolicitudPatrocinio() throws Exception {
        // Get the solicitudPatrocinio
        restSolicitudPatrocinioMockMvc.perform(get("/api/solicitud-patrocinios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSolicitudPatrocinio() throws Exception {
        // Initialize the database
        solicitudPatrocinioRepository.saveAndFlush(solicitudPatrocinio);
        solicitudPatrocinioSearchRepository.save(solicitudPatrocinio);
        int databaseSizeBeforeUpdate = solicitudPatrocinioRepository.findAll().size();

        // Update the solicitudPatrocinio
        SolicitudPatrocinio updatedSolicitudPatrocinio = solicitudPatrocinioRepository.findOne(solicitudPatrocinio.getId());
        // Disconnect from session so that the updates on updatedSolicitudPatrocinio are not directly saved in db
        em.detach(updatedSolicitudPatrocinio);
        updatedSolicitudPatrocinio
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .nombre(UPDATED_NOMBRE)
            .cedJuridica(UPDATED_CED_JURIDICA)
            .correo(UPDATED_CORREO)
            .datosAdicionales(UPDATED_DATOS_ADICIONALES);
        SolicitudPatrocinioDTO solicitudPatrocinioDTO = solicitudPatrocinioMapper.toDto(updatedSolicitudPatrocinio);

        restSolicitudPatrocinioMockMvc.perform(put("/api/solicitud-patrocinios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitudPatrocinioDTO)))
            .andExpect(status().isOk());

        // Validate the SolicitudPatrocinio in the database
        List<SolicitudPatrocinio> solicitudPatrocinioList = solicitudPatrocinioRepository.findAll();
        assertThat(solicitudPatrocinioList).hasSize(databaseSizeBeforeUpdate);
        SolicitudPatrocinio testSolicitudPatrocinio = solicitudPatrocinioList.get(solicitudPatrocinioList.size() - 1);
        assertThat(testSolicitudPatrocinio.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testSolicitudPatrocinio.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testSolicitudPatrocinio.getCedJuridica()).isEqualTo(UPDATED_CED_JURIDICA);
        assertThat(testSolicitudPatrocinio.getCorreo()).isEqualTo(UPDATED_CORREO);
        assertThat(testSolicitudPatrocinio.getDatosAdicionales()).isEqualTo(UPDATED_DATOS_ADICIONALES);

        // Validate the SolicitudPatrocinio in Elasticsearch
        SolicitudPatrocinio solicitudPatrocinioEs = solicitudPatrocinioSearchRepository.findOne(testSolicitudPatrocinio.getId());
        assertThat(solicitudPatrocinioEs).isEqualToIgnoringGivenFields(testSolicitudPatrocinio);
    }

    @Test
    @Transactional
    public void updateNonExistingSolicitudPatrocinio() throws Exception {
        int databaseSizeBeforeUpdate = solicitudPatrocinioRepository.findAll().size();

        // Create the SolicitudPatrocinio
        SolicitudPatrocinioDTO solicitudPatrocinioDTO = solicitudPatrocinioMapper.toDto(solicitudPatrocinio);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSolicitudPatrocinioMockMvc.perform(put("/api/solicitud-patrocinios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitudPatrocinioDTO)))
            .andExpect(status().isCreated());

        // Validate the SolicitudPatrocinio in the database
        List<SolicitudPatrocinio> solicitudPatrocinioList = solicitudPatrocinioRepository.findAll();
        assertThat(solicitudPatrocinioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSolicitudPatrocinio() throws Exception {
        // Initialize the database
        solicitudPatrocinioRepository.saveAndFlush(solicitudPatrocinio);
        solicitudPatrocinioSearchRepository.save(solicitudPatrocinio);
        int databaseSizeBeforeDelete = solicitudPatrocinioRepository.findAll().size();

        // Get the solicitudPatrocinio
        restSolicitudPatrocinioMockMvc.perform(delete("/api/solicitud-patrocinios/{id}", solicitudPatrocinio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean solicitudPatrocinioExistsInEs = solicitudPatrocinioSearchRepository.exists(solicitudPatrocinio.getId());
        assertThat(solicitudPatrocinioExistsInEs).isFalse();

        // Validate the database is empty
        List<SolicitudPatrocinio> solicitudPatrocinioList = solicitudPatrocinioRepository.findAll();
        assertThat(solicitudPatrocinioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSolicitudPatrocinio() throws Exception {
        // Initialize the database
        solicitudPatrocinioRepository.saveAndFlush(solicitudPatrocinio);
        solicitudPatrocinioSearchRepository.save(solicitudPatrocinio);

        // Search the solicitudPatrocinio
        restSolicitudPatrocinioMockMvc.perform(get("/api/_search/solicitud-patrocinios?query=id:" + solicitudPatrocinio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(solicitudPatrocinio.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].cedJuridica").value(hasItem(DEFAULT_CED_JURIDICA.toString())))
            .andExpect(jsonPath("$.[*].correo").value(hasItem(DEFAULT_CORREO.toString())))
            .andExpect(jsonPath("$.[*].datosAdicionales").value(hasItem(DEFAULT_DATOS_ADICIONALES.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SolicitudPatrocinio.class);
        SolicitudPatrocinio solicitudPatrocinio1 = new SolicitudPatrocinio();
        solicitudPatrocinio1.setId(1L);
        SolicitudPatrocinio solicitudPatrocinio2 = new SolicitudPatrocinio();
        solicitudPatrocinio2.setId(solicitudPatrocinio1.getId());
        assertThat(solicitudPatrocinio1).isEqualTo(solicitudPatrocinio2);
        solicitudPatrocinio2.setId(2L);
        assertThat(solicitudPatrocinio1).isNotEqualTo(solicitudPatrocinio2);
        solicitudPatrocinio1.setId(null);
        assertThat(solicitudPatrocinio1).isNotEqualTo(solicitudPatrocinio2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SolicitudPatrocinioDTO.class);
        SolicitudPatrocinioDTO solicitudPatrocinioDTO1 = new SolicitudPatrocinioDTO();
        solicitudPatrocinioDTO1.setId(1L);
        SolicitudPatrocinioDTO solicitudPatrocinioDTO2 = new SolicitudPatrocinioDTO();
        assertThat(solicitudPatrocinioDTO1).isNotEqualTo(solicitudPatrocinioDTO2);
        solicitudPatrocinioDTO2.setId(solicitudPatrocinioDTO1.getId());
        assertThat(solicitudPatrocinioDTO1).isEqualTo(solicitudPatrocinioDTO2);
        solicitudPatrocinioDTO2.setId(2L);
        assertThat(solicitudPatrocinioDTO1).isNotEqualTo(solicitudPatrocinioDTO2);
        solicitudPatrocinioDTO1.setId(null);
        assertThat(solicitudPatrocinioDTO1).isNotEqualTo(solicitudPatrocinioDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(solicitudPatrocinioMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(solicitudPatrocinioMapper.fromId(null)).isNull();
    }
}
