package com.simonschreinermacher.projectmanager.models;

import lombok.Data;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

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
    private boolean finished;

    @MappedCollection(keyColumn = "todo_id", idColumn = "project")
    private Set<Todo> todos;

    public void addTodo(Todo todo){
        todos.add(todo);
    }

    public void removeTodo(Long todo_id){
        todos =  todos.stream().filter(entry -> !entry.getTodo_id().equals(todo_id)).collect(Collectors.toSet());
    }

    public void editTodo(Todo todo){
        todos.stream().forEach(entry -> {
            if(entry.getTodo_id() == todo.getTodo_id()){
                entry.setCategory(todo.getCategory());
                entry.setTitle(todo.getTitle());
                entry.setImportance(todo.getImportance());
                entry.set_finished(todo.get_finished());
            }
        });
    }
}
