package com.example.springboot.controllers.api;

import com.example.springboot.entities.Animal;
import com.example.springboot.entities.User;
import com.example.springboot.repositories.AnimalRepository;
import com.example.springboot.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/users")
public class UsersController {

    private final UserRepository userRepository;

    @GetMapping("/all")
    public List<User> all() { return userRepository.findAll(); }
}
