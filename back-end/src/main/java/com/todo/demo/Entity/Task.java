package com.todo.demo.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Task {

    private Long id;
    private String text;
    private LocalDate dueDate;
    private Boolean isDone;
    private LocalDateTime doneDate;
    private String priority;
    private LocalDateTime creationDate;

    @Override
    public String toString() {
        return "ToDo{ " + "id=" + id + ", text=" + text + ", dueDate=" + dueDate + ", isDone=" + isDone + ", doneDate=" + doneDate + ", priority=" + priority + ", creationDate=" + creationDate + " }";
    }
//    public Task() {}

//    public Task(Long id, String text, LocalDate dueDate, Boolean isDone, LocalDateTime doneDate, String priority, LocalDateTime creationDate ) {
//        this.id = id;
//        this.text = text;
//        this.dueDate = dueDate;
//        this.isDone = isDone;
//        this.doneDate = doneDate;
//        this.priority = priority;
//        this.creationDate = creationDate;
//    }

}


