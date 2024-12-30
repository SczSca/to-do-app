package com.todo.demo;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.demo.Entity.Task;
import com.todo.demo.Model.dto.TaskDTO;
import com.todo.demo.Model.request.TaskRequest;
import com.todo.demo.Repository.LocalTaskRepository;
import com.todo.demo.Service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.time.LocalDate;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * TestController class to test the TaskController endpoints.
 */
@SpringBootTest(classes = DemoApplication.class)
@AutoConfigureMockMvc
public class TestController {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private LocalTaskRepository taskRepository;

    @Autowired
    private TaskService taskService;

    /**
     * Sets up the test data before each test.
     */
    @BeforeEach
    public void setUp() {
        // Clear the repository to ensure a clean state for each test
        taskRepository.deleteAll();

        // Create a new task with a due date 10 days from now
        String localDateTimeStr = LocalDate.now().plusDays(10).toString() + "T23:59:59Z";
        Instant dueDate = Instant.parse(localDateTimeStr);

        Task newTask = Task.builder()
                .id(1L)
                .text("Test task")
                .creationDate(Instant.now())
                .priority("High")
                .dueDate(dueDate)
                .isDone(false)
                .build();
        taskRepository.save(newTask);
    }

    /**
     * Tests the retrieval of all tasks.
     */
    @Test
    public void testGetAllTasks() throws Exception {
        TaskDTO taskRequest = TaskDTO.builder()
                .text("Test task")
                .priority("All")
                .status("All")
                .build();

        // Perform GET request to retrieve tasks and verify the response
        mockMvc.perform(get("/api/v1/tasks/search")
                        .param("prior", taskRequest.getPriority())
                        .param("status", taskRequest.getStatus())
                        .param("text", taskRequest.getText())
                        .param("page", "1")
                        .param("dateOrder", "Asc")
                        .param("priorOrder", "Asc")
                        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.size()", is(3)));
    }

    /**
     * Tests the creation of a new task.
     */
    @Test
    public void testCreateTask() throws Exception {
        TaskDTO testTask = new TaskDTO();
        testTask.setText("Test Task");
        testTask.setPriority("Medium");
        testTask.setDueDate(null);

        // Perform POST request to create a new task and verify the response
        mockMvc.perform(post("/api/v1/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testTask)))
                .andExpect(status().isCreated())
                .andExpect(content().string("task created successfully!"));
    }

    /**
     * Tests the update of an existing task.
     */
    @Test
    public void testUpdateTask() throws Exception {
        TaskRequest testTask = new TaskRequest();
        testTask.setId(1L);
        testTask.setText("Updated Task");
        testTask.setPriority("High");
        testTask.setDueDate(null);

        // Perform PUT request to update the task and verify the response
        mockMvc.perform(put("/api/v1/tasks/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testTask)))
                .andExpect(status().isAccepted())
                .andExpect(content().string("task was updated successfully!"));
    }

    /**
     * Tests the deletion of a task.
     */
    @Test
    public void testDeleteTask() throws Exception {
        // Perform DELETE request to delete the task and verify the response
        mockMvc.perform(delete("/api/v1/tasks/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isAccepted())
                .andExpect(content().string("task was deleted successfully!"));
    }
}