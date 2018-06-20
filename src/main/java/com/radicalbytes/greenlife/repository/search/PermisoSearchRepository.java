package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Permiso;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Permiso entity.
 */
public interface PermisoSearchRepository extends ElasticsearchRepository<Permiso, Long> {
}
