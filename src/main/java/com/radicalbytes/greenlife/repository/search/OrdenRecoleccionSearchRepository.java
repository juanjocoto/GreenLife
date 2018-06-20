package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.OrdenRecoleccion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the OrdenRecoleccion entity.
 */
public interface OrdenRecoleccionSearchRepository extends ElasticsearchRepository<OrdenRecoleccion, Long> {
}
