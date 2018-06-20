package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.CentroAcopio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CentroAcopio entity.
 */
public interface CentroAcopioSearchRepository extends ElasticsearchRepository<CentroAcopio, Long> {
}
