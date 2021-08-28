package com.example.springboot.controllers.api;

import com.example.springboot.dto.UserView;
import com.example.springboot.entities.User;
import com.example.springboot.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.mariadb.jdbc.internal.logging.Logger;
import org.mariadb.jdbc.internal.logging.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/public")
public class UsersController {

    private final UserRepository userRepository;
    private static Logger logger = LoggerFactory.getLogger(UsersController.class);

    @PostMapping("allusers")
    public List<UserView> getAllUsers () {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        logger.info(auth.getName());
        if (auth == null) return null;
        List<UserView> userViewList = new ArrayList<UserView>();
        for (User user: userRepository.findAll()) {
            userViewList.add(new UserView(user.getId(), user.getUsername(), user.getFullName()));
        }

        return userViewList;
    }
}
