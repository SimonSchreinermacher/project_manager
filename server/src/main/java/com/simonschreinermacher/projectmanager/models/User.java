package com.simonschreinermacher.projectmanager.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
public class User {
    @Id
    private Long user_id;
    private String username;
    private String password;

}
