package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.Local;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Local entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalRepository extends JpaRepository<Local, Long> {
    List<Local> findAllByComercio_id(Long id);
}
