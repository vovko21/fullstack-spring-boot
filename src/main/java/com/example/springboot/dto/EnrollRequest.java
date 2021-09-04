package com.example.springboot.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class EnrollRequest {
    @NotNull
    private String animalName;
    @NotNull
    private int hostelId;
}
