package com.todo.demo.Model.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TaskDTO {
    private Long id;
    @NotBlank(message = "Task text is required!")
    @Size(max = 120, message = "Task is too long. Must be less than 120 characters")
    private String text;
    @FutureOrPresent(message = "Due date cannot be in the past")
    private LocalDate dueDate;
    @NotBlank(message = "Task priority is required!")
    private String priority;

}
