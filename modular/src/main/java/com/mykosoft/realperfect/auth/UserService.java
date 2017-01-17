package com.mykosoft.realperfect.auth;

import com.mykosoft.realperfect.model.User;

public interface UserService {
    void save(User user);

    User findByLogin(String username);
}