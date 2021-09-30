package com.simonschreinermacher.projectmanager.repositories;

import com.simonschreinermacher.projectmanager.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {

    @Override
    List<User> findAll();

    User findByUsername(String username);
}
