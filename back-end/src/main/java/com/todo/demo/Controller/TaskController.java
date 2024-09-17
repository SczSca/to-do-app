package com.todo.demo.Controller;
import java.util.List;

import com.todo.demo.Entity.Task;
import com.todo.demo.Model.dto.TaskDTO;
import com.todo.demo.Model.dto.TasksPageResultDTO;
import com.todo.demo.Model.dto.TimeDTO;
import com.todo.demo.Model.request.TaskRequest;
import com.todo.demo.Service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @GetMapping("/search/prior/{prior}/status/{status}/text/{text}/page/{page}/dateAsc/{isDateAsc}/priorAsc/{isPriorAsc}")
    public ResponseEntity<TasksPageResultDTO> getTasks(@Valid @PathVariable("prior") String prior, @PathVariable("status") String status, @PathVariable("text") String text, @PathVariable("page") int page, @PathVariable("isDateAsc") String isDateAsc, @PathVariable("isPriorAsc") String isPriorAsc){
        boolean isDateAscFlag = isDateAsc.equals("Asc");
        boolean isPriorAscFlag = isPriorAsc.equals("Asc");
        text = text.equals("blankTask_0X0") ? "" : text;
        TaskRequest taskRequest = new TaskRequest(text, prior, status);
        return taskService.getTasks(taskRequest, page, isDateAscFlag, isPriorAscFlag);
    }

    @GetMapping("/time")
    public ResponseEntity<TimeDTO> getTimeMetrics(){
        return taskService.getTimeMetrics();
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

    @PatchMapping("/{id}/change-status")
    public ResponseEntity<String> updateDoneStatus(@Valid @PathVariable("id") Long id){
        return taskService.updateDoneStatus(id);
    }

}
