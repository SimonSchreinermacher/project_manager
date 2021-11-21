package com.simonschreinermacher.projectmanager.services;

import com.simonschreinermacher.projectmanager.error.ResourceNotFoundException;
import com.simonschreinermacher.projectmanager.models.User;
import com.simonschreinermacher.projectmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findUserByAuthentication(){
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(username);
        if(user == null){
            System.out.println("ERROR: Could not load user " + username);
            throw new ResourceNotFoundException("Invalid user " + username);
        }
        return user;
    }

    public void saveUser(User user){
        userRepository.save(user);
    }

    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    public User findUserByUsername(String username){
        return userRepository.findByUsername(username);
    }
}
