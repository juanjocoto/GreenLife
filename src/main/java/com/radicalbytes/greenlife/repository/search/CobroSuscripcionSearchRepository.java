package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.CobroSuscripcion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CobroSuscripcion entity.
 */
public interface CobroSuscripcionSearchRepository extends ElasticsearchRepository<CobroSuscripcion, Long> {
}
