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
import java.time.LocalDateTime;
import java.time.OffsetDateTime;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * TestController class to test the TaskController endpoints.
 */
@SpringBootTest(classes = DemoApplication.class)
@AutoConfigureMockMvc
//@WebMvcTest(TaskController.class)
public class TestController {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TaskRepository taskRepository;
    Task newTask;

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

        newTask = new Task();
        newTask.setId(1L);
        newTask.setText("Test task");
        newTask.setCreationDate(LocalDateTime.now());
        newTask.setPriority("High");
        newTask.setDueDate(dueDate);
        newTask.setIsDone(false);
        taskRepository.save(newTask);
    }

    /**
     * Tests the retrieval of all tasks.
     */
    @Test
    public void testGetAllTasks() throws Exception {
        TaskRequest taskRequest = new TaskRequest("Task test", "All", "All");


        mockMvc.perform(get("/api/tasks/search/prior/{prior}/status/{status}/text/{text}/page/{page}/dateAsc/{isDateAsc}/priorAsc/{isPriorAsc}", taskRequest.getPriority(),taskRequest.getStatus(),taskRequest.getText(),"1", "Asc", "Asc")
        // Perform GET request to retrieve tasks and verify the response
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

        mockMvc.perform(post("/api/tasks")
        // Perform POST request to create a new task and verify the response
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testTask)))
                .andExpect(status().isCreated())
                .andExpect(content().string("task created successfully!"));
    }

    //Doesnt work
//    @Test
//    public void testUpdateToDo() throws Exception {
//
//        TaskDTO testTask = new TaskDTO();
//        testTask.setText("Updated Task");
//        testTask.setPriority("High");
//        testTask.setDueDate(null);
//
//        testCreateTask();
//
//        mockMvc.perform(put("/api/tasks/" + 1L)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(testTask)))
//                .andExpect(status().isOk())
//                .andExpect(content().string("To Do updated successfully"));
//    }
    /**
     * Tests the update of an existing task.
     */

        // Perform PUT request to update the task and verify the response

    /**
     * Tests the deletion of a task.
     */
        // Perform DELETE request to delete the task and verify the response
}