package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.Publicacion;
import com.radicalbytes.greenlife.repository.PublicacionRepository;
import com.radicalbytes.greenlife.repository.search.PublicacionSearchRepository;
import com.radicalbytes.greenlife.service.dto.PublicacionDTO;
import com.radicalbytes.greenlife.service.mapper.PublicacionMapper;
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
 * Test class for the PublicacionResource REST controller.
 *
 * @see PublicacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class PublicacionResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final String DEFAULT_TEXTO = "AAAAAAAAAA";
    private static final String UPDATED_TEXTO = "BBBBBBBBBB";

    @Autowired
    private PublicacionRepository publicacionRepository;

    @Autowired
    private PublicacionMapper publicacionMapper;

    @Autowired
    private PublicacionSearchRepository publicacionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPublicacionMockMvc;

    private Publicacion publicacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PublicacionResource publicacionResource = new PublicacionResource(publicacionRepository, publicacionMapper, publicacionSearchRepository);
        this.restPublicacionMockMvc = MockMvcBuilders.standaloneSetup(publicacionResource)
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
    public static Publicacion createEntity(EntityManager em) {
        Publicacion publicacion = new Publicacion()
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .titulo(DEFAULT_TITULO)
            .texto(DEFAULT_TEXTO);
        return publicacion;
    }

    @Before
    public void initTest() {
        publicacionSearchRepository.deleteAll();
        publicacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createPublicacion() throws Exception {
        int databaseSizeBeforeCreate = publicacionRepository.findAll().size();

        // Create the Publicacion
        PublicacionDTO publicacionDTO = publicacionMapper.toDto(publicacion);
        restPublicacionMockMvc.perform(post("/api/publicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(publicacionDTO)))
            .andExpect(status().isCreated());

        // Validate the Publicacion in the database
        List<Publicacion> publicacionList = publicacionRepository.findAll();
        assertThat(publicacionList).hasSize(databaseSizeBeforeCreate + 1);
        Publicacion testPublicacion = publicacionList.get(publicacionList.size() - 1);
        assertThat(testPublicacion.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testPublicacion.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testPublicacion.getTexto()).isEqualTo(DEFAULT_TEXTO);

        // Validate the Publicacion in Elasticsearch
        Publicacion publicacionEs = publicacionSearchRepository.findOne(testPublicacion.getId());
        assertThat(publicacionEs).isEqualToIgnoringGivenFields(testPublicacion);
    }

    @Test
    @Transactional
    public void createPublicacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = publicacionRepository.findAll().size();

        // Create the Publicacion with an existing ID
        publicacion.setId(1L);
        PublicacionDTO publicacionDTO = publicacionMapper.toDto(publicacion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPublicacionMockMvc.perform(post("/api/publicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(publicacionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Publicacion in the database
        List<Publicacion> publicacionList = publicacionRepository.findAll();
        assertThat(publicacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = publicacionRepository.findAll().size();
        // set the field null
        publicacion.setFechaCreacion(null);

        // Create the Publicacion, which fails.
        PublicacionDTO publicacionDTO = publicacionMapper.toDto(publicacion);

        restPublicacionMockMvc.perform(post("/api/publicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(publicacionDTO)))
            .andExpect(status().isBadRequest());

        List<Publicacion> publicacionList = publicacionRepository.findAll();
        assertThat(publicacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTituloIsRequired() throws Exception {
        int databaseSizeBeforeTest = publicacionRepository.findAll().size();
        // set the field null
        publicacion.setTitulo(null);

        // Create the Publicacion, which fails.
        PublicacionDTO publicacionDTO = publicacionMapper.toDto(publicacion);

        restPublicacionMockMvc.perform(post("/api/publicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(publicacionDTO)))
            .andExpect(status().isBadRequest());

        List<Publicacion> publicacionList = publicacionRepository.findAll();
        assertThat(publicacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTextoIsRequired() throws Exception {
        int databaseSizeBeforeTest = publicacionRepository.findAll().size();
        // set the field null
        publicacion.setTexto(null);

        // Create the Publicacion, which fails.
        PublicacionDTO publicacionDTO = publicacionMapper.toDto(publicacion);

        restPublicacionMockMvc.perform(post("/api/publicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(publicacionDTO)))
            .andExpect(status().isBadRequest());

        List<Publicacion> publicacionList = publicacionRepository.findAll();
        assertThat(publicacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPublicacions() throws Exception {
        // Initialize the database
        publicacionRepository.saveAndFlush(publicacion);

        // Get all the publicacionList
        restPublicacionMockMvc.perform(get("/api/publicacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(publicacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].texto").value(hasItem(DEFAULT_TEXTO.toString())));
    }

    @Test
    @Transactional
    public void getPublicacion() throws Exception {
        // Initialize the database
        publicacionRepository.saveAndFlush(publicacion);

        // Get the publicacion
        restPublicacionMockMvc.perform(get("/api/publicacions/{id}", publicacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(publicacion.getId().intValue()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO.toString()))
            .andExpect(jsonPath("$.texto").value(DEFAULT_TEXTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPublicacion() throws Exception {
        // Get the publicacion
        restPublicacionMockMvc.perform(get("/api/publicacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePublicacion() throws Exception {
        // Initialize the database
        publicacionRepository.saveAndFlush(publicacion);
        publicacionSearchRepository.save(publicacion);
        int databaseSizeBeforeUpdate = publicacionRepository.findAll().size();

        // Update the publicacion
        Publicacion updatedPublicacion = publicacionRepository.findOne(publicacion.getId());
        // Disconnect from session so that the updates on updatedPublicacion are not directly saved in db
        em.detach(updatedPublicacion);
        updatedPublicacion
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .titulo(UPDATED_TITULO)
            .texto(UPDATED_TEXTO);
        PublicacionDTO publicacionDTO = publicacionMapper.toDto(updatedPublicacion);

        restPublicacionMockMvc.perform(put("/api/publicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(publicacionDTO)))
            .andExpect(status().isOk());

        // Validate the Publicacion in the database
        List<Publicacion> publicacionList = publicacionRepository.findAll();
        assertThat(publicacionList).hasSize(databaseSizeBeforeUpdate);
        Publicacion testPublicacion = publicacionList.get(publicacionList.size() - 1);
        assertThat(testPublicacion.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testPublicacion.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testPublicacion.getTexto()).isEqualTo(UPDATED_TEXTO);

        // Validate the Publicacion in Elasticsearch
        Publicacion publicacionEs = publicacionSearchRepository.findOne(testPublicacion.getId());
        assertThat(publicacionEs).isEqualToIgnoringGivenFields(testPublicacion);
    }

    @Test
    @Transactional
    public void updateNonExistingPublicacion() throws Exception {
        int databaseSizeBeforeUpdate = publicacionRepository.findAll().size();

        // Create the Publicacion
        PublicacionDTO publicacionDTO = publicacionMapper.toDto(publicacion);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPublicacionMockMvc.perform(put("/api/publicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(publicacionDTO)))
            .andExpect(status().isCreated());

        // Validate the Publicacion in the database
        List<Publicacion> publicacionList = publicacionRepository.findAll();
        assertThat(publicacionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePublicacion() throws Exception {
        // Initialize the database
        publicacionRepository.saveAndFlush(publicacion);
        publicacionSearchRepository.save(publicacion);
        int databaseSizeBeforeDelete = publicacionRepository.findAll().size();

        // Get the publicacion
        restPublicacionMockMvc.perform(delete("/api/publicacions/{id}", publicacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean publicacionExistsInEs = publicacionSearchRepository.exists(publicacion.getId());
        assertThat(publicacionExistsInEs).isFalse();

        // Validate the database is empty
        List<Publicacion> publicacionList = publicacionRepository.findAll();
        assertThat(publicacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPublicacion() throws Exception {
        // Initialize the database
        publicacionRepository.saveAndFlush(publicacion);
        publicacionSearchRepository.save(publicacion);

        // Search the publicacion
        restPublicacionMockMvc.perform(get("/api/_search/publicacions?query=id:" + publicacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(publicacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].texto").value(hasItem(DEFAULT_TEXTO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Publicacion.class);
        Publicacion publicacion1 = new Publicacion();
        publicacion1.setId(1L);
        Publicacion publicacion2 = new Publicacion();
        publicacion2.setId(publicacion1.getId());
        assertThat(publicacion1).isEqualTo(publicacion2);
        publicacion2.setId(2L);
        assertThat(publicacion1).isNotEqualTo(publicacion2);
        publicacion1.setId(null);
        assertThat(publicacion1).isNotEqualTo(publicacion2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PublicacionDTO.class);
        PublicacionDTO publicacionDTO1 = new PublicacionDTO();
        publicacionDTO1.setId(1L);
        PublicacionDTO publicacionDTO2 = new PublicacionDTO();
        assertThat(publicacionDTO1).isNotEqualTo(publicacionDTO2);
        publicacionDTO2.setId(publicacionDTO1.getId());
        assertThat(publicacionDTO1).isEqualTo(publicacionDTO2);
        publicacionDTO2.setId(2L);
        assertThat(publicacionDTO1).isNotEqualTo(publicacionDTO2);
        publicacionDTO1.setId(null);
        assertThat(publicacionDTO1).isNotEqualTo(publicacionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(publicacionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(publicacionMapper.fromId(null)).isNull();
    }
}
