package com.todo.demo.Repository;

import com.todo.demo.Entity.Task;
import com.todo.demo.Model.dto.TaskDTO;
import com.todo.demo.Model.dto.TasksPageResultDTO;
import com.todo.demo.Model.request.TaskSearchRequest;

import java.util.List;
import java.util.Optional;

public interface TaskRepository {
    List<Task> findAll();
    Optional<Task> findById(Long id);
    boolean updateDoneState(Long id);
    boolean save(Task task);
    boolean delete(Long id);
    TasksPageResultDTO findByCriteriaPagination(TaskSearchRequest taskSearchRequest);
    List<Task> findByCriteria(TaskDTO taskFilter);
    boolean deleteAll();
    boolean saveAll(List<Task> taskList);
}
