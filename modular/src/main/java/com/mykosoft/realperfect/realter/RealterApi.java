package com.mykosoft.realperfect.realter;


import com.mykosoft.realperfect.model.Realter;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class RealterApi {
    private static final Logger LOGGER = Logger.
            getLogger(com.mykosoft.realperfect.realter.RealterApi.class);

    @Autowired
    private RealterService realterService;

    @RequestMapping(method = RequestMethod.GET, value = "/realters/find")
    public ResponseEntity<Iterable<Realter>> addCity(@RequestParam String query) {
        Iterable<Realter> realters = realterService.findByNameOrSurnameLike(query);

        return new ResponseEntity<>(realters, HttpStatus.OK);
    }
}
