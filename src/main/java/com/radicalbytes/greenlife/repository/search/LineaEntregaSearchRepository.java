package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.LineaEntrega;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LineaEntrega entity.
 */
public interface LineaEntregaSearchRepository extends ElasticsearchRepository<LineaEntrega, Long> {
}
