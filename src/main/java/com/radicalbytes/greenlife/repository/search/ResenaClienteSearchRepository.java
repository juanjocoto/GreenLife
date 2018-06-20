package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.ResenaCliente;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ResenaCliente entity.
 */
public interface ResenaClienteSearchRepository extends ElasticsearchRepository<ResenaCliente, Long> {
}
