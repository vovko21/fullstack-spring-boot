package com.example.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserView {

    public UserView () {}

    private Long id;

    private String username;
    private String token;

}