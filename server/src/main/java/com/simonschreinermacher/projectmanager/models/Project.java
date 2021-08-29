package com.simonschreinermacher.projectmanager.models;

import lombok.Data;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;

import java.time.LocalDate;
import java.util.Set;

@Data
@AllArgsConstructor
public class Project {

    @Id
    private Long project_id;
    private String name;
    private String description;
    private String language;
    private LocalDate created_on;
    private LocalDate deadline;

    @MappedCollection(keyColumn = "todo_id", idColumn = "project")
    private Set<Todo> todos;
}
