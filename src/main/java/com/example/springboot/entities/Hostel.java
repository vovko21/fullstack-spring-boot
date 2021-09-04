package com.example.springboot.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Hostel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 255, nullable = false)
    private String name;

    @Column(length = 255, nullable = false)
    private String adress;

    @OneToMany
    @JoinColumn(name = "hostel_id", referencedColumnName = "id")
    private List<Animal> animals;

    public Hostel(String name, String adress) {
        this.name = name;
        this.adress = adress;
    }
}
