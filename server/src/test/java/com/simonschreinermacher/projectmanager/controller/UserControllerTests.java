package com.simonschreinermacher.projectmanager.controller;

import com.simonschreinermacher.projectmanager.models.Project;
import com.simonschreinermacher.projectmanager.models.Todo;
import com.simonschreinermacher.projectmanager.models.User;
import com.simonschreinermacher.projectmanager.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


//@WebMvcTest(UserController.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTests {

    @Autowired
    MockMvc mvc;

    @MockBean
    UserService service;
    
    @Test
    @WithMockUser
    public void loadProjects() throws Exception{
        Project project = new Project(1L, "project name", "desc", "Java", LocalDate.now(), LocalDate.now(), false, new HashSet<Todo>());
        Project project2 = new Project(2L, "other project", "other desc", "Java", LocalDate.now(), LocalDate.now(), false, new HashSet<Todo>());
        User user = new User(1L, "username", "password", Set.of(project, project2));
        when(service.findUserByAuthentication()).thenReturn(user);
        MvcResult mvcResult = mvc.perform(get("/projects"))
                .andExpect(status().is2xxSuccessful())
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        assertThat(content).contains("project name", "1", "desc", "Java", "other project", "other desc");
    }

    @Test
    @WithMockUser
    public void loadSpecificProject() throws Exception{
        Project project = new Project(1L, "project name", "desc", "Java", LocalDate.now(), LocalDate.now(), false, new HashSet<Todo>());
        Project project2 = new Project(2L, "other project", "other desc", "Java", LocalDate.now(), LocalDate.now(), false, new HashSet<Todo>());
        User user = new User(1L, "username", "password", Set.of(project, project2));
        when(service.findUserByAuthentication()).thenReturn(user);
        MvcResult mvcResult = mvc.perform(get("/projects/1"))
                .andExpect(status().is2xxSuccessful())
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        assertThat(content).contains("1", "project name", "desc", "Java");
        assertThat(content).doesNotContain("other project", "other desc");
    }

    @Test
    @WithMockUser
    public void notExistingProjectReturns404() throws Exception{
        Project project = new Project(1L, "project name", "desc", "Java", LocalDate.now(), LocalDate.now(), false, new HashSet<Todo>());
        User user = new User(1L, "username", "password", Set.of(project));
        when(service.findUserByAuthentication()).thenReturn(user);
        mvc.perform(get("/projects/2"))
                .andExpect(status().is4xxClientError());
    }

}
