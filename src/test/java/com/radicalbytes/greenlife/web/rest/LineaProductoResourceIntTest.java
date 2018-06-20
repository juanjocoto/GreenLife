package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.LineaProducto;
import com.radicalbytes.greenlife.repository.LineaProductoRepository;
import com.radicalbytes.greenlife.repository.search.LineaProductoSearchRepository;
import com.radicalbytes.greenlife.service.dto.LineaProductoDTO;
import com.radicalbytes.greenlife.service.mapper.LineaProductoMapper;
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
 * Test class for the LineaProductoResource REST controller.
 *
 * @see LineaProductoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class LineaProductoResourceIntTest {

    private static final Integer DEFAULT_CANTIDAD = 1;
    private static final Integer UPDATED_CANTIDAD = 2;

    private static final Float DEFAULT_PRECIO_UNITARIO = 1F;
    private static final Float UPDATED_PRECIO_UNITARIO = 2F;

    @Autowired
    private LineaProductoRepository lineaProductoRepository;

    @Autowired
    private LineaProductoMapper lineaProductoMapper;

    @Autowired
    private LineaProductoSearchRepository lineaProductoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLineaProductoMockMvc;

    private LineaProducto lineaProducto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LineaProductoResource lineaProductoResource = new LineaProductoResource(lineaProductoRepository, lineaProductoMapper, lineaProductoSearchRepository);
        this.restLineaProductoMockMvc = MockMvcBuilders.standaloneSetup(lineaProductoResource)
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
    public static LineaProducto createEntity(EntityManager em) {
        LineaProducto lineaProducto = new LineaProducto()
            .cantidad(DEFAULT_CANTIDAD)
            .precioUnitario(DEFAULT_PRECIO_UNITARIO);
        return lineaProducto;
    }

    @Before
    public void initTest() {
        lineaProductoSearchRepository.deleteAll();
        lineaProducto = createEntity(em);
    }

    @Test
    @Transactional
    public void createLineaProducto() throws Exception {
        int databaseSizeBeforeCreate = lineaProductoRepository.findAll().size();

        // Create the LineaProducto
        LineaProductoDTO lineaProductoDTO = lineaProductoMapper.toDto(lineaProducto);
        restLineaProductoMockMvc.perform(post("/api/linea-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lineaProductoDTO)))
            .andExpect(status().isCreated());

        // Validate the LineaProducto in the database
        List<LineaProducto> lineaProductoList = lineaProductoRepository.findAll();
        assertThat(lineaProductoList).hasSize(databaseSizeBeforeCreate + 1);
        LineaProducto testLineaProducto = lineaProductoList.get(lineaProductoList.size() - 1);
        assertThat(testLineaProducto.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testLineaProducto.getPrecioUnitario()).isEqualTo(DEFAULT_PRECIO_UNITARIO);

        // Validate the LineaProducto in Elasticsearch
        LineaProducto lineaProductoEs = lineaProductoSearchRepository.findOne(testLineaProducto.getId());
        assertThat(lineaProductoEs).isEqualToIgnoringGivenFields(testLineaProducto);
    }

    @Test
    @Transactional
    public void createLineaProductoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lineaProductoRepository.findAll().size();

        // Create the LineaProducto with an existing ID
        lineaProducto.setId(1L);
        LineaProductoDTO lineaProductoDTO = lineaProductoMapper.toDto(lineaProducto);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLineaProductoMockMvc.perform(post("/api/linea-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lineaProductoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LineaProducto in the database
        List<LineaProducto> lineaProductoList = lineaProductoRepository.findAll();
        assertThat(lineaProductoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCantidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = lineaProductoRepository.findAll().size();
        // set the field null
        lineaProducto.setCantidad(null);

        // Create the LineaProducto, which fails.
        LineaProductoDTO lineaProductoDTO = lineaProductoMapper.toDto(lineaProducto);

        restLineaProductoMockMvc.perform(post("/api/linea-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lineaProductoDTO)))
            .andExpect(status().isBadRequest());

        List<LineaProducto> lineaProductoList = lineaProductoRepository.findAll();
        assertThat(lineaProductoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrecioUnitarioIsRequired() throws Exception {
        int databaseSizeBeforeTest = lineaProductoRepository.findAll().size();
        // set the field null
        lineaProducto.setPrecioUnitario(null);

        // Create the LineaProducto, which fails.
        LineaProductoDTO lineaProductoDTO = lineaProductoMapper.toDto(lineaProducto);

        restLineaProductoMockMvc.perform(post("/api/linea-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lineaProductoDTO)))
            .andExpect(status().isBadRequest());

        List<LineaProducto> lineaProductoList = lineaProductoRepository.findAll();
        assertThat(lineaProductoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLineaProductos() throws Exception {
        // Initialize the database
        lineaProductoRepository.saveAndFlush(lineaProducto);

        // Get all the lineaProductoList
        restLineaProductoMockMvc.perform(get("/api/linea-productos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lineaProducto.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)))
            .andExpect(jsonPath("$.[*].precioUnitario").value(hasItem(DEFAULT_PRECIO_UNITARIO.doubleValue())));
    }

    @Test
    @Transactional
    public void getLineaProducto() throws Exception {
        // Initialize the database
        lineaProductoRepository.saveAndFlush(lineaProducto);

        // Get the lineaProducto
        restLineaProductoMockMvc.perform(get("/api/linea-productos/{id}", lineaProducto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lineaProducto.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD))
            .andExpect(jsonPath("$.precioUnitario").value(DEFAULT_PRECIO_UNITARIO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingLineaProducto() throws Exception {
        // Get the lineaProducto
        restLineaProductoMockMvc.perform(get("/api/linea-productos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLineaProducto() throws Exception {
        // Initialize the database
        lineaProductoRepository.saveAndFlush(lineaProducto);
        lineaProductoSearchRepository.save(lineaProducto);
        int databaseSizeBeforeUpdate = lineaProductoRepository.findAll().size();

        // Update the lineaProducto
        LineaProducto updatedLineaProducto = lineaProductoRepository.findOne(lineaProducto.getId());
        // Disconnect from session so that the updates on updatedLineaProducto are not directly saved in db
        em.detach(updatedLineaProducto);
        updatedLineaProducto
            .cantidad(UPDATED_CANTIDAD)
            .precioUnitario(UPDATED_PRECIO_UNITARIO);
        LineaProductoDTO lineaProductoDTO = lineaProductoMapper.toDto(updatedLineaProducto);

        restLineaProductoMockMvc.perform(put("/api/linea-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lineaProductoDTO)))
            .andExpect(status().isOk());

        // Validate the LineaProducto in the database
        List<LineaProducto> lineaProductoList = lineaProductoRepository.findAll();
        assertThat(lineaProductoList).hasSize(databaseSizeBeforeUpdate);
        LineaProducto testLineaProducto = lineaProductoList.get(lineaProductoList.size() - 1);
        assertThat(testLineaProducto.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testLineaProducto.getPrecioUnitario()).isEqualTo(UPDATED_PRECIO_UNITARIO);

        // Validate the LineaProducto in Elasticsearch
        LineaProducto lineaProductoEs = lineaProductoSearchRepository.findOne(testLineaProducto.getId());
        assertThat(lineaProductoEs).isEqualToIgnoringGivenFields(testLineaProducto);
    }

    @Test
    @Transactional
    public void updateNonExistingLineaProducto() throws Exception {
        int databaseSizeBeforeUpdate = lineaProductoRepository.findAll().size();

        // Create the LineaProducto
        LineaProductoDTO lineaProductoDTO = lineaProductoMapper.toDto(lineaProducto);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLineaProductoMockMvc.perform(put("/api/linea-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lineaProductoDTO)))
            .andExpect(status().isCreated());

        // Validate the LineaProducto in the database
        List<LineaProducto> lineaProductoList = lineaProductoRepository.findAll();
        assertThat(lineaProductoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLineaProducto() throws Exception {
        // Initialize the database
        lineaProductoRepository.saveAndFlush(lineaProducto);
        lineaProductoSearchRepository.save(lineaProducto);
        int databaseSizeBeforeDelete = lineaProductoRepository.findAll().size();

        // Get the lineaProducto
        restLineaProductoMockMvc.perform(delete("/api/linea-productos/{id}", lineaProducto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean lineaProductoExistsInEs = lineaProductoSearchRepository.exists(lineaProducto.getId());
        assertThat(lineaProductoExistsInEs).isFalse();

        // Validate the database is empty
        List<LineaProducto> lineaProductoList = lineaProductoRepository.findAll();
        assertThat(lineaProductoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchLineaProducto() throws Exception {
        // Initialize the database
        lineaProductoRepository.saveAndFlush(lineaProducto);
        lineaProductoSearchRepository.save(lineaProducto);

        // Search the lineaProducto
        restLineaProductoMockMvc.perform(get("/api/_search/linea-productos?query=id:" + lineaProducto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lineaProducto.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)))
            .andExpect(jsonPath("$.[*].precioUnitario").value(hasItem(DEFAULT_PRECIO_UNITARIO.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LineaProducto.class);
        LineaProducto lineaProducto1 = new LineaProducto();
        lineaProducto1.setId(1L);
        LineaProducto lineaProducto2 = new LineaProducto();
        lineaProducto2.setId(lineaProducto1.getId());
        assertThat(lineaProducto1).isEqualTo(lineaProducto2);
        lineaProducto2.setId(2L);
        assertThat(lineaProducto1).isNotEqualTo(lineaProducto2);
        lineaProducto1.setId(null);
        assertThat(lineaProducto1).isNotEqualTo(lineaProducto2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LineaProductoDTO.class);
        LineaProductoDTO lineaProductoDTO1 = new LineaProductoDTO();
        lineaProductoDTO1.setId(1L);
        LineaProductoDTO lineaProductoDTO2 = new LineaProductoDTO();
        assertThat(lineaProductoDTO1).isNotEqualTo(lineaProductoDTO2);
        lineaProductoDTO2.setId(lineaProductoDTO1.getId());
        assertThat(lineaProductoDTO1).isEqualTo(lineaProductoDTO2);
        lineaProductoDTO2.setId(2L);
        assertThat(lineaProductoDTO1).isNotEqualTo(lineaProductoDTO2);
        lineaProductoDTO1.setId(null);
        assertThat(lineaProductoDTO1).isNotEqualTo(lineaProductoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(lineaProductoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(lineaProductoMapper.fromId(null)).isNull();
    }
}
