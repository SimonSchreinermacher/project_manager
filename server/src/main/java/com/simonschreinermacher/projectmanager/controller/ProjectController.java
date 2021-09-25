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

    @PostMapping("/projects/{project_id}/todos")
    public ResponseEntity<Boolean> addTodo(@RequestBody Map<String, Object> payload, @PathVariable(value = "project_id") String project_id){
        String title = payload.get("title").toString();
        String importance = payload.get("importance").toString();
        String category = payload.get("category").toString();

        Todo todo = new Todo(null, title, category, importance, false);

        Optional<Project> projectOptional = projectRepository.findById(Long.parseLong(project_id));
        if(projectOptional.isPresent()){
            Project project = projectOptional.get();
            project.addTodo(todo);
            projectRepository.save(project);
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }

        return new ResponseEntity<Boolean>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/projects/{project_id}")
    public ResponseEntity<Boolean> deleteProject(@PathVariable(value = "project_id") String project_id){
        projectRepository.deleteById(Long.parseLong(project_id));
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @DeleteMapping("/projects/{project_id}/todos/{todo_id}")
    public ResponseEntity<Boolean> deleteTodo(@PathVariable(value = "project_id") String project_id, @PathVariable(value = "todo_id") String todo_id){
        Optional<Project> optionalProject = projectRepository.findById(Long.parseLong(project_id));
        if(optionalProject.isPresent()){
            Project project = optionalProject.get();
            project.removeTodo(Long.parseLong(todo_id));
            projectRepository.save(project);
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }
        return new ResponseEntity<Boolean>(false, HttpStatus.NOT_FOUND);
    }

    @PutMapping("/projects/{project_id}")
    public ResponseEntity<Boolean> editProject(@PathVariable(value= "project_id") String project_id, @RequestBody Map<String, Object> payload){
        System.out.println(payload);
        String name = payload.get("name").toString();
        String description = payload.get("description").toString();
        String deadline = payload.get("deadline").toString();
        String createdOn = payload.get("createdOn").toString();
        String language = payload.get("language").toString();

        Optional<Project> projectOptional = projectRepository.findById(Long.parseLong(project_id));
        if(projectOptional.isPresent()){
            Project project = projectOptional.get();
            project.setName(name);
            project.setDescription(description);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            project.setDeadline(LocalDate.parse(deadline, formatter));
            project.setCreated_on(LocalDate.parse(createdOn, formatter));
            project.setLanguage(language);
            projectRepository.save(project);
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }
        return new ResponseEntity<Boolean>(false, HttpStatus.NOT_FOUND);
    }

    @PutMapping("/projects/{project_id}/todos/{todo_id}")
    public ResponseEntity<Boolean> editTodo(@PathVariable(value = "project_id") String project_id, @PathVariable(value = "todo_id") String todo_id, @RequestBody Map<String, Object> payload){
      String title = payload.get("title").toString();
      String importance = payload.get("importance").toString();
      String category = payload.get("category").toString();
      String is_finished_string = payload.get("is_finished").toString();
      boolean is_finished = Boolean.parseBoolean(is_finished_string);

      Optional<Project> optionalProject = projectRepository.findById(Long.parseLong(project_id));
      if(optionalProject.isPresent()){
          Project project = optionalProject.get();
          Todo todo = new Todo(Long.parseLong(todo_id), title, category, importance, is_finished);
          project.editTodo(todo);
          projectRepository.save(project);
          return new ResponseEntity<Boolean>(true, HttpStatus.OK);
      }
      return new ResponseEntity<Boolean>(false, HttpStatus.NOT_FOUND);
    }
}
