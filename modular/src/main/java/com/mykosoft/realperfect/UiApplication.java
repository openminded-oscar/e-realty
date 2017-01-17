package com.mykosoft.realperfect;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.mykosoft.realperfect.auth.UserDetailsServiceImpl;
import com.mykosoft.realperfect.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@SpringBootApplication
@EnableJpaRepositories("com.mykosoft.realperfect.repository")
@ComponentScan
@Controller
public class UiApplication {
    // Match everything without a suffix (so not a static resource)
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect() {
        // Forward to home page so that route is preserved.
        return "forward:/";
    }

    @RequestMapping("/user")
    @ResponseBody
    public Principal user(Principal user) {
        return user;
    }

    public static void main(String[] args) {
        SpringApplication.run(UiApplication.class, args);
    }
}