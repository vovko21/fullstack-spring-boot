package com.example.springboot.controllers.api;

import com.example.springboot.configure.security.JwtTokenUtil;
import com.example.springboot.constants.Roles;
import com.example.springboot.dto.AuthRequest;
import com.example.springboot.dto.RegisterRequest;
import com.example.springboot.dto.UserView;
import com.example.springboot.entities.Role;
import com.example.springboot.repositories.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Tag(name = "Authentication")
@RestController
@RequestMapping(path = "/api/public")
@RequiredArgsConstructor
public class AuthApi {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("login")
    public ResponseEntity<UserView> login(@RequestBody @Valid AuthRequest request) {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()));

            User user = (User) authenticate.getPrincipal();
            com.example.springboot.entities.User dbUser = userRepository
                    .findByUsername(user.getUsername());

            UserView userView = new UserView();
            String token = jwtTokenUtil.generateAccessToken(dbUser);
            userView.setUsername(user.getUsername());
            userView.setToken(token);
            userView.setRoles(dbUser.getRoles());

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, token)
                    .body(userView);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("register")
    public ResponseEntity<UserView> register(@RequestBody @Valid RegisterRequest request) {
        try {
            if (userRepository.findByUsername(request.getUsername()) != null) {
                return ResponseEntity.status(HttpStatus.IM_USED).build();
            }

            if (!request.getPassword().equals(request.getPasswordConfirm())) {
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
            }

            com.example.springboot.entities.User user = new com.example.springboot.entities.User(request.getUsername(),
                    bCryptPasswordEncoder.encode(request.getPassword()));
            user.addRole(new Role(Roles.User));
            userRepository.save(user);

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                            user.getUsername(), user.getPassword()));

            UserView userView = new UserView();
            String token = jwtTokenUtil.generateAccessToken(user);
            userView.setUsername(user.getUsername());
            userView.setToken(token);
            userView.setRoles(user.getRoles());

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, token)
                    .build();
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}

