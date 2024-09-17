package com.todo.demo.Model.request;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TaskRequest {
    private String text;
    private String priority;
    private String status;
}
