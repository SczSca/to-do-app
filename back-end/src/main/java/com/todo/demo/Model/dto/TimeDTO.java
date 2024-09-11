package com.todo.demo.Model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TimeDTO {
    private String averageTime;
    private String lowPriorTime;
    private String mediumPriorTime;
    private String highPriorTime;
}
