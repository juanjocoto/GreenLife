package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.CadenaOrdenRecoleccion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CadenaOrdenRecoleccion entity.
 */
public interface CadenaOrdenRecoleccionSearchRepository extends ElasticsearchRepository<CadenaOrdenRecoleccion, Long> {
}
