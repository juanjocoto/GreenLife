package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.ResenaComercio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ResenaComercio entity.
 */
public interface ResenaComercioSearchRepository extends ElasticsearchRepository<ResenaComercio, Long> {
}
