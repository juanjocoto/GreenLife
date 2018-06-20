package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.TipoContrato;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TipoContrato entity.
 */
public interface TipoContratoSearchRepository extends ElasticsearchRepository<TipoContrato, Long> {
}
