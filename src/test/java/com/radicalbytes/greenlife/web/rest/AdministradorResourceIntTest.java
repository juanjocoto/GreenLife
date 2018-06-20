package com.radicalbytes.greenlife.web.rest;

import com.radicalbytes.greenlife.GreenlifeApp;

import com.radicalbytes.greenlife.domain.Administrador;
import com.radicalbytes.greenlife.repository.AdministradorRepository;
import com.radicalbytes.greenlife.repository.search.AdministradorSearchRepository;
import com.radicalbytes.greenlife.service.dto.AdministradorDTO;
import com.radicalbytes.greenlife.service.mapper.AdministradorMapper;
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
 * Test class for the AdministradorResource REST controller.
 *
 * @see AdministradorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenlifeApp.class)
public class AdministradorResourceIntTest {

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private AdministradorMapper administradorMapper;

    @Autowired
    private AdministradorSearchRepository administradorSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAdministradorMockMvc;

    private Administrador administrador;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AdministradorResource administradorResource = new AdministradorResource(administradorRepository, administradorMapper, administradorSearchRepository);
        this.restAdministradorMockMvc = MockMvcBuilders.standaloneSetup(administradorResource)
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
    public static Administrador createEntity(EntityManager em) {
        Administrador administrador = new Administrador();
        return administrador;
    }

    @Before
    public void initTest() {
        administradorSearchRepository.deleteAll();
        administrador = createEntity(em);
    }

    @Test
    @Transactional
    public void createAdministrador() throws Exception {
        int databaseSizeBeforeCreate = administradorRepository.findAll().size();

        // Create the Administrador
        AdministradorDTO administradorDTO = administradorMapper.toDto(administrador);
        restAdministradorMockMvc.perform(post("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administradorDTO)))
            .andExpect(status().isCreated());

        // Validate the Administrador in the database
        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeCreate + 1);
        Administrador testAdministrador = administradorList.get(administradorList.size() - 1);

        // Validate the Administrador in Elasticsearch
        Administrador administradorEs = administradorSearchRepository.findOne(testAdministrador.getId());
        assertThat(administradorEs).isEqualToIgnoringGivenFields(testAdministrador);
    }

    @Test
    @Transactional
    public void createAdministradorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = administradorRepository.findAll().size();

        // Create the Administrador with an existing ID
        administrador.setId(1L);
        AdministradorDTO administradorDTO = administradorMapper.toDto(administrador);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdministradorMockMvc.perform(post("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administradorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Administrador in the database
        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAdministradors() throws Exception {
        // Initialize the database
        administradorRepository.saveAndFlush(administrador);

        // Get all the administradorList
        restAdministradorMockMvc.perform(get("/api/administradors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(administrador.getId().intValue())));
    }

    @Test
    @Transactional
    public void getAdministrador() throws Exception {
        // Initialize the database
        administradorRepository.saveAndFlush(administrador);

        // Get the administrador
        restAdministradorMockMvc.perform(get("/api/administradors/{id}", administrador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(administrador.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAdministrador() throws Exception {
        // Get the administrador
        restAdministradorMockMvc.perform(get("/api/administradors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAdministrador() throws Exception {
        // Initialize the database
        administradorRepository.saveAndFlush(administrador);
        administradorSearchRepository.save(administrador);
        int databaseSizeBeforeUpdate = administradorRepository.findAll().size();

        // Update the administrador
        Administrador updatedAdministrador = administradorRepository.findOne(administrador.getId());
        // Disconnect from session so that the updates on updatedAdministrador are not directly saved in db
        em.detach(updatedAdministrador);
        AdministradorDTO administradorDTO = administradorMapper.toDto(updatedAdministrador);

        restAdministradorMockMvc.perform(put("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administradorDTO)))
            .andExpect(status().isOk());

        // Validate the Administrador in the database
        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeUpdate);
        Administrador testAdministrador = administradorList.get(administradorList.size() - 1);

        // Validate the Administrador in Elasticsearch
        Administrador administradorEs = administradorSearchRepository.findOne(testAdministrador.getId());
        assertThat(administradorEs).isEqualToIgnoringGivenFields(testAdministrador);
    }

    @Test
    @Transactional
    public void updateNonExistingAdministrador() throws Exception {
        int databaseSizeBeforeUpdate = administradorRepository.findAll().size();

        // Create the Administrador
        AdministradorDTO administradorDTO = administradorMapper.toDto(administrador);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAdministradorMockMvc.perform(put("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administradorDTO)))
            .andExpect(status().isCreated());

        // Validate the Administrador in the database
        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAdministrador() throws Exception {
        // Initialize the database
        administradorRepository.saveAndFlush(administrador);
        administradorSearchRepository.save(administrador);
        int databaseSizeBeforeDelete = administradorRepository.findAll().size();

        // Get the administrador
        restAdministradorMockMvc.perform(delete("/api/administradors/{id}", administrador.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean administradorExistsInEs = administradorSearchRepository.exists(administrador.getId());
        assertThat(administradorExistsInEs).isFalse();

        // Validate the database is empty
        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAdministrador() throws Exception {
        // Initialize the database
        administradorRepository.saveAndFlush(administrador);
        administradorSearchRepository.save(administrador);

        // Search the administrador
        restAdministradorMockMvc.perform(get("/api/_search/administradors?query=id:" + administrador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(administrador.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Administrador.class);
        Administrador administrador1 = new Administrador();
        administrador1.setId(1L);
        Administrador administrador2 = new Administrador();
        administrador2.setId(administrador1.getId());
        assertThat(administrador1).isEqualTo(administrador2);
        administrador2.setId(2L);
        assertThat(administrador1).isNotEqualTo(administrador2);
        administrador1.setId(null);
        assertThat(administrador1).isNotEqualTo(administrador2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AdministradorDTO.class);
        AdministradorDTO administradorDTO1 = new AdministradorDTO();
        administradorDTO1.setId(1L);
        AdministradorDTO administradorDTO2 = new AdministradorDTO();
        assertThat(administradorDTO1).isNotEqualTo(administradorDTO2);
        administradorDTO2.setId(administradorDTO1.getId());
        assertThat(administradorDTO1).isEqualTo(administradorDTO2);
        administradorDTO2.setId(2L);
        assertThat(administradorDTO1).isNotEqualTo(administradorDTO2);
        administradorDTO1.setId(null);
        assertThat(administradorDTO1).isNotEqualTo(administradorDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(administradorMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(administradorMapper.fromId(null)).isNull();
    }
}
