package com.mykosoft.realperfect.repository;

import com.mykosoft.realperfect.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User findByLogin(String login);
}
