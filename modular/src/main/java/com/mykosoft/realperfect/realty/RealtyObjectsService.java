package com.mykosoft.realperfect.realty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mykosoft.realperfect.model.RealtyObject;
import com.mykosoft.realperfect.model.filtering.RealtyObjectSpecification;
import com.mykosoft.realperfect.model.filtering.RealtyObjectsFilter;
import com.mykosoft.realperfect.repository.RealtyObjectRepository;

@Service
public class RealtyObjectsService {
	@Autowired
	private RealtyObjectRepository realtyObjectRepository;
	
	@SuppressWarnings("unchecked")
	public Iterable<RealtyObject> getAll(RealtyObjectsFilter objectsFilter){
		return realtyObjectRepository.findAll(new RealtyObjectSpecification(objectsFilter));
	}

	public RealtyObject add(RealtyObject realtyObject) {
		return realtyObjectRepository.save(realtyObject);
	}

	public RealtyObject getObjectById(Long objectId) {
		return realtyObjectRepository.findOne(objectId);
	}
}
