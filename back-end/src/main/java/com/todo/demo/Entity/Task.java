package com.todo.demo.Entity;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class Task {

    private Long id;
    private String text;
    private Instant dueDate;
    private Boolean isDone;
    private Instant doneDate;
    private String priority;
    private Instant creationDate;

    @Override
    public String toString() {
        return "ToDo{ " + "id=" + id + ", text=" + text + ", dueDate=" + dueDate + ", isDone=" + isDone + ", doneDate=" + doneDate + ", priority=" + priority + ", creationDate=" + creationDate + " }";
    }
}


