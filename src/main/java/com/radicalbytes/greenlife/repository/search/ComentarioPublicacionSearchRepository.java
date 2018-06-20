package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.ComentarioPublicacion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ComentarioPublicacion entity.
 */
public interface ComentarioPublicacionSearchRepository extends ElasticsearchRepository<ComentarioPublicacion, Long> {
}
