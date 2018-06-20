package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Rol;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Rol entity.
 */
public interface RolSearchRepository extends ElasticsearchRepository<Rol, Long> {
}
