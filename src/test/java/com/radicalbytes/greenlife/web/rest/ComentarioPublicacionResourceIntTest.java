package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.ComentarioPublicacion;
import com.radicalbytes.greenlife.repository.ComentarioPublicacionRepository;
import com.radicalbytes.greenlife.repository.search.ComentarioPublicacionSearchRepository;
import com.radicalbytes.greenlife.service.dto.ComentarioPublicacionDTO;
import com.radicalbytes.greenlife.service.mapper.ComentarioPublicacionMapper;
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
 * Test class for the ComentarioPublicacionResource REST controller.
 *
 * @see ComentarioPublicacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class ComentarioPublicacionResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_TEXTO = "AAAAAAAAAA";
    private static final String UPDATED_TEXTO = "BBBBBBBBBB";

    @Autowired
    private ComentarioPublicacionRepository comentarioPublicacionRepository;

    @Autowired
    private ComentarioPublicacionMapper comentarioPublicacionMapper;

    @Autowired
    private ComentarioPublicacionSearchRepository comentarioPublicacionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restComentarioPublicacionMockMvc;

    private ComentarioPublicacion comentarioPublicacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComentarioPublicacionResource comentarioPublicacionResource = new ComentarioPublicacionResource(comentarioPublicacionRepository, comentarioPublicacionMapper, comentarioPublicacionSearchRepository);
        this.restComentarioPublicacionMockMvc = MockMvcBuilders.standaloneSetup(comentarioPublicacionResource)
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
    public static ComentarioPublicacion createEntity(EntityManager em) {
        ComentarioPublicacion comentarioPublicacion = new ComentarioPublicacion()
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .texto(DEFAULT_TEXTO);
        return comentarioPublicacion;
    }

    @Before
    public void initTest() {
        comentarioPublicacionSearchRepository.deleteAll();
        comentarioPublicacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createComentarioPublicacion() throws Exception {
        int databaseSizeBeforeCreate = comentarioPublicacionRepository.findAll().size();

        // Create the ComentarioPublicacion
        ComentarioPublicacionDTO comentarioPublicacionDTO = comentarioPublicacionMapper.toDto(comentarioPublicacion);
        restComentarioPublicacionMockMvc.perform(post("/api/comentario-publicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comentarioPublicacionDTO)))
            .andExpect(status().isCreated());

        // Validate the ComentarioPublicacion in the database
        List<ComentarioPublicacion> comentarioPublicacionList = comentarioPublicacionRepository.findAll();
        assertThat(comentarioPublicacionList).hasSize(databaseSizeBeforeCreate + 1);
        ComentarioPublicacion testComentarioPublicacion = comentarioPublicacionList.get(comentarioPublicacionList.size() - 1);
        assertThat(testComentarioPublicacion.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testComentarioPublicacion.getTexto()).isEqualTo(DEFAULT_TEXTO);

        // Validate the ComentarioPublicacion in Elasticsearch
        ComentarioPublicacion comentarioPublicacionEs = comentarioPublicacionSearchRepository.findOne(testComentarioPublicacion.getId());
        assertThat(comentarioPublicacionEs).isEqualToIgnoringGivenFields(testComentarioPublicacion);
    }

    @Test
    @Transactional
    public void createComentarioPublicacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = comentarioPublicacionRepository.findAll().size();

        // Create the ComentarioPublicacion with an existing ID
        comentarioPublicacion.setId(1L);
        ComentarioPublicacionDTO comentarioPublicacionDTO = comentarioPublicacionMapper.toDto(comentarioPublicacion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComentarioPublicacionMockMvc.perform(post("/api/comentario-publicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comentarioPublicacionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ComentarioPublicacion in the database
        List<ComentarioPublicacion> comentarioPublicacionList = comentarioPublicacionRepository.findAll();
        assertThat(comentarioPublicacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = comentarioPublicacionRepository.findAll().size();
        // set the field null
        comentarioPublicacion.setFechaCreacion(null);

        // Create the ComentarioPublicacion, which fails.
        ComentarioPublicacionDTO comentarioPublicacionDTO = comentarioPublicacionMapper.toDto(comentarioPublicacion);

        restComentarioPublicacionMockMvc.perform(post("/api/comentario-publicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comentarioPublicacionDTO)))
            .andExpect(status().isBadRequest());

        List<ComentarioPublicacion> comentarioPublicacionList = comentarioPublicacionRepository.findAll();
        assertThat(comentarioPublicacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTextoIsRequired() throws Exception {
        int databaseSizeBeforeTest = comentarioPublicacionRepository.findAll().size();
        // set the field null
        comentarioPublicacion.setTexto(null);

        // Create the ComentarioPublicacion, which fails.
        ComentarioPublicacionDTO comentarioPublicacionDTO = comentarioPublicacionMapper.toDto(comentarioPublicacion);

        restComentarioPublicacionMockMvc.perform(post("/api/comentario-publicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comentarioPublicacionDTO)))
            .andExpect(status().isBadRequest());

        List<ComentarioPublicacion> comentarioPublicacionList = comentarioPublicacionRepository.findAll();
        assertThat(comentarioPublicacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllComentarioPublicacions() throws Exception {
        // Initialize the database
        comentarioPublicacionRepository.saveAndFlush(comentarioPublicacion);

        // Get all the comentarioPublicacionList
        restComentarioPublicacionMockMvc.perform(get("/api/comentario-publicacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(comentarioPublicacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].texto").value(hasItem(DEFAULT_TEXTO.toString())));
    }

    @Test
    @Transactional
    public void getComentarioPublicacion() throws Exception {
        // Initialize the database
        comentarioPublicacionRepository.saveAndFlush(comentarioPublicacion);

        // Get the comentarioPublicacion
        restComentarioPublicacionMockMvc.perform(get("/api/comentario-publicacions/{id}", comentarioPublicacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(comentarioPublicacion.getId().intValue()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.texto").value(DEFAULT_TEXTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingComentarioPublicacion() throws Exception {
        // Get the comentarioPublicacion
        restComentarioPublicacionMockMvc.perform(get("/api/comentario-publicacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComentarioPublicacion() throws Exception {
        // Initialize the database
        comentarioPublicacionRepository.saveAndFlush(comentarioPublicacion);
        comentarioPublicacionSearchRepository.save(comentarioPublicacion);
        int databaseSizeBeforeUpdate = comentarioPublicacionRepository.findAll().size();

        // Update the comentarioPublicacion
        ComentarioPublicacion updatedComentarioPublicacion = comentarioPublicacionRepository.findOne(comentarioPublicacion.getId());
        // Disconnect from session so that the updates on updatedComentarioPublicacion are not directly saved in db
        em.detach(updatedComentarioPublicacion);
        updatedComentarioPublicacion
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .texto(UPDATED_TEXTO);
        ComentarioPublicacionDTO comentarioPublicacionDTO = comentarioPublicacionMapper.toDto(updatedComentarioPublicacion);

        restComentarioPublicacionMockMvc.perform(put("/api/comentario-publicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comentarioPublicacionDTO)))
            .andExpect(status().isOk());

        // Validate the ComentarioPublicacion in the database
        List<ComentarioPublicacion> comentarioPublicacionList = comentarioPublicacionRepository.findAll();
        assertThat(comentarioPublicacionList).hasSize(databaseSizeBeforeUpdate);
        ComentarioPublicacion testComentarioPublicacion = comentarioPublicacionList.get(comentarioPublicacionList.size() - 1);
        assertThat(testComentarioPublicacion.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testComentarioPublicacion.getTexto()).isEqualTo(UPDATED_TEXTO);

        // Validate the ComentarioPublicacion in Elasticsearch
        ComentarioPublicacion comentarioPublicacionEs = comentarioPublicacionSearchRepository.findOne(testComentarioPublicacion.getId());
        assertThat(comentarioPublicacionEs).isEqualToIgnoringGivenFields(testComentarioPublicacion);
    }

    @Test
    @Transactional
    public void updateNonExistingComentarioPublicacion() throws Exception {
        int databaseSizeBeforeUpdate = comentarioPublicacionRepository.findAll().size();

        // Create the ComentarioPublicacion
        ComentarioPublicacionDTO comentarioPublicacionDTO = comentarioPublicacionMapper.toDto(comentarioPublicacion);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restComentarioPublicacionMockMvc.perform(put("/api/comentario-publicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comentarioPublicacionDTO)))
            .andExpect(status().isCreated());

        // Validate the ComentarioPublicacion in the database
        List<ComentarioPublicacion> comentarioPublicacionList = comentarioPublicacionRepository.findAll();
        assertThat(comentarioPublicacionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteComentarioPublicacion() throws Exception {
        // Initialize the database
        comentarioPublicacionRepository.saveAndFlush(comentarioPublicacion);
        comentarioPublicacionSearchRepository.save(comentarioPublicacion);
        int databaseSizeBeforeDelete = comentarioPublicacionRepository.findAll().size();

        // Get the comentarioPublicacion
        restComentarioPublicacionMockMvc.perform(delete("/api/comentario-publicacions/{id}", comentarioPublicacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean comentarioPublicacionExistsInEs = comentarioPublicacionSearchRepository.exists(comentarioPublicacion.getId());
        assertThat(comentarioPublicacionExistsInEs).isFalse();

        // Validate the database is empty
        List<ComentarioPublicacion> comentarioPublicacionList = comentarioPublicacionRepository.findAll();
        assertThat(comentarioPublicacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchComentarioPublicacion() throws Exception {
        // Initialize the database
        comentarioPublicacionRepository.saveAndFlush(comentarioPublicacion);
        comentarioPublicacionSearchRepository.save(comentarioPublicacion);

        // Search the comentarioPublicacion
        restComentarioPublicacionMockMvc.perform(get("/api/_search/comentario-publicacions?query=id:" + comentarioPublicacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(comentarioPublicacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].texto").value(hasItem(DEFAULT_TEXTO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComentarioPublicacion.class);
        ComentarioPublicacion comentarioPublicacion1 = new ComentarioPublicacion();
        comentarioPublicacion1.setId(1L);
        ComentarioPublicacion comentarioPublicacion2 = new ComentarioPublicacion();
        comentarioPublicacion2.setId(comentarioPublicacion1.getId());
        assertThat(comentarioPublicacion1).isEqualTo(comentarioPublicacion2);
        comentarioPublicacion2.setId(2L);
        assertThat(comentarioPublicacion1).isNotEqualTo(comentarioPublicacion2);
        comentarioPublicacion1.setId(null);
        assertThat(comentarioPublicacion1).isNotEqualTo(comentarioPublicacion2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComentarioPublicacionDTO.class);
        ComentarioPublicacionDTO comentarioPublicacionDTO1 = new ComentarioPublicacionDTO();
        comentarioPublicacionDTO1.setId(1L);
        ComentarioPublicacionDTO comentarioPublicacionDTO2 = new ComentarioPublicacionDTO();
        assertThat(comentarioPublicacionDTO1).isNotEqualTo(comentarioPublicacionDTO2);
        comentarioPublicacionDTO2.setId(comentarioPublicacionDTO1.getId());
        assertThat(comentarioPublicacionDTO1).isEqualTo(comentarioPublicacionDTO2);
        comentarioPublicacionDTO2.setId(2L);
        assertThat(comentarioPublicacionDTO1).isNotEqualTo(comentarioPublicacionDTO2);
        comentarioPublicacionDTO1.setId(null);
        assertThat(comentarioPublicacionDTO1).isNotEqualTo(comentarioPublicacionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(comentarioPublicacionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(comentarioPublicacionMapper.fromId(null)).isNull();
    }
}
