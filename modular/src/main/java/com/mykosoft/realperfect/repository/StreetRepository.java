package com.mykosoft.realperfect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mykosoft.realperfect.model.StreetInCity;

@Repository
public interface StreetRepository extends CrudRepository<StreetInCity, Long>{
	Iterable<StreetInCity> findByNameIgnoreCaseLikeAndCity_IdOrderByNameAsc(String name, Long cityId);
}
