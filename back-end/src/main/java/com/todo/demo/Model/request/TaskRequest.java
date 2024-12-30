package com.todo.demo.Model.request;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import java.time.OffsetDateTime;

@Getter
@Setter
public class TaskRequest {

    private Long id;
    @NotBlank(message = "Task text is required!")
    @Size(max = 120, message = "Task is too long. Must be less than 120 characters")
    private String text;
    @FutureOrPresent(message = "Due date cannot be in the past")
    private OffsetDateTime dueDate;
    @NotBlank(message = "Task priority is required!")
    private String priority;
}
