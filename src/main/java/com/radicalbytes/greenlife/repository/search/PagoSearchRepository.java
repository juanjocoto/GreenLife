package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Pago;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Pago entity.
 */
public interface PagoSearchRepository extends ElasticsearchRepository<Pago, Long> {
}
