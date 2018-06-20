package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Evento;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Evento entity.
 */
public interface EventoSearchRepository extends ElasticsearchRepository<Evento, Long> {
}
