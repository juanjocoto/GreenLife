package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.CobroMensualidad;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CobroMensualidad entity.
 */
public interface CobroMensualidadSearchRepository extends ElasticsearchRepository<CobroMensualidad, Long> {
}
