package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Administrador;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Administrador entity.
 */
public interface AdministradorSearchRepository extends ElasticsearchRepository<Administrador, Long> {
}
