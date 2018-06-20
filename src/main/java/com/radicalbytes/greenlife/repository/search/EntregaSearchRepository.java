package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Entrega;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Entrega entity.
 */
public interface EntregaSearchRepository extends ElasticsearchRepository<Entrega, Long> {
}
