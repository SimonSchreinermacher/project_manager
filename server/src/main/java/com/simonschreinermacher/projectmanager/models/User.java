package com.simonschreinermacher.projectmanager.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class User {
    @Id
    private Long user_id;
    private String username;
    private String password;

    @MappedCollection(keyColumn="project_id", idColumn="user")
    private Set<Project> projects;

    public void addProject(Project project){
        projects.add(project);
    }

    public Project findProjectById(Long project_id){
        List<Project> projectList = projects.stream().filter(project -> project.getProject_id().equals(project_id)).collect(Collectors.toList());
        return projectList.get(0);
    }

    public void removeProject(Long project_id){
        projects =  projects.stream().filter(entry -> !entry.getProject_id().equals(project_id)).collect(Collectors.toSet());
    }

    public void editProject(Project project){
        projects.stream().forEach(entry -> {
            if(entry.getProject_id() == project.getProject_id()){
                entry.setName(project.getName());
                entry.setDescription(project.getDescription());
                entry.setLanguage(project.getLanguage());
                entry.setCreated_on(project.getCreated_on());
                entry.setDeadline(project.getDeadline());
            }
        });
    }
}
