package com.simonschreinermacher.projectmanager.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
public class Todo {

    @Id
    private Long todo_id;
    private String title;
    private String category;
    private String importance;
    private boolean is_finished;

    //TODO: Fix, whatever causes Lombok to not auto-generate this function (while get_Todoid is auto-generated)
    public boolean get_finished(){
        return is_finished;
    }
}
