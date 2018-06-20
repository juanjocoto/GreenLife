package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Comercio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Comercio entity.
 */
public interface ComercioSearchRepository extends ElasticsearchRepository<Comercio, Long> {
}
