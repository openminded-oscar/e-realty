package com.mykosoft.realperfect.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mykosoft.realperfect.model.RealtyObject;

@Repository
public interface RealtyObjectRepository extends CrudRepository<RealtyObject, Long>,
        JpaSpecificationExecutor {

}
