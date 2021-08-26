package com.simonschreinermacher.projectmanager.repositories;

import com.simonschreinermacher.projectmanager.models.Project;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProjectRepository extends CrudRepository<Project, Long> {

    @Override
    List<Project> findAll();
}
