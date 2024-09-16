package com.todo.demo.Model.dto;

import com.todo.demo.Entity.Task;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class TasksPageResultDTO {
    private List<Task> tasksFromPage;
    private long totalPages;
    private int page;
}
