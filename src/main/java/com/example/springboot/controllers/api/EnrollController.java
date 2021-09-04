package com.example.springboot.controllers.api;

import com.example.springboot.dto.EnrollRequest;
import com.example.springboot.entities.Animal;
import com.example.springboot.entities.Hostel;
import com.example.springboot.repositories.AnimalRepository;
import com.example.springboot.repositories.HostelRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/public")
public class EnrollController {
    private final HostelRepository hostelRepository;
    private final AnimalRepository animalRepository;

    @PostMapping("/enroll")
    public ResponseEntity<Hostel> enrollHostel(@RequestBody EnrollRequest request) {
        try {
            Animal newAnimal = animalRepository.save(new Animal(request.getAnimalName()));
            Optional<Hostel> selectedHostel = hostelRepository.findById(request.getHostelId());
            if(selectedHostel.isPresent()) {
                selectedHostel.get().addAnimal(newAnimal);
            }
            return new ResponseEntity<>(selectedHostel.get(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
