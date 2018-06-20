package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.LineaEntrega;
import com.radicalbytes.greenlife.repository.LineaEntregaRepository;
import com.radicalbytes.greenlife.repository.search.LineaEntregaSearchRepository;
import com.radicalbytes.greenlife.service.dto.LineaEntregaDTO;
import com.radicalbytes.greenlife.service.mapper.LineaEntregaMapper;
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
 * Test class for the LineaEntregaResource REST controller.
 *
 * @see LineaEntregaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class LineaEntregaResourceIntTest {

    private static final Integer DEFAULT_CANTIDAD = 1;
    private static final Integer UPDATED_CANTIDAD = 2;

    @Autowired
    private LineaEntregaRepository lineaEntregaRepository;

    @Autowired
    private LineaEntregaMapper lineaEntregaMapper;

    @Autowired
    private LineaEntregaSearchRepository lineaEntregaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLineaEntregaMockMvc;

    private LineaEntrega lineaEntrega;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LineaEntregaResource lineaEntregaResource = new LineaEntregaResource(lineaEntregaRepository, lineaEntregaMapper, lineaEntregaSearchRepository);
        this.restLineaEntregaMockMvc = MockMvcBuilders.standaloneSetup(lineaEntregaResource)
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
    public static LineaEntrega createEntity(EntityManager em) {
        LineaEntrega lineaEntrega = new LineaEntrega()
            .cantidad(DEFAULT_CANTIDAD);
        return lineaEntrega;
    }

    @Before
    public void initTest() {
        lineaEntregaSearchRepository.deleteAll();
        lineaEntrega = createEntity(em);
    }

    @Test
    @Transactional
    public void createLineaEntrega() throws Exception {
        int databaseSizeBeforeCreate = lineaEntregaRepository.findAll().size();

        // Create the LineaEntrega
        LineaEntregaDTO lineaEntregaDTO = lineaEntregaMapper.toDto(lineaEntrega);
        restLineaEntregaMockMvc.perform(post("/api/linea-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lineaEntregaDTO)))
            .andExpect(status().isCreated());

        // Validate the LineaEntrega in the database
        List<LineaEntrega> lineaEntregaList = lineaEntregaRepository.findAll();
        assertThat(lineaEntregaList).hasSize(databaseSizeBeforeCreate + 1);
        LineaEntrega testLineaEntrega = lineaEntregaList.get(lineaEntregaList.size() - 1);
        assertThat(testLineaEntrega.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);

        // Validate the LineaEntrega in Elasticsearch
        LineaEntrega lineaEntregaEs = lineaEntregaSearchRepository.findOne(testLineaEntrega.getId());
        assertThat(lineaEntregaEs).isEqualToIgnoringGivenFields(testLineaEntrega);
    }

    @Test
    @Transactional
    public void createLineaEntregaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lineaEntregaRepository.findAll().size();

        // Create the LineaEntrega with an existing ID
        lineaEntrega.setId(1L);
        LineaEntregaDTO lineaEntregaDTO = lineaEntregaMapper.toDto(lineaEntrega);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLineaEntregaMockMvc.perform(post("/api/linea-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lineaEntregaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LineaEntrega in the database
        List<LineaEntrega> lineaEntregaList = lineaEntregaRepository.findAll();
        assertThat(lineaEntregaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCantidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = lineaEntregaRepository.findAll().size();
        // set the field null
        lineaEntrega.setCantidad(null);

        // Create the LineaEntrega, which fails.
        LineaEntregaDTO lineaEntregaDTO = lineaEntregaMapper.toDto(lineaEntrega);

        restLineaEntregaMockMvc.perform(post("/api/linea-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lineaEntregaDTO)))
            .andExpect(status().isBadRequest());

        List<LineaEntrega> lineaEntregaList = lineaEntregaRepository.findAll();
        assertThat(lineaEntregaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLineaEntregas() throws Exception {
        // Initialize the database
        lineaEntregaRepository.saveAndFlush(lineaEntrega);

        // Get all the lineaEntregaList
        restLineaEntregaMockMvc.perform(get("/api/linea-entregas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lineaEntrega.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)));
    }

    @Test
    @Transactional
    public void getLineaEntrega() throws Exception {
        // Initialize the database
        lineaEntregaRepository.saveAndFlush(lineaEntrega);

        // Get the lineaEntrega
        restLineaEntregaMockMvc.perform(get("/api/linea-entregas/{id}", lineaEntrega.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lineaEntrega.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD));
    }

    @Test
    @Transactional
    public void getNonExistingLineaEntrega() throws Exception {
        // Get the lineaEntrega
        restLineaEntregaMockMvc.perform(get("/api/linea-entregas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLineaEntrega() throws Exception {
        // Initialize the database
        lineaEntregaRepository.saveAndFlush(lineaEntrega);
        lineaEntregaSearchRepository.save(lineaEntrega);
        int databaseSizeBeforeUpdate = lineaEntregaRepository.findAll().size();

        // Update the lineaEntrega
        LineaEntrega updatedLineaEntrega = lineaEntregaRepository.findOne(lineaEntrega.getId());
        // Disconnect from session so that the updates on updatedLineaEntrega are not directly saved in db
        em.detach(updatedLineaEntrega);
        updatedLineaEntrega
            .cantidad(UPDATED_CANTIDAD);
        LineaEntregaDTO lineaEntregaDTO = lineaEntregaMapper.toDto(updatedLineaEntrega);

        restLineaEntregaMockMvc.perform(put("/api/linea-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lineaEntregaDTO)))
            .andExpect(status().isOk());

        // Validate the LineaEntrega in the database
        List<LineaEntrega> lineaEntregaList = lineaEntregaRepository.findAll();
        assertThat(lineaEntregaList).hasSize(databaseSizeBeforeUpdate);
        LineaEntrega testLineaEntrega = lineaEntregaList.get(lineaEntregaList.size() - 1);
        assertThat(testLineaEntrega.getCantidad()).isEqualTo(UPDATED_CANTIDAD);

        // Validate the LineaEntrega in Elasticsearch
        LineaEntrega lineaEntregaEs = lineaEntregaSearchRepository.findOne(testLineaEntrega.getId());
        assertThat(lineaEntregaEs).isEqualToIgnoringGivenFields(testLineaEntrega);
    }

    @Test
    @Transactional
    public void updateNonExistingLineaEntrega() throws Exception {
        int databaseSizeBeforeUpdate = lineaEntregaRepository.findAll().size();

        // Create the LineaEntrega
        LineaEntregaDTO lineaEntregaDTO = lineaEntregaMapper.toDto(lineaEntrega);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLineaEntregaMockMvc.perform(put("/api/linea-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lineaEntregaDTO)))
            .andExpect(status().isCreated());

        // Validate the LineaEntrega in the database
        List<LineaEntrega> lineaEntregaList = lineaEntregaRepository.findAll();
        assertThat(lineaEntregaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLineaEntrega() throws Exception {
        // Initialize the database
        lineaEntregaRepository.saveAndFlush(lineaEntrega);
        lineaEntregaSearchRepository.save(lineaEntrega);
        int databaseSizeBeforeDelete = lineaEntregaRepository.findAll().size();

        // Get the lineaEntrega
        restLineaEntregaMockMvc.perform(delete("/api/linea-entregas/{id}", lineaEntrega.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean lineaEntregaExistsInEs = lineaEntregaSearchRepository.exists(lineaEntrega.getId());
        assertThat(lineaEntregaExistsInEs).isFalse();

        // Validate the database is empty
        List<LineaEntrega> lineaEntregaList = lineaEntregaRepository.findAll();
        assertThat(lineaEntregaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchLineaEntrega() throws Exception {
        // Initialize the database
        lineaEntregaRepository.saveAndFlush(lineaEntrega);
        lineaEntregaSearchRepository.save(lineaEntrega);

        // Search the lineaEntrega
        restLineaEntregaMockMvc.perform(get("/api/_search/linea-entregas?query=id:" + lineaEntrega.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lineaEntrega.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LineaEntrega.class);
        LineaEntrega lineaEntrega1 = new LineaEntrega();
        lineaEntrega1.setId(1L);
        LineaEntrega lineaEntrega2 = new LineaEntrega();
        lineaEntrega2.setId(lineaEntrega1.getId());
        assertThat(lineaEntrega1).isEqualTo(lineaEntrega2);
        lineaEntrega2.setId(2L);
        assertThat(lineaEntrega1).isNotEqualTo(lineaEntrega2);
        lineaEntrega1.setId(null);
        assertThat(lineaEntrega1).isNotEqualTo(lineaEntrega2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LineaEntregaDTO.class);
        LineaEntregaDTO lineaEntregaDTO1 = new LineaEntregaDTO();
        lineaEntregaDTO1.setId(1L);
        LineaEntregaDTO lineaEntregaDTO2 = new LineaEntregaDTO();
        assertThat(lineaEntregaDTO1).isNotEqualTo(lineaEntregaDTO2);
        lineaEntregaDTO2.setId(lineaEntregaDTO1.getId());
        assertThat(lineaEntregaDTO1).isEqualTo(lineaEntregaDTO2);
        lineaEntregaDTO2.setId(2L);
        assertThat(lineaEntregaDTO1).isNotEqualTo(lineaEntregaDTO2);
        lineaEntregaDTO1.setId(null);
        assertThat(lineaEntregaDTO1).isNotEqualTo(lineaEntregaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(lineaEntregaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(lineaEntregaMapper.fromId(null)).isNull();
    }
}
