package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.Recolector;
import com.radicalbytes.greenlife.repository.RecolectorRepository;
import com.radicalbytes.greenlife.repository.search.RecolectorSearchRepository;
import com.radicalbytes.greenlife.service.dto.RecolectorDTO;
import com.radicalbytes.greenlife.service.mapper.RecolectorMapper;
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
 * Test class for the RecolectorResource REST controller.
 *
 * @see RecolectorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class RecolectorResourceIntTest {

    @Autowired
    private RecolectorRepository recolectorRepository;

    @Autowired
    private RecolectorMapper recolectorMapper;

    @Autowired
    private RecolectorSearchRepository recolectorSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRecolectorMockMvc;

    private Recolector recolector;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RecolectorResource recolectorResource = new RecolectorResource(recolectorRepository, recolectorMapper, recolectorSearchRepository);
        this.restRecolectorMockMvc = MockMvcBuilders.standaloneSetup(recolectorResource)
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
    public static Recolector createEntity(EntityManager em) {
        Recolector recolector = new Recolector();
        return recolector;
    }

    @Before
    public void initTest() {
        recolectorSearchRepository.deleteAll();
        recolector = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecolector() throws Exception {
        int databaseSizeBeforeCreate = recolectorRepository.findAll().size();

        // Create the Recolector
        RecolectorDTO recolectorDTO = recolectorMapper.toDto(recolector);
        restRecolectorMockMvc.perform(post("/api/recolectors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recolectorDTO)))
            .andExpect(status().isCreated());

        // Validate the Recolector in the database
        List<Recolector> recolectorList = recolectorRepository.findAll();
        assertThat(recolectorList).hasSize(databaseSizeBeforeCreate + 1);
        Recolector testRecolector = recolectorList.get(recolectorList.size() - 1);

        // Validate the Recolector in Elasticsearch
        Recolector recolectorEs = recolectorSearchRepository.findOne(testRecolector.getId());
        assertThat(recolectorEs).isEqualToIgnoringGivenFields(testRecolector);
    }

    @Test
    @Transactional
    public void createRecolectorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recolectorRepository.findAll().size();

        // Create the Recolector with an existing ID
        recolector.setId(1L);
        RecolectorDTO recolectorDTO = recolectorMapper.toDto(recolector);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecolectorMockMvc.perform(post("/api/recolectors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recolectorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Recolector in the database
        List<Recolector> recolectorList = recolectorRepository.findAll();
        assertThat(recolectorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRecolectors() throws Exception {
        // Initialize the database
        recolectorRepository.saveAndFlush(recolector);

        // Get all the recolectorList
        restRecolectorMockMvc.perform(get("/api/recolectors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recolector.getId().intValue())));
    }

    @Test
    @Transactional
    public void getRecolector() throws Exception {
        // Initialize the database
        recolectorRepository.saveAndFlush(recolector);

        // Get the recolector
        restRecolectorMockMvc.perform(get("/api/recolectors/{id}", recolector.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recolector.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRecolector() throws Exception {
        // Get the recolector
        restRecolectorMockMvc.perform(get("/api/recolectors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecolector() throws Exception {
        // Initialize the database
        recolectorRepository.saveAndFlush(recolector);
        recolectorSearchRepository.save(recolector);
        int databaseSizeBeforeUpdate = recolectorRepository.findAll().size();

        // Update the recolector
        Recolector updatedRecolector = recolectorRepository.findOne(recolector.getId());
        // Disconnect from session so that the updates on updatedRecolector are not directly saved in db
        em.detach(updatedRecolector);
        RecolectorDTO recolectorDTO = recolectorMapper.toDto(updatedRecolector);

        restRecolectorMockMvc.perform(put("/api/recolectors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recolectorDTO)))
            .andExpect(status().isOk());

        // Validate the Recolector in the database
        List<Recolector> recolectorList = recolectorRepository.findAll();
        assertThat(recolectorList).hasSize(databaseSizeBeforeUpdate);
        Recolector testRecolector = recolectorList.get(recolectorList.size() - 1);

        // Validate the Recolector in Elasticsearch
        Recolector recolectorEs = recolectorSearchRepository.findOne(testRecolector.getId());
        assertThat(recolectorEs).isEqualToIgnoringGivenFields(testRecolector);
    }

    @Test
    @Transactional
    public void updateNonExistingRecolector() throws Exception {
        int databaseSizeBeforeUpdate = recolectorRepository.findAll().size();

        // Create the Recolector
        RecolectorDTO recolectorDTO = recolectorMapper.toDto(recolector);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRecolectorMockMvc.perform(put("/api/recolectors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recolectorDTO)))
            .andExpect(status().isCreated());

        // Validate the Recolector in the database
        List<Recolector> recolectorList = recolectorRepository.findAll();
        assertThat(recolectorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRecolector() throws Exception {
        // Initialize the database
        recolectorRepository.saveAndFlush(recolector);
        recolectorSearchRepository.save(recolector);
        int databaseSizeBeforeDelete = recolectorRepository.findAll().size();

        // Get the recolector
        restRecolectorMockMvc.perform(delete("/api/recolectors/{id}", recolector.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean recolectorExistsInEs = recolectorSearchRepository.exists(recolector.getId());
        assertThat(recolectorExistsInEs).isFalse();

        // Validate the database is empty
        List<Recolector> recolectorList = recolectorRepository.findAll();
        assertThat(recolectorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchRecolector() throws Exception {
        // Initialize the database
        recolectorRepository.saveAndFlush(recolector);
        recolectorSearchRepository.save(recolector);

        // Search the recolector
        restRecolectorMockMvc.perform(get("/api/_search/recolectors?query=id:" + recolector.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recolector.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Recolector.class);
        Recolector recolector1 = new Recolector();
        recolector1.setId(1L);
        Recolector recolector2 = new Recolector();
        recolector2.setId(recolector1.getId());
        assertThat(recolector1).isEqualTo(recolector2);
        recolector2.setId(2L);
        assertThat(recolector1).isNotEqualTo(recolector2);
        recolector1.setId(null);
        assertThat(recolector1).isNotEqualTo(recolector2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecolectorDTO.class);
        RecolectorDTO recolectorDTO1 = new RecolectorDTO();
        recolectorDTO1.setId(1L);
        RecolectorDTO recolectorDTO2 = new RecolectorDTO();
        assertThat(recolectorDTO1).isNotEqualTo(recolectorDTO2);
        recolectorDTO2.setId(recolectorDTO1.getId());
        assertThat(recolectorDTO1).isEqualTo(recolectorDTO2);
        recolectorDTO2.setId(2L);
        assertThat(recolectorDTO1).isNotEqualTo(recolectorDTO2);
        recolectorDTO1.setId(null);
        assertThat(recolectorDTO1).isNotEqualTo(recolectorDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(recolectorMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(recolectorMapper.fromId(null)).isNull();
    }
}
