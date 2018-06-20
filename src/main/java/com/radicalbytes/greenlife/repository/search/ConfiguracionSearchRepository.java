package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Configuracion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Configuracion entity.
 */
public interface ConfiguracionSearchRepository extends ElasticsearchRepository<Configuracion, Long> {
}
