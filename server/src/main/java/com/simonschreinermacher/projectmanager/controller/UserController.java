package com.simonschreinermacher.projectmanager.controller;

import com.simonschreinermacher.projectmanager.models.User;
import com.simonschreinermacher.projectmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/user")
    public List<User> getUser(){
        List<User> userList = userRepository.findAll();
        return userList;
    }
}
