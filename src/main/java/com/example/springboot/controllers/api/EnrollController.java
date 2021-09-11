package com.example.springboot.controllers.api;

import com.example.springboot.dto.EnrollRequest;
import com.example.springboot.entities.Animal;
import com.example.springboot.entities.Hostel;
import com.example.springboot.repositories.AnimalRepository;
import com.example.springboot.repositories.HostelRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/public")
public class EnrollController {
    private final HostelRepository hostelRepository;
    private final AnimalRepository animalRepository;

    @PostMapping("/enroll")
    public HttpStatus enrollHostel(@RequestBody @Valid EnrollRequest request) {
        try {
            if(request.getAnimalName() == "" || request.getHostelId() == -1) return HttpStatus.BAD_REQUEST;
            Optional<Hostel> selectedHostel = hostelRepository.findById(request.getHostelId());
            if(selectedHostel.isPresent()) {
                Hostel hostel = selectedHostel.get();
                Animal newAnimal = animalRepository.save(new Animal(request.getAnimalName()));
                hostel.addAnimal(newAnimal);
                hostelRepository.save(hostel);
                return HttpStatus.CREATED;
            }
            return HttpStatus.BAD_REQUEST;
        } catch (Exception e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @GetMapping("/get-animals-{hostel_id}")
    public List<Animal> getAnimalsByHostel(@PathVariable("hostel_id") int hostel_id) {
        try {
            Optional<Hostel> selectedHostel = hostelRepository.findById(hostel_id);
            if(selectedHostel.isPresent()) {
                Hostel hostel = selectedHostel.get();
                return hostel.getAnimals();
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }
}
