package com.example.springboot.loader;

import com.example.springboot.constants.Roles;
import com.example.springboot.entities.Animal;
import com.example.springboot.entities.Hostel;
import com.example.springboot.entities.Role;
import com.example.springboot.entities.User;
import com.example.springboot.repositories.AnimalRepository;
import com.example.springboot.repositories.HostelRepository;
import com.example.springboot.repositories.RoleRepository;
import com.example.springboot.repositories.UserRepository;
import javafx.beans.binding.ListBinding;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner {
    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HostelRepository hostelRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if(this.hostelRepository.count() == 0)
        {
            this.hostelRepository.save(new Hostel("Capsule Hostel", "Вул. Соборна 14"));
            this.hostelRepository.save(new Hostel("Animals Hostel", "Вул. Київська 21"));
        }
        if(this.animalRepository.count() == 0)
        {
            this.animalRepository.save(new Animal("Собака Джима"));
            this.animalRepository.save(new Animal("Кіт Аліси"));
            this.animalRepository.save(new Animal("Кродил Тома"));
        }
        if(this.roleRepository.count() == 0)
        {
            this.roleRepository.save(new Role(Roles.Admin));
            this.roleRepository.save(new Role(Roles.User));
        }
        if(this.userRepository.count() == 0)
        {
            User semen_user = new User("semen@gmail.com", passwordEncoder.encode("123456"));
            semen_user.addRole(new Role(Roles.Admin));
            this.userRepository.save(semen_user);

            User user = new User("user@gmail.com", passwordEncoder.encode("123456"));
            user.addRole(new Role(Roles.User));
            this.userRepository.save(user);
        }
    }
}
