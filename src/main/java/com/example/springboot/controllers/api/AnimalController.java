package com.example.springboot.controllers.api;

import com.example.springboot.entities.Animal;
import com.example.springboot.repositories.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AnimalController {
    private final AnimalRepository animalRepository;

    @Autowired
    public AnimalController(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    @GetMapping("/animals")
    public List<Animal> index() { return (List<Animal>) animalRepository.findAll(); }

    @GetMapping("/animals/{id}")
    public ResponseEntity<Animal> getAnimalById(@PathVariable("id") int id) {
        Optional<Animal> animal = animalRepository.findById(id);

        if (animal.isPresent()) {
            return new ResponseEntity<>(animal.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/animals")
    public ResponseEntity<Animal> createAnimal(@RequestBody Animal animal) {
        try {
            Animal newAnimal = animalRepository.save(animal);
            return new ResponseEntity<>(newAnimal, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/animals/{id}")
    public ResponseEntity<Animal> deleteAnimal(@PathVariable("id") int id) {
        Optional<Animal> animal = animalRepository.findById(id);

        if (animal.isPresent()) {
            try {
                animalRepository.delete(animal.get());
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/animals")
    public ResponseEntity<Animal> updateAnimal(@RequestBody Animal animal) {
        Optional<Animal> animalExist = animalRepository.findById(animal.getId());

        if(animalExist.isPresent()) {
            Animal updated = animalRepository.save(animal);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
