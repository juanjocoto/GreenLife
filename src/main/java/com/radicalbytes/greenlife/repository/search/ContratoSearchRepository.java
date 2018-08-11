package com.radicalbytes.greenlife.repository.search;

import com.radicalbytes.greenlife.domain.Contrato;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Contrato entity.
 */
public interface ContratoSearchRepository extends ElasticsearchRepository<Contrato, Long> {
    void  deleteContratoByComercio_id(Long id);
}
