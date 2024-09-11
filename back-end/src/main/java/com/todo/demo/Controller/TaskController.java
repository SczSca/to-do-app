package com.todo.demo.Controller;
import java.util.List;

import com.todo.demo.Entity.Task;
import com.todo.demo.Model.dto.TaskDTO;
import com.todo.demo.Model.request.TaskRequest;
import com.todo.demo.Service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(@Valid @RequestBody TaskRequest taskRequest){
        return taskService.getTasks(taskRequest);
    }

    @PostMapping
    public ResponseEntity<String> createTask(@Valid @RequestBody TaskDTO taskDTO){
        return taskService.createTask(taskDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask( @PathVariable("id") Long id){
        return taskService.deleteTask(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateTask(@Valid @RequestBody TaskDTO taskUpdate){
        return taskService.updateTask(taskUpdate);
    }
}
