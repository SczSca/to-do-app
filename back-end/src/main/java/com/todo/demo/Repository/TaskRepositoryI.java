package com.todo.demo.Repository;

import com.todo.demo.Entity.Task;
import com.todo.demo.Model.dto.TasksPageResultDTO;
import com.todo.demo.Model.request.TaskRequest;

import java.util.List;
import java.util.Optional;

public interface TaskRepositoryI {
    List<Task> findAll();
    Optional<Task> findById(Long id);
    boolean updateDoneState(Long id);
    void save(Task task);
    void delete(Long id);
    TasksPageResultDTO findByCriteriaPagination(TaskRequest taskRequest, int page, boolean isDateAsc, boolean isPriorAsc);
    List<Task> findByCriteria(TaskRequest taskRequest);
    void deleteAll();
    void saveAll(List<Task> taskList);
}
