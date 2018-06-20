package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.CategoriaAlimentacion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CategoriaAlimentacion entity.
 */
public interface CategoriaAlimentacionSearchRepository extends ElasticsearchRepository<CategoriaAlimentacion, Long> {
}
