package com.simonschreinermacher.projectmanager.controller;

import com.simonschreinermacher.projectmanager.models.Project;
import com.simonschreinermacher.projectmanager.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProjectController {

    @Autowired
    ProjectRepository projectRepository;

    @GetMapping("/projects")
    public List<Project> getAllProjects(){
        List<Project> allProjects = projectRepository.findAll();
        return allProjects;
    }
}
