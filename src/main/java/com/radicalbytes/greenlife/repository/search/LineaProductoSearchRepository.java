package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.LineaProducto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LineaProducto entity.
 */
public interface LineaProductoSearchRepository extends ElasticsearchRepository<LineaProducto, Long> {
}
