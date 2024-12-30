package com.todo.demo.Controller;
import java.util.List;

import com.todo.demo.Entity.Task;
import com.todo.demo.Model.dto.TaskDTO;
import com.todo.demo.Model.dto.TasksPageResultDTO;
import com.todo.demo.Model.dto.TimeDTO;
import com.todo.demo.Model.request.TaskRequest;
import com.todo.demo.Model.request.TaskSearchRequest;
import com.todo.demo.Service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @GetMapping("/search")
    public ResponseEntity<TasksPageResultDTO> getTasks(
            @Valid TaskSearchRequest taskSearchRequest){
        taskSearchRequest.setDateAsc(taskSearchRequest.getDateOrder().equals("Asc"));
        taskSearchRequest.setPriorAsc(taskSearchRequest.getPriorOrder().equals("Asc"));

        if(taskSearchRequest.getText().equals("blankTask_0X0")){
            taskSearchRequest.setText("");
        }
        return taskService.getTasks(taskSearchRequest);
    }

    @GetMapping("/time")
    public ResponseEntity<TimeDTO> getTimeMetrics(){
        return taskService.getTimeMetrics();
    }

    @PostMapping
    public ResponseEntity<String> createTask(@Valid @RequestBody TaskRequest taskRequest){
        return taskService.createTask(taskRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask( @PathVariable("id") Long id){
        return taskService.deleteTask(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateTask(@Valid @RequestBody TaskRequest taskUpdate){
        return taskService.updateTask(taskUpdate);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<String> updateDoneStatus(@Valid @PathVariable("id") Long id){
        return taskService.updateDoneStatus(id);
    }

}
