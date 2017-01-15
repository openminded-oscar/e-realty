package com.mykosoft.realperfect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mykosoft.realperfect.model.City;

@Repository
public interface CityRepository extends CrudRepository<City, Long> {
	Iterable<City> findByNameIgnoreCaseLikeOrderByNameAsc(String name);
}
