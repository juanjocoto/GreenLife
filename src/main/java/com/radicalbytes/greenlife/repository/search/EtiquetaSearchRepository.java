package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Etiqueta;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Etiqueta entity.
 */
public interface EtiquetaSearchRepository extends ElasticsearchRepository<Etiqueta, Long> {
}
