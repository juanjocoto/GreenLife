package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Local;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Local entity.
 */
public interface LocalSearchRepository extends ElasticsearchRepository<Local, Long> {
}
