package com.mykosoft.realperfect.address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mykosoft.realperfect.model.City;
import com.mykosoft.realperfect.repository.CityRepository;

@Service
public class CityService {
	@Autowired
	private CityRepository cityRepository;
	
	public City add(City city){
		return cityRepository.save(city);
	}

	public Iterable<City> getAll() {
		return cityRepository.findAll();
	}
	
	public Iterable<City> getAllWithFilter(String queryFromUi) {
		String likeClause = queryFromUi + "%";
		
		return cityRepository.findByNameIgnoreCaseLikeOrderByNameAsc(likeClause);
	}
}
