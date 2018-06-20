package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.CategoriaAlimentacion;
import com.radicalbytes.greenlife.repository.CategoriaAlimentacionRepository;
import com.radicalbytes.greenlife.repository.search.CategoriaAlimentacionSearchRepository;
import com.radicalbytes.greenlife.service.dto.CategoriaAlimentacionDTO;
import com.radicalbytes.greenlife.service.mapper.CategoriaAlimentacionMapper;
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
 * Test class for the CategoriaAlimentacionResource REST controller.
 *
 * @see CategoriaAlimentacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class CategoriaAlimentacionResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private CategoriaAlimentacionRepository categoriaAlimentacionRepository;

    @Autowired
    private CategoriaAlimentacionMapper categoriaAlimentacionMapper;

    @Autowired
    private CategoriaAlimentacionSearchRepository categoriaAlimentacionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCategoriaAlimentacionMockMvc;

    private CategoriaAlimentacion categoriaAlimentacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CategoriaAlimentacionResource categoriaAlimentacionResource = new CategoriaAlimentacionResource(categoriaAlimentacionRepository, categoriaAlimentacionMapper, categoriaAlimentacionSearchRepository);
        this.restCategoriaAlimentacionMockMvc = MockMvcBuilders.standaloneSetup(categoriaAlimentacionResource)
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
    public static CategoriaAlimentacion createEntity(EntityManager em) {
        CategoriaAlimentacion categoriaAlimentacion = new CategoriaAlimentacion()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION);
        return categoriaAlimentacion;
    }

    @Before
    public void initTest() {
        categoriaAlimentacionSearchRepository.deleteAll();
        categoriaAlimentacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createCategoriaAlimentacion() throws Exception {
        int databaseSizeBeforeCreate = categoriaAlimentacionRepository.findAll().size();

        // Create the CategoriaAlimentacion
        CategoriaAlimentacionDTO categoriaAlimentacionDTO = categoriaAlimentacionMapper.toDto(categoriaAlimentacion);
        restCategoriaAlimentacionMockMvc.perform(post("/api/categoria-alimentacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaAlimentacionDTO)))
            .andExpect(status().isCreated());

        // Validate the CategoriaAlimentacion in the database
        List<CategoriaAlimentacion> categoriaAlimentacionList = categoriaAlimentacionRepository.findAll();
        assertThat(categoriaAlimentacionList).hasSize(databaseSizeBeforeCreate + 1);
        CategoriaAlimentacion testCategoriaAlimentacion = categoriaAlimentacionList.get(categoriaAlimentacionList.size() - 1);
        assertThat(testCategoriaAlimentacion.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testCategoriaAlimentacion.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);

        // Validate the CategoriaAlimentacion in Elasticsearch
        CategoriaAlimentacion categoriaAlimentacionEs = categoriaAlimentacionSearchRepository.findOne(testCategoriaAlimentacion.getId());
        assertThat(categoriaAlimentacionEs).isEqualToIgnoringGivenFields(testCategoriaAlimentacion);
    }

    @Test
    @Transactional
    public void createCategoriaAlimentacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = categoriaAlimentacionRepository.findAll().size();

        // Create the CategoriaAlimentacion with an existing ID
        categoriaAlimentacion.setId(1L);
        CategoriaAlimentacionDTO categoriaAlimentacionDTO = categoriaAlimentacionMapper.toDto(categoriaAlimentacion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCategoriaAlimentacionMockMvc.perform(post("/api/categoria-alimentacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaAlimentacionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CategoriaAlimentacion in the database
        List<CategoriaAlimentacion> categoriaAlimentacionList = categoriaAlimentacionRepository.findAll();
        assertThat(categoriaAlimentacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = categoriaAlimentacionRepository.findAll().size();
        // set the field null
        categoriaAlimentacion.setNombre(null);

        // Create the CategoriaAlimentacion, which fails.
        CategoriaAlimentacionDTO categoriaAlimentacionDTO = categoriaAlimentacionMapper.toDto(categoriaAlimentacion);

        restCategoriaAlimentacionMockMvc.perform(post("/api/categoria-alimentacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaAlimentacionDTO)))
            .andExpect(status().isBadRequest());

        List<CategoriaAlimentacion> categoriaAlimentacionList = categoriaAlimentacionRepository.findAll();
        assertThat(categoriaAlimentacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = categoriaAlimentacionRepository.findAll().size();
        // set the field null
        categoriaAlimentacion.setDescripcion(null);

        // Create the CategoriaAlimentacion, which fails.
        CategoriaAlimentacionDTO categoriaAlimentacionDTO = categoriaAlimentacionMapper.toDto(categoriaAlimentacion);

        restCategoriaAlimentacionMockMvc.perform(post("/api/categoria-alimentacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaAlimentacionDTO)))
            .andExpect(status().isBadRequest());

        List<CategoriaAlimentacion> categoriaAlimentacionList = categoriaAlimentacionRepository.findAll();
        assertThat(categoriaAlimentacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCategoriaAlimentacions() throws Exception {
        // Initialize the database
        categoriaAlimentacionRepository.saveAndFlush(categoriaAlimentacion);

        // Get all the categoriaAlimentacionList
        restCategoriaAlimentacionMockMvc.perform(get("/api/categoria-alimentacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(categoriaAlimentacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void getCategoriaAlimentacion() throws Exception {
        // Initialize the database
        categoriaAlimentacionRepository.saveAndFlush(categoriaAlimentacion);

        // Get the categoriaAlimentacion
        restCategoriaAlimentacionMockMvc.perform(get("/api/categoria-alimentacions/{id}", categoriaAlimentacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(categoriaAlimentacion.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCategoriaAlimentacion() throws Exception {
        // Get the categoriaAlimentacion
        restCategoriaAlimentacionMockMvc.perform(get("/api/categoria-alimentacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCategoriaAlimentacion() throws Exception {
        // Initialize the database
        categoriaAlimentacionRepository.saveAndFlush(categoriaAlimentacion);
        categoriaAlimentacionSearchRepository.save(categoriaAlimentacion);
        int databaseSizeBeforeUpdate = categoriaAlimentacionRepository.findAll().size();

        // Update the categoriaAlimentacion
        CategoriaAlimentacion updatedCategoriaAlimentacion = categoriaAlimentacionRepository.findOne(categoriaAlimentacion.getId());
        // Disconnect from session so that the updates on updatedCategoriaAlimentacion are not directly saved in db
        em.detach(updatedCategoriaAlimentacion);
        updatedCategoriaAlimentacion
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);
        CategoriaAlimentacionDTO categoriaAlimentacionDTO = categoriaAlimentacionMapper.toDto(updatedCategoriaAlimentacion);

        restCategoriaAlimentacionMockMvc.perform(put("/api/categoria-alimentacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaAlimentacionDTO)))
            .andExpect(status().isOk());

        // Validate the CategoriaAlimentacion in the database
        List<CategoriaAlimentacion> categoriaAlimentacionList = categoriaAlimentacionRepository.findAll();
        assertThat(categoriaAlimentacionList).hasSize(databaseSizeBeforeUpdate);
        CategoriaAlimentacion testCategoriaAlimentacion = categoriaAlimentacionList.get(categoriaAlimentacionList.size() - 1);
        assertThat(testCategoriaAlimentacion.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testCategoriaAlimentacion.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);

        // Validate the CategoriaAlimentacion in Elasticsearch
        CategoriaAlimentacion categoriaAlimentacionEs = categoriaAlimentacionSearchRepository.findOne(testCategoriaAlimentacion.getId());
        assertThat(categoriaAlimentacionEs).isEqualToIgnoringGivenFields(testCategoriaAlimentacion);
    }

    @Test
    @Transactional
    public void updateNonExistingCategoriaAlimentacion() throws Exception {
        int databaseSizeBeforeUpdate = categoriaAlimentacionRepository.findAll().size();

        // Create the CategoriaAlimentacion
        CategoriaAlimentacionDTO categoriaAlimentacionDTO = categoriaAlimentacionMapper.toDto(categoriaAlimentacion);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCategoriaAlimentacionMockMvc.perform(put("/api/categoria-alimentacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaAlimentacionDTO)))
            .andExpect(status().isCreated());

        // Validate the CategoriaAlimentacion in the database
        List<CategoriaAlimentacion> categoriaAlimentacionList = categoriaAlimentacionRepository.findAll();
        assertThat(categoriaAlimentacionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCategoriaAlimentacion() throws Exception {
        // Initialize the database
        categoriaAlimentacionRepository.saveAndFlush(categoriaAlimentacion);
        categoriaAlimentacionSearchRepository.save(categoriaAlimentacion);
        int databaseSizeBeforeDelete = categoriaAlimentacionRepository.findAll().size();

        // Get the categoriaAlimentacion
        restCategoriaAlimentacionMockMvc.perform(delete("/api/categoria-alimentacions/{id}", categoriaAlimentacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean categoriaAlimentacionExistsInEs = categoriaAlimentacionSearchRepository.exists(categoriaAlimentacion.getId());
        assertThat(categoriaAlimentacionExistsInEs).isFalse();

        // Validate the database is empty
        List<CategoriaAlimentacion> categoriaAlimentacionList = categoriaAlimentacionRepository.findAll();
        assertThat(categoriaAlimentacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCategoriaAlimentacion() throws Exception {
        // Initialize the database
        categoriaAlimentacionRepository.saveAndFlush(categoriaAlimentacion);
        categoriaAlimentacionSearchRepository.save(categoriaAlimentacion);

        // Search the categoriaAlimentacion
        restCategoriaAlimentacionMockMvc.perform(get("/api/_search/categoria-alimentacions?query=id:" + categoriaAlimentacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(categoriaAlimentacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CategoriaAlimentacion.class);
        CategoriaAlimentacion categoriaAlimentacion1 = new CategoriaAlimentacion();
        categoriaAlimentacion1.setId(1L);
        CategoriaAlimentacion categoriaAlimentacion2 = new CategoriaAlimentacion();
        categoriaAlimentacion2.setId(categoriaAlimentacion1.getId());
        assertThat(categoriaAlimentacion1).isEqualTo(categoriaAlimentacion2);
        categoriaAlimentacion2.setId(2L);
        assertThat(categoriaAlimentacion1).isNotEqualTo(categoriaAlimentacion2);
        categoriaAlimentacion1.setId(null);
        assertThat(categoriaAlimentacion1).isNotEqualTo(categoriaAlimentacion2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CategoriaAlimentacionDTO.class);
        CategoriaAlimentacionDTO categoriaAlimentacionDTO1 = new CategoriaAlimentacionDTO();
        categoriaAlimentacionDTO1.setId(1L);
        CategoriaAlimentacionDTO categoriaAlimentacionDTO2 = new CategoriaAlimentacionDTO();
        assertThat(categoriaAlimentacionDTO1).isNotEqualTo(categoriaAlimentacionDTO2);
        categoriaAlimentacionDTO2.setId(categoriaAlimentacionDTO1.getId());
        assertThat(categoriaAlimentacionDTO1).isEqualTo(categoriaAlimentacionDTO2);
        categoriaAlimentacionDTO2.setId(2L);
        assertThat(categoriaAlimentacionDTO1).isNotEqualTo(categoriaAlimentacionDTO2);
        categoriaAlimentacionDTO1.setId(null);
        assertThat(categoriaAlimentacionDTO1).isNotEqualTo(categoriaAlimentacionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(categoriaAlimentacionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(categoriaAlimentacionMapper.fromId(null)).isNull();
    }
}
