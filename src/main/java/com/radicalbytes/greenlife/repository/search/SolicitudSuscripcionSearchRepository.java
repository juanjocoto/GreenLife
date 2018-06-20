package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.SolicitudSuscripcion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SolicitudSuscripcion entity.
 */
public interface SolicitudSuscripcionSearchRepository extends ElasticsearchRepository<SolicitudSuscripcion, Long> {
}
