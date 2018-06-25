package com.radicalbytes.greenlife.repository.search;

import java.util.Optional;

import com.radicalbytes.greenlife.domain.User;
import com.radicalbytes.greenlife.domain.Usuario;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Usuario entity.
 */
public interface UsuarioSearchRepository extends ElasticsearchRepository<Usuario, Long> {
}
