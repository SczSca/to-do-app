package com.todo.demo.Model.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class TaskDTO {
    private String text;
    private String priority;
    private String status;
}
