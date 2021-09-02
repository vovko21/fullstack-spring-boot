package com.example.springboot.controllers.api;

import com.example.springboot.entities.User;
import com.example.springboot.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/users")
public class UsersController {

    private final UserRepository userRepository;

    @GetMapping("/all")
    public List<User> all() { return (List<User>) userRepository.findAll(); }

    @GetMapping("/count")
    public int count() { return ((List<User>)this.userRepository.findAll()).size(); }
}