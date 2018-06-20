package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.CadenaEntrega;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CadenaEntrega entity.
 */
public interface CadenaEntregaSearchRepository extends ElasticsearchRepository<CadenaEntrega, Long> {
}
