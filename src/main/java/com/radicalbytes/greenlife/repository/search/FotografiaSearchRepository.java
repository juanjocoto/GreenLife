package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Fotografia;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Fotografia entity.
 */
public interface FotografiaSearchRepository extends ElasticsearchRepository<Fotografia, Long> {
}
