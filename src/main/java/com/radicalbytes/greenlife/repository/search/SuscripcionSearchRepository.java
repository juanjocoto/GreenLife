package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Suscripcion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Suscripcion entity.
 */
public interface SuscripcionSearchRepository extends ElasticsearchRepository<Suscripcion, Long> {
}
