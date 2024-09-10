package com.todo.demo.Model.request;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TaskRequest {
    private String text;
    private String priority;
    private String state;
}
