package com.simonschreinermacher.projectmanager.controller;

import com.simonschreinermacher.projectmanager.models.User;
import com.simonschreinermacher.projectmanager.repositories.UserRepository;
import com.simonschreinermacher.projectmanager.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private JwtTokenProvider provider;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user")
    public List<User> getUser(){
        List<User> userList = userRepository.findAll();
        return userList;
    }

    @PostMapping("/login")
    public ResponseEntity<String> authenticate(@RequestBody Map<String, Object> payload){
        String username = payload.get("username").toString();
        String password = payload.get("password").toString();
        try{
            Authentication authentication = manager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            if(authentication.isAuthenticated()){
                String token = provider.createToken(username);
                return new ResponseEntity<String>(token, HttpStatus.OK);
            }
        }catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
        return null;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Map<String, Object> payload){
        String username = payload.get("username").toString();
        String password = payload.get("password").toString();
        try{
            if(userRepository.findByUsername(username) == null){
                User user = new User(null, username, new BCryptPasswordEncoder().encode(password));
                userRepository.save(user);
                return new ResponseEntity<String>("Saved new user " + username, HttpStatus.OK);
            }
            else{
                return new ResponseEntity<String>("User " + username + " already exists", HttpStatus.CONFLICT);
            }

        }
        catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

}
