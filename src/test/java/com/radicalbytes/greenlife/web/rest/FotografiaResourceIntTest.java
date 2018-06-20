package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.Fotografia;
import com.radicalbytes.greenlife.repository.FotografiaRepository;
import com.radicalbytes.greenlife.repository.search.FotografiaSearchRepository;
import com.radicalbytes.greenlife.service.dto.FotografiaDTO;
import com.radicalbytes.greenlife.service.mapper.FotografiaMapper;
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
 * Test class for the FotografiaResource REST controller.
 *
 * @see FotografiaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class FotografiaResourceIntTest {

    private static final String DEFAULT_URL_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_URL_IMAGE = "BBBBBBBBBB";

    @Autowired
    private FotografiaRepository fotografiaRepository;

    @Autowired
    private FotografiaMapper fotografiaMapper;

    @Autowired
    private FotografiaSearchRepository fotografiaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFotografiaMockMvc;

    private Fotografia fotografia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FotografiaResource fotografiaResource = new FotografiaResource(fotografiaRepository, fotografiaMapper, fotografiaSearchRepository);
        this.restFotografiaMockMvc = MockMvcBuilders.standaloneSetup(fotografiaResource)
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
    public static Fotografia createEntity(EntityManager em) {
        Fotografia fotografia = new Fotografia()
            .urlImage(DEFAULT_URL_IMAGE);
        return fotografia;
    }

    @Before
    public void initTest() {
        fotografiaSearchRepository.deleteAll();
        fotografia = createEntity(em);
    }

    @Test
    @Transactional
    public void createFotografia() throws Exception {
        int databaseSizeBeforeCreate = fotografiaRepository.findAll().size();

        // Create the Fotografia
        FotografiaDTO fotografiaDTO = fotografiaMapper.toDto(fotografia);
        restFotografiaMockMvc.perform(post("/api/fotografias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fotografiaDTO)))
            .andExpect(status().isCreated());

        // Validate the Fotografia in the database
        List<Fotografia> fotografiaList = fotografiaRepository.findAll();
        assertThat(fotografiaList).hasSize(databaseSizeBeforeCreate + 1);
        Fotografia testFotografia = fotografiaList.get(fotografiaList.size() - 1);
        assertThat(testFotografia.getUrlImage()).isEqualTo(DEFAULT_URL_IMAGE);

        // Validate the Fotografia in Elasticsearch
        Fotografia fotografiaEs = fotografiaSearchRepository.findOne(testFotografia.getId());
        assertThat(fotografiaEs).isEqualToIgnoringGivenFields(testFotografia);
    }

    @Test
    @Transactional
    public void createFotografiaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fotografiaRepository.findAll().size();

        // Create the Fotografia with an existing ID
        fotografia.setId(1L);
        FotografiaDTO fotografiaDTO = fotografiaMapper.toDto(fotografia);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFotografiaMockMvc.perform(post("/api/fotografias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fotografiaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Fotografia in the database
        List<Fotografia> fotografiaList = fotografiaRepository.findAll();
        assertThat(fotografiaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkUrlImageIsRequired() throws Exception {
        int databaseSizeBeforeTest = fotografiaRepository.findAll().size();
        // set the field null
        fotografia.setUrlImage(null);

        // Create the Fotografia, which fails.
        FotografiaDTO fotografiaDTO = fotografiaMapper.toDto(fotografia);

        restFotografiaMockMvc.perform(post("/api/fotografias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fotografiaDTO)))
            .andExpect(status().isBadRequest());

        List<Fotografia> fotografiaList = fotografiaRepository.findAll();
        assertThat(fotografiaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFotografias() throws Exception {
        // Initialize the database
        fotografiaRepository.saveAndFlush(fotografia);

        // Get all the fotografiaList
        restFotografiaMockMvc.perform(get("/api/fotografias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fotografia.getId().intValue())))
            .andExpect(jsonPath("$.[*].urlImage").value(hasItem(DEFAULT_URL_IMAGE.toString())));
    }

    @Test
    @Transactional
    public void getFotografia() throws Exception {
        // Initialize the database
        fotografiaRepository.saveAndFlush(fotografia);

        // Get the fotografia
        restFotografiaMockMvc.perform(get("/api/fotografias/{id}", fotografia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fotografia.getId().intValue()))
            .andExpect(jsonPath("$.urlImage").value(DEFAULT_URL_IMAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFotografia() throws Exception {
        // Get the fotografia
        restFotografiaMockMvc.perform(get("/api/fotografias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFotografia() throws Exception {
        // Initialize the database
        fotografiaRepository.saveAndFlush(fotografia);
        fotografiaSearchRepository.save(fotografia);
        int databaseSizeBeforeUpdate = fotografiaRepository.findAll().size();

        // Update the fotografia
        Fotografia updatedFotografia = fotografiaRepository.findOne(fotografia.getId());
        // Disconnect from session so that the updates on updatedFotografia are not directly saved in db
        em.detach(updatedFotografia);
        updatedFotografia
            .urlImage(UPDATED_URL_IMAGE);
        FotografiaDTO fotografiaDTO = fotografiaMapper.toDto(updatedFotografia);

        restFotografiaMockMvc.perform(put("/api/fotografias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fotografiaDTO)))
            .andExpect(status().isOk());

        // Validate the Fotografia in the database
        List<Fotografia> fotografiaList = fotografiaRepository.findAll();
        assertThat(fotografiaList).hasSize(databaseSizeBeforeUpdate);
        Fotografia testFotografia = fotografiaList.get(fotografiaList.size() - 1);
        assertThat(testFotografia.getUrlImage()).isEqualTo(UPDATED_URL_IMAGE);

        // Validate the Fotografia in Elasticsearch
        Fotografia fotografiaEs = fotografiaSearchRepository.findOne(testFotografia.getId());
        assertThat(fotografiaEs).isEqualToIgnoringGivenFields(testFotografia);
    }

    @Test
    @Transactional
    public void updateNonExistingFotografia() throws Exception {
        int databaseSizeBeforeUpdate = fotografiaRepository.findAll().size();

        // Create the Fotografia
        FotografiaDTO fotografiaDTO = fotografiaMapper.toDto(fotografia);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFotografiaMockMvc.perform(put("/api/fotografias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fotografiaDTO)))
            .andExpect(status().isCreated());

        // Validate the Fotografia in the database
        List<Fotografia> fotografiaList = fotografiaRepository.findAll();
        assertThat(fotografiaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFotografia() throws Exception {
        // Initialize the database
        fotografiaRepository.saveAndFlush(fotografia);
        fotografiaSearchRepository.save(fotografia);
        int databaseSizeBeforeDelete = fotografiaRepository.findAll().size();

        // Get the fotografia
        restFotografiaMockMvc.perform(delete("/api/fotografias/{id}", fotografia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean fotografiaExistsInEs = fotografiaSearchRepository.exists(fotografia.getId());
        assertThat(fotografiaExistsInEs).isFalse();

        // Validate the database is empty
        List<Fotografia> fotografiaList = fotografiaRepository.findAll();
        assertThat(fotografiaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchFotografia() throws Exception {
        // Initialize the database
        fotografiaRepository.saveAndFlush(fotografia);
        fotografiaSearchRepository.save(fotografia);

        // Search the fotografia
        restFotografiaMockMvc.perform(get("/api/_search/fotografias?query=id:" + fotografia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fotografia.getId().intValue())))
            .andExpect(jsonPath("$.[*].urlImage").value(hasItem(DEFAULT_URL_IMAGE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fotografia.class);
        Fotografia fotografia1 = new Fotografia();
        fotografia1.setId(1L);
        Fotografia fotografia2 = new Fotografia();
        fotografia2.setId(fotografia1.getId());
        assertThat(fotografia1).isEqualTo(fotografia2);
        fotografia2.setId(2L);
        assertThat(fotografia1).isNotEqualTo(fotografia2);
        fotografia1.setId(null);
        assertThat(fotografia1).isNotEqualTo(fotografia2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FotografiaDTO.class);
        FotografiaDTO fotografiaDTO1 = new FotografiaDTO();
        fotografiaDTO1.setId(1L);
        FotografiaDTO fotografiaDTO2 = new FotografiaDTO();
        assertThat(fotografiaDTO1).isNotEqualTo(fotografiaDTO2);
        fotografiaDTO2.setId(fotografiaDTO1.getId());
        assertThat(fotografiaDTO1).isEqualTo(fotografiaDTO2);
        fotografiaDTO2.setId(2L);
        assertThat(fotografiaDTO1).isNotEqualTo(fotografiaDTO2);
        fotografiaDTO1.setId(null);
        assertThat(fotografiaDTO1).isNotEqualTo(fotografiaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(fotografiaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(fotografiaMapper.fromId(null)).isNull();
    }
}
