package com.simonschreinermacher.projectmanager.controller;

import com.simonschreinermacher.projectmanager.models.Project;
import com.simonschreinermacher.projectmanager.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    @Autowired
    ProjectRepository projectRepository;

    @GetMapping("/projects")
    public List<Project> getAllProjects(){
        List<Project> allProjects = projectRepository.findAll();
        return allProjects;
    }

    @GetMapping("/projects/{project_id}")
    public ResponseEntity<Project> getProjectById(@PathVariable(value = "project_id") Long project_id){
        Optional<Project> project = projectRepository.findById(project_id);
        if(project.isPresent()){
            return new ResponseEntity<Project>(project.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
