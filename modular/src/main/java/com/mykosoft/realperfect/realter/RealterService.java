package com.mykosoft.realperfect.realter;

import com.mykosoft.realperfect.model.Realter;
import com.mykosoft.realperfect.repository.RealterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RealterService {
    @Autowired
    private RealterRepository realterRepository;

    public Iterable<Realter> findByNameOrSurnameLike(String query) {
        Iterable<Realter> realters = realterRepository.
                findByUser_NameStartingWithOrUser_SurnameStartingWith(query, query);

        return realters;
    }
}
