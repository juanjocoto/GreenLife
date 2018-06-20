package com.radicalbytes.greenlife.repository;

import com.radicalbytes.greenlife.domain.Fotografia;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Fotografia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FotografiaRepository extends JpaRepository<Fotografia, Long> {

}
