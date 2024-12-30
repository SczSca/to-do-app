package com.todo.demo;

import com.todo.demo.Entity.Task;
import com.todo.demo.Exception.ApiRequestException;
import com.todo.demo.Model.dto.TasksPageResultDTO;
import com.todo.demo.Model.dto.TimeDTO;
import com.todo.demo.Model.request.TaskRequest;
import com.todo.demo.Model.request.TaskSearchRequest;
import com.todo.demo.Repository.LocalTaskRepository;
import com.todo.demo.Service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


public class TestService {

    private final LocalTaskRepository taskRepository = new LocalTaskRepository();
    private final TaskService taskService = new TaskService(taskRepository);

    @BeforeEach
    void setUp() {

        // Clear the repository to ensure a clean state for each test
        taskRepository.deleteAll();
        List<Task> tasks = new ArrayList<>();


        tasks.add(Task.builder()
                .id(1L)
                .text("Sample Task 1")
                .creationDate(Instant.now().minusSeconds(3600)) // 1 hour ago
                .dueDate(Instant.now().plusSeconds(3600 * 24)) // 1 day from now
                .doneDate(Instant.now().minusSeconds(1800)) // 30 minutes ago
                .isDone(true)
                .priority("High")
                .build());

        tasks.add(Task.builder()
                .id(2L)
                .text("Sample Task 2")
                .creationDate(Instant.now().minusSeconds(7200)) // 2 hours ago
                .dueDate(Instant.now().plusSeconds(3600 * 48)) // 2 days from now
                .doneDate(Instant.now().minusSeconds(3600)) // 1 hour ago
                .isDone(true)
                .priority("Medium")
                .build());

        tasks.add(Task.builder()
                .id(3L)
                .text("Sample Task 3")
                .creationDate(Instant.now().minusSeconds(10800)) // 3 hours ago
                .dueDate(Instant.now().plusSeconds(3600 * 72)) // 3 days from now
                .doneDate(Instant.now().minusSeconds(5400)) // 1.5 hours ago
                .isDone(true)
                .priority("Low")
                .build());

        tasks.forEach(taskRepository::save);
    }

    @Test
    void testCreateTask() {
        TaskRequest taskRequest = new TaskRequest();
        taskRequest.setText("Test Task");
        taskRequest.setPriority("High");
        taskRequest.setDueDate(OffsetDateTime.now());

        ResponseEntity<String> response = taskService.createTask(taskRequest);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("task created successfully!", response.getBody());
    }



    @Test
    void testDeleteTask() {

        ResponseEntity<String> response = taskService.deleteTask(1L);

        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
        assertEquals("task was deleted successfully!", response.getBody());
    }

    @Test
    void testDeleteTaskFailure() {

        Long idToFound = 4L;
        ApiRequestException exception = assertThrows(ApiRequestException.class, () -> taskService.deleteTask(idToFound));

        assertEquals(String.format("task with id: %d not found. Could not delete!", idToFound), exception.getMessage());
    }

    @Test
    void testUpdateTask() {
        TaskRequest taskRequest = new TaskRequest();
        taskRequest.setId(1L);
        taskRequest.setText("Updated Task");
        taskRequest.setPriority("Medium");
        taskRequest.setDueDate(OffsetDateTime.now());

        ResponseEntity<String> response = taskService.updateTask(taskRequest);

        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
        assertEquals("task was updated successfully!", response.getBody());
    }

    @Test
    void testUpdateTaskFailure() {
        Long idToFound = 5L;
        TaskRequest taskRequest = new TaskRequest();
        taskRequest.setId(idToFound);
        taskRequest.setText("Updated Task");
        taskRequest.setPriority("Medium");
        taskRequest.setDueDate(OffsetDateTime.now());


        ApiRequestException exception = assertThrows(ApiRequestException.class, () -> taskService.updateTask(taskRequest));

        assertEquals(String.format("task with id: %d not found. Could not update!", idToFound), exception.getMessage());
    }

    @Test
    void testUpdateDoneStatus() {

        ResponseEntity<String> response = taskService.updateDoneStatus(1L);

        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
        assertEquals("Done status updated successfully!", response.getBody());
    }

    @Test
    void testUpdateDoneStatusFailure() {

        Long idToFound = 5L;
        ApiRequestException exception = assertThrows(ApiRequestException.class, () -> taskService.updateDoneStatus(idToFound));

        assertEquals(String.format("task with id: %d not found. Could not update!", idToFound), exception.getMessage());
    }

    @Test
    void testGetTasks() {
        System.out.println(taskRepository.findAll());
        TaskSearchRequest taskSearchRequest = new TaskSearchRequest();
        taskSearchRequest.setPrior("All");
        taskSearchRequest.setStatus("Completed");
        taskSearchRequest.setText("");
        taskSearchRequest.setPage(1);
        taskSearchRequest.setDateOrder("Asc");
        taskSearchRequest.setPriorOrder("Asc");

        // Call the service method and check its behavior
        ResponseEntity<TasksPageResultDTO> response = taskService.getTasks(taskSearchRequest);

        // Validate the response content
        System.out.println("Tasks in response: " + response.getBody().getTasksFromPage());
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(3, response.getBody().getTasksFromPage().size());
    }

    @Test
    void testGetTimeMetrics() {
        ResponseEntity<TimeDTO> response = taskService.getTimeMetrics();

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
    }
}