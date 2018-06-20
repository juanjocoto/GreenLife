package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.DiaEntrega;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DiaEntrega entity.
 */
public interface DiaEntregaSearchRepository extends ElasticsearchRepository<DiaEntrega, Long> {
}
