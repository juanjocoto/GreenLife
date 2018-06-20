package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Patrocinador;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Patrocinador entity.
 */
public interface PatrocinadorSearchRepository extends ElasticsearchRepository<Patrocinador, Long> {
}
