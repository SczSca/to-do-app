package com.todo.demo.Model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskSearchRequest {
    @NotBlank(message = "Priority is required")
    private String prior;

    @NotBlank(message = "Status is required")
    private String status;

    private String text;

    private int page;

    @NotBlank(message = "Date sort order is required")
    @Pattern(regexp = "Asc|Desc", message = "Date sort order must be 'Asc' or 'Desc'")
    private String dateOrder;

    @NotBlank(message = "Priority sort order is required")
    @Pattern(regexp = "Asc|Desc", message = "Priority sort order must be 'Asc' or 'Desc'")
    private String priorOrder;

    private boolean isDateAsc;

    private boolean isPriorAsc;
}
