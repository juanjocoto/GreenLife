package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Producto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Producto entity.
 */
public interface ProductoSearchRepository extends ElasticsearchRepository<Producto, Long> {
}
