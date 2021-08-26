package com.simonschreinermacher.projectmanager.models;

import lombok.Data;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
public class Project {

    @Id
    private Long project_id;
    private String name;
    private String language;
    private LocalDateTime created_on;
    private LocalDateTime deadline;

    @MappedCollection(keyColumn = "todo_id", idColumn = "project")
    private Set<Todo> todos;
}
