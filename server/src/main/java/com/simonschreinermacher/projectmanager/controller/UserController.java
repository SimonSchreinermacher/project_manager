package com.simonschreinermacher.projectmanager.controller;

import com.simonschreinermacher.projectmanager.error.ResourceNotFoundException;
import com.simonschreinermacher.projectmanager.models.Project;
import com.simonschreinermacher.projectmanager.models.Todo;
import com.simonschreinermacher.projectmanager.models.User;
import com.simonschreinermacher.projectmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/projects")
    public Set<Project> getAllProjects(){
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new ResourceNotFoundException("Invalid user " + username);
        }
        Set<Project> projects = user.getProjects();
        return projects;
    }

    @GetMapping("/projects/{project_id}")
    public ResponseEntity<Project> getProjectById(@PathVariable(value = "project_id") Long project_id){
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(username);
        if(user == null){
            System.out.println("ERROR: Could not load user " + username);
            throw new ResourceNotFoundException("Invalid user " + username);
        }
        Project project = user.findProjectById(project_id);
        return new ResponseEntity<Project>(project, HttpStatus.OK);


    }

    @PostMapping("/projects")
    public ResponseEntity<Boolean> addProject(@RequestBody Map<String, Object> payload){
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(username);
        if(user == null){
            System.out.println("ERROR: Could not load user " + username);
            throw new ResourceNotFoundException("Invalid user " + username);
        }

        Set<Todo> todos = new HashSet<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        String name = payload.get("name").toString();
        String description = payload.get("description").toString();
        String language = payload.get("language").toString();

        String createdOn_string = payload.get("createdOn").toString();
        LocalDate createdOn = LocalDate.parse(createdOn_string, formatter);

        String deadline_string = payload.get("deadline").toString();
        LocalDate deadline = LocalDate.parse(deadline_string, formatter);

        Project project = new Project(null, name, description, language, createdOn, deadline, false, todos);
        user.addProject(project);

        userRepository.save(user);
        System.out.println("LOG: Added new project " + name + " to user " + username);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @PostMapping("/projects/{project_id}/todos")
    public ResponseEntity<Boolean> addTodo(@RequestBody Map<String, Object> payload, @PathVariable(value = "project_id") String project_id){
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(username);
        if(user == null){
            System.out.println("ERROR: Could not load user " + username);
            throw new ResourceNotFoundException("Invalid user " + username);
        }

        String title = payload.get("title").toString();
        String importance = payload.get("importance").toString();
        String category = payload.get("category").toString();

        Todo todo = new Todo(null, title, category, importance, false);

        Project project = user.findProjectById(Long.parseLong(project_id));
        project.addTodo(todo);
        userRepository.save(user);
        System.out.println("LOG: Added new task " + title + " to project " + project_id + " of user " + username);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @DeleteMapping("/projects/{project_id}")
    public ResponseEntity<Boolean> deleteProject(@PathVariable(value = "project_id") String project_id){
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(username);
        if(user == null){
            System.out.println("ERROR: Could not load user " + username);
            throw new ResourceNotFoundException("Invalid user " + username);
        }

        user.removeProject(Long.parseLong(project_id));
        userRepository.save(user);
        System.out.println("LOG: Deleted project with id " + project_id + " of user " + username);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @DeleteMapping("/projects/{project_id}/todos/{todo_id}")
    public ResponseEntity<Boolean> deleteTodo(@PathVariable(value = "project_id") String project_id, @PathVariable(value = "todo_id") String todo_id){
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(username);
        if(user == null){
            System.out.println("ERROR: Could not load user " + username);
            throw new ResourceNotFoundException("Invalid user " + username);
        }

        Project project = user.findProjectById(Long.parseLong(project_id));
        project.removeTodo(Long.parseLong(todo_id));
        userRepository.save(user);
        System.out.println("LOG: Deleted task " + todo_id + " from project " + project_id + " of user " + username);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @PutMapping("/projects/{project_id}")
    public ResponseEntity<Boolean> editProject(@PathVariable(value= "project_id") String project_id, @RequestBody Map<String, Object> payload){
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(username);
        if(user == null){
            System.out.println("ERROR: Could not load user " + username);
            throw new ResourceNotFoundException("Invalid user " + username);
        }

        String name = payload.get("name").toString();
        String description = payload.get("description").toString();
        String deadlineString = payload.get("deadline").toString();
        String createdOnString = payload.get("createdOn").toString();
        String language = payload.get("language").toString();
        String finishedString = payload.get("finished").toString();
        boolean finished = Boolean.parseBoolean(finishedString);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate createdOn = LocalDate.parse(createdOnString, formatter);
        LocalDate deadline = LocalDate.parse(deadlineString, formatter);

        Project project = user.findProjectById(Long.parseLong(project_id));
        Project updatedProject = new Project(Long.parseLong(project_id), name, description, language, createdOn, deadline, finished, project.getTodos());
        user.editProject(updatedProject);
        userRepository.save(user);
        System.out.println("LOG: Edited project " + project_id + " of user " + username);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @PutMapping("/projects/{project_id}/todos/{todo_id}")
    public ResponseEntity<Boolean> editTodo(@PathVariable(value = "project_id") String project_id, @PathVariable(value = "todo_id") String todo_id, @RequestBody Map<String, Object> payload){
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      User user = userRepository.findByUsername(username);
        if(user == null){
            System.out.println("ERROR: Could not load user " + username);
            throw new ResourceNotFoundException("Invalid user " + username);
        }

      String title = payload.get("title").toString();
      String importance = payload.get("importance").toString();
      String category = payload.get("category").toString();
      String is_finished_string = payload.get("is_finished").toString();
      boolean is_finished = Boolean.parseBoolean(is_finished_string);

      Project project = user.findProjectById(Long.parseLong(project_id));
      Todo updatedTodo = new Todo(Long.parseLong(todo_id), title, category, importance, is_finished);
      project.editTodo(updatedTodo);
      userRepository.save(user);
        System.out.println("LOG: Edited task " + todo_id + " from project " + project_id + " of user " + username);
      return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }
}
