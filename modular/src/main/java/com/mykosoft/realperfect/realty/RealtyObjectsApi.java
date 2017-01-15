package com.mykosoft.realperfect.realty;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mykosoft.realperfect.model.RealtyObject;
import com.mykosoft.realperfect.model.filtering.RealtyObjectsFilter;

@RestController
public class RealtyObjectsApi {
	private static final Logger LOGGER = Logger.getLogger(RealtyObjectsApi.class);
	
	@Autowired
	private RealtyObjectsService realtyObjectsService;
	
	@RequestMapping(method = RequestMethod.GET, value="/realty-objects/{objectId}")
	public ResponseEntity<RealtyObject> getObjectDetails(@PathVariable Long objectId){
		RealtyObject realtyObject = realtyObjectsService.getObjectById(objectId);
		
		return new ResponseEntity<RealtyObject>(realtyObject, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/realty-objects")
	public ResponseEntity<Iterable<RealtyObject>> getAllRealtyObjects(@RequestBody RealtyObjectsFilter objectsFilter){
		Iterable<RealtyObject> allObjects = realtyObjectsService.getAll(objectsFilter);
		
		return new ResponseEntity<Iterable<RealtyObject>>(allObjects, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/realty-object/add")
	public ResponseEntity<RealtyObject> postRealtyObject(@RequestBody RealtyObject realtyObject){
		RealtyObject addedObject = realtyObjectsService.add(realtyObject);
		LOGGER.info(realtyObject);

		return new ResponseEntity<RealtyObject>(addedObject, HttpStatus.OK);
	}

}
