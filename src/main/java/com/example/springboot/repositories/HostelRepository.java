package com.example.springboot.repositories;

import com.example.springboot.entities.Hostel;
import org.springframework.data.repository.CrudRepository;

public interface HostelRepository extends CrudRepository<Hostel, Integer> {}
