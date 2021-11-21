package com.simonschreinermacher.projectmanager.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.simonschreinermacher.projectmanager.models.Project;
import com.simonschreinermacher.projectmanager.models.Todo;
import com.simonschreinermacher.projectmanager.models.User;
import com.simonschreinermacher.projectmanager.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.LocalDate;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


//@WebMvcTest(UserController.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTests {

    @Autowired
    MockMvc mvc;

    @MockBean
    UserService service;

    User user;
    Project project1;
    Project project2;
    Todo todo1;
    Todo todo2;

    @BeforeEach
    public void setup(){
        todo1 = new Todo(1L, "todo title", "Feature", "Serious", false);
        todo2 = new Todo(2L, "another todo", "Refactor", "Minor", true);
        Set<Todo> todos = new HashSet<Todo>();
        todos.add(todo1);
        todos.add(todo2);
        project1 = new Project(1L, "project name", "desc", "Java", LocalDate.now(), LocalDate.now(), false, todos);
        project2 = new Project(2L, "other project", "other desc", "Java", LocalDate.now(), LocalDate.now(), false, new HashSet<Todo>());
        Set<Project> projects = new HashSet<Project>();
        projects.add(project1);
        projects.add(project2);
        user = new User(1L, "username", "password", projects);
        when(service.findUserByAuthentication()).thenReturn(user);
    }
    
    @Test
    @DisplayName("All projects that belong to the same user should be returned")
    @WithMockUser
    public void loadProjects() throws Exception{
        MvcResult mvcResult = mvc.perform(get("/projects"))
                .andExpect(status().is2xxSuccessful())
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        assertThat(content).contains("project name", "1", "desc", "Java", "other project", "other desc");
    }

    @Test
    @DisplayName("Only the project matching the id in the url should be returned")
    @WithMockUser
    public void loadSpecificProject() throws Exception{
        MvcResult mvcResult = mvc.perform(get("/projects/1"))
                .andExpect(status().is2xxSuccessful())
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        assertThat(content).contains("1", "project name", "desc", "Java");
        assertThat(content).doesNotContain("other project", "other desc");
    }

    @Test
    @DisplayName("When the endpoint is accessed with an id that doesnt belong to any project, the api should return 404")
    @WithMockUser
    public void notExistingProjectReturns404() throws Exception{
        mvc.perform(get("/projects/3"))
                .andExpect(status().is4xxClientError());
    }

    @Test
    @DisplayName("The user should contain the new project after the post request")
    @WithMockUser
    public void saveNewProject() throws Exception{
        Map<String, Object> payload = new HashMap<>();
        payload.put("name", "project2");
        payload.put("description", "desc");
        payload.put("language", "Java");
        payload.put("createdOn", "2021-11-21");
        payload.put("deadline", "2021-12-24");
        ObjectMapper mapper = new ObjectMapper();
        String content = mapper.writeValueAsString(payload);

        mvc.perform(post("/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(status().is2xxSuccessful());
        Project project = new Project(null, "project2", "desc", "Java", LocalDate.of(2021, 11, 21), LocalDate.of(2021, 12, 24), false, new HashSet<Todo>());
        assertThat(user.getProjects()).contains(project);
    }

    @Test
    @DisplayName("The project should contain the new todo after the post request")
    @WithMockUser
    public void saveNewTodo() throws Exception{
        Map<String, Object> payload = new HashMap<>();
        payload.put("title", "todo1");
        payload.put("importance", "Serious");
        payload.put("category", "Update");
        ObjectMapper mapper =new ObjectMapper();
        String content = mapper.writeValueAsString(payload);

        mvc.perform(post("/projects/1/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(status().is2xxSuccessful());
        Todo todo = new Todo(null, "todo1", "Update", "Serious", false);
        assertThat(project1.getTodos()).contains(todo);
    }

    @Test
    @DisplayName("The user should no longer contain the deleted project, but the other project should still exist")
    @WithMockUser
    public void deleteExistingProject() throws Exception{
        mvc.perform(delete("/projects/1"))
                .andExpect(status().is2xxSuccessful());
        assertThat(user.getProjects()).contains(project2);
        assertThat(user.getProjects()).doesNotContain(project1);
    }

    @Test
    @DisplayName("The project should no longer contain the deleted todo, but the other todo should still exist")
    @WithMockUser
    public void deleteExistingTodo() throws Exception{
        mvc.perform(delete("/projects/1/todos/1"))
                .andExpect(status().is2xxSuccessful());
        assertThat(project1.getTodos()).contains(todo2);
        assertThat(project1.getTodos()).doesNotContain(todo1);
    }

    @Test
    @DisplayName("Only the edited details should be changed, and the project should still belong to the same user")
    @WithMockUser
    public void editExistingProject() throws Exception{
        Map<String, Object> payload = new HashMap<>();
        payload.put("name", "new project name");
        payload.put("description", "new desc");
        payload.put("language", "Java");
        payload.put("deadline", "2021-12-24");
        payload.put("createdOn", "2021-11-21");
        payload.put("finished", true);

        ObjectMapper mapper = new ObjectMapper();
        String content = mapper.writeValueAsString(payload);

        mvc.perform(put("/projects/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(status().is2xxSuccessful());

        assertThat(user.getProjects()).contains(project1);
        assertThat(project1.getProject_id()).isEqualTo(1L);
        assertThat(project1.getName()).isEqualTo("new project name");
        assertThat(project1.getDescription()).isEqualTo("new desc");
        assertThat(project1.getLanguage()).isEqualTo("Java");
        assertThat(project1.getCreated_on()).isEqualTo(LocalDate.of(2021, 11, 21));
        assertThat(project1.getDeadline()).isEqualTo(LocalDate.of(2021, 12, 24));
        assertThat(project1.isFinished()).isEqualTo(true);
    }

    @Test
    @DisplayName("Only the edited details should be changed, and the todo should still belong to the same project")
    @WithMockUser
    public void editExistingTodo() throws Exception{
        Map<String, Object> payload = new HashMap<>();
        payload.put("title", "new title");
        payload.put("category", "Feature");
        payload.put("importance", "Major");
        payload.put("is_finished", true);

        ObjectMapper mapper = new ObjectMapper();
        String content = mapper.writeValueAsString(payload);

        mvc.perform(put("/projects/1/todos/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(status().is2xxSuccessful());

        assertThat(project1.getTodos()).contains(todo1);
        assertThat(todo1.getTodo_id()).isEqualTo(1L);
        assertThat(todo1.getTitle()).isEqualTo("new title");
        assertThat(todo1.getCategory()).isEqualTo("Feature");
        assertThat(todo1.getImportance()).isEqualTo("Major");
        assertThat(todo1.get_finished()).isEqualTo(true);
    }

}
