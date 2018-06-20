package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Publicacion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Publicacion entity.
 */
public interface PublicacionSearchRepository extends ElasticsearchRepository<Publicacion, Long> {
}
