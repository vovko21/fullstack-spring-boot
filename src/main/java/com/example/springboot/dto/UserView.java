package com.example.springboot.dto;

import com.example.springboot.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserView {

    public UserView () {}

    private Long id;

    private String username;
    private String token;
    private List<Role> roles;
}