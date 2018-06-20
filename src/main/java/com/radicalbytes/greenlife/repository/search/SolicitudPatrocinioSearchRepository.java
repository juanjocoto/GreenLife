package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.SolicitudPatrocinio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SolicitudPatrocinio entity.
 */
public interface SolicitudPatrocinioSearchRepository extends ElasticsearchRepository<SolicitudPatrocinio, Long> {
}
