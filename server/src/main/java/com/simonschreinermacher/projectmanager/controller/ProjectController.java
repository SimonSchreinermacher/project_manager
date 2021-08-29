package com.simonschreinermacher.projectmanager.controller;

import com.simonschreinermacher.projectmanager.models.Project;
import com.simonschreinermacher.projectmanager.models.Todo;
import com.simonschreinermacher.projectmanager.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

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

    @PostMapping("/projects")
    public ResponseEntity<Boolean> addProject(@RequestBody Map<String, Object> payload){
        Set<Todo> todos = new HashSet<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        String name = payload.get("name").toString();
        String description = payload.get("description").toString();
        String language = payload.get("language").toString();

        String createdOn_string = payload.get("createdOn").toString();
        LocalDate createdOn = LocalDate.parse(createdOn_string, formatter);

        String deadline_string = payload.get("deadline").toString();
        LocalDate deadline = LocalDate.parse(deadline_string, formatter);

        Project project = new Project(null, name, description, language, createdOn, deadline, todos);
        projectRepository.save(project);

        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }
}
