package com.example.springboot.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;
import com.example.springboot.entities.Animal;
import com.example.springboot.repositories.AnimalRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.PermitAll;

@Controller
@RequiredArgsConstructor
@PermitAll
public class FileUploadController {
    public static String uploadDirectory = System.getProperty("user.dir") + "/uploads";
    private final AnimalRepository animalRepository;

//    @RequestMapping("/uploadview")
//    public String UploadPage(Model model) {
//        return "uploadview";
//    }
//
//    @PostMapping("/upload")
//    public String upload(Model model, @RequestParam("id") int id, @RequestParam("file") MultipartFile file) throws NotFoundException, IOException {
//        Optional<Animal> animal = animalRepository.findById(id);
//        if (!animal.isPresent()) throw new NotFoundException("Animal didnt exist");
//
//        if (file != null && !file.getOriginalFilename().isEmpty()) {
//            File uploadDir = new File(uploadDirectory);
//
//            if (!uploadDir.exists()) {
//                uploadDir.mkdir();
//            }
//
//            String uuidFile = UUID.randomUUID().toString();
//            String resultFilename = uuidFile + "." + file.getOriginalFilename();
//
//            file.transferTo(new File(uploadDirectory + "/" + resultFilename));
//
//            animal.get().setFilename(resultFilename);
//        }
//
//        animalRepository.save(animal.get());
//
//        return "index";
//    }
}