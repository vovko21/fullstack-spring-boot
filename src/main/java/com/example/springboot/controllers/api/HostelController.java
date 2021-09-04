package com.example.springboot.controllers.api;

import com.example.springboot.entities.Hostel;
import com.example.springboot.repositories.HostelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hostels")
public class HostelController {
    private final HostelRepository hostelRepository;

    @Autowired
    public HostelController(HostelRepository hostelRepository) {
        this.hostelRepository = hostelRepository;
    }

    @GetMapping("/all")
    public List<Hostel> index() { return (List<Hostel>) hostelRepository.findAll(); }

    @GetMapping("/count")
    public int count() { return ((List<Hostel>)hostelRepository.findAll()).size(); }

    @GetMapping("/limit={count}")
    public List<Hostel> all(@PathVariable("count") int count) {
        return ((List<Hostel>)hostelRepository.findAll()).stream().limit(count).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hostel> getAnimalById(@PathVariable("id") int id) {
        Optional<Hostel> hostel = hostelRepository.findById(id);

        if (hostel.isPresent()) {
            return new ResponseEntity<>(hostel.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Hostel> createAnimal(@RequestBody Hostel animal) {
        try {
            Hostel newHostel = hostelRepository.save(animal);
            return new ResponseEntity<>(newHostel, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Hostel> deleteAnimal(@PathVariable("id") int id) {
        Optional<Hostel> hostel = hostelRepository.findById(id);

        if (hostel.isPresent()) {
            try {
                hostelRepository.delete(hostel.get());
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Hostel> updateAnimal(@RequestBody Hostel hostel) {
        Optional<Hostel> hostelExist = hostelRepository.findById(hostel.getId());

        if(hostelExist.isPresent()) {
            Hostel updated = hostelRepository.save(hostel);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
