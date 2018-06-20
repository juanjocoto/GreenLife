package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Recolector;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Recolector entity.
 */
public interface RecolectorSearchRepository extends ElasticsearchRepository<Recolector, Long> {
}
