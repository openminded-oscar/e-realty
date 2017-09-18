package com.mykosoft.realperfect.realty;

import com.mykosoft.realperfect.model.BuildingType;
import com.mykosoft.realperfect.model.OperationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mykosoft.realperfect.model.RealtyObject;
import com.mykosoft.realperfect.model.filtering.RealtyObjectSpecification;
import com.mykosoft.realperfect.model.filtering.RealtyObjectsFilter;
import com.mykosoft.realperfect.repository.RealtyObjectRepository;

import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Service
public class RealtyObjectsService {
    @Autowired
    private RealtyObjectRepository realtyObjectRepository;

    @SuppressWarnings("unchecked")
    public Iterable<RealtyObject> getAll(RealtyObjectsFilter objectsFilter) {
        return realtyObjectRepository.findAll(new RealtyObjectSpecification(objectsFilter));
    }

    public RealtyObject add(RealtyObject realtyObject) {
        return realtyObjectRepository.save(realtyObject);
    }

    public RealtyObject getObjectById(Long objectId) {
        return realtyObjectRepository.findOne(objectId);
    }

    public Set<BuildingType> getRealtyBuildingTypes(){
        Set<BuildingType> buildingTypes = new HashSet<>();
        Collections.addAll(buildingTypes, BuildingType.values());

        return buildingTypes;
    }

    public Set<OperationType> getRealtyOperationTypes() {
        Set<OperationType> operationTypes = new HashSet<>();
        Collections.addAll(operationTypes, OperationType.values());

        return operationTypes;
    }
}
