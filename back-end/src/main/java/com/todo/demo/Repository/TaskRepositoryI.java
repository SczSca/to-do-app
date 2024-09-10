package com.todo.demo.Repository;

import com.todo.demo.Entity.Task;
import com.todo.demo.Model.request.TaskRequest;

import java.util.List;
import java.util.Optional;

public interface TaskRepositoryI {
    List<Task> findAll();
    Optional<Task> findById(Long id);
    boolean updateDoneState(Long id);
    void save(Task task);
    void delete(Long id);
    List<Task> findByCriteria(TaskRequest taskRequest);
    void deleteAll();
    void saveAll(List<Task> taskList);
}
