package com.todo.demo.Service;
import com.todo.demo.Entity.Task;
import com.todo.demo.Exception.ApiRequestException;
import com.todo.demo.Model.dto.TaskDTO;
import com.todo.demo.Model.dto.TasksPageResultDTO;
import com.todo.demo.Model.dto.TimeDTO;
import com.todo.demo.Model.request.TaskRequest;
import com.todo.demo.Model.request.TaskSearchRequest;
import com.todo.demo.Repository.LocalTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

/**
 * Service class for managing tasks.
*/
@Service
//adds constructor that defines taskRepository
@RequiredArgsConstructor
public class TaskService {

    private final LocalTaskRepository taskRepository;

    /**
     * Creates a new task.
     *
     * @param taskRequest the task data transfer object containing task details
     * @return a ResponseEntity with a success message and HTTP status code
    */
    public ResponseEntity<String> createTask(TaskRequest taskRequest){
        String text = taskRequest.getText();
        String priority = taskRequest.getPriority();
        OffsetDateTime dueDate = taskRequest.getDueDate();
        Instant dueDateInstant = null;

        if(dueDate != null){
            dueDateInstant = dueDate.toInstant();
        }

        Task newTask = Task.builder()
                .id(null)
                .text(text)
                .creationDate(Instant.now())
                .priority(priority)
                .dueDate(dueDateInstant)
                .isDone(false)
                .build();

        if(taskRepository.save(newTask)){
            //return 201 created
            return new ResponseEntity<>("task created successfully!", HttpStatus.CREATED);
        }
        throw new ApiRequestException(
                String.format("task with text: %s could not be created!",text)
        );

    }

    /**
     * Deletes a task by its ID.
     *
     * @param id the ID of the task to delete
     * @return a ResponseEntity with a success message and HTTP status code
    */
    public ResponseEntity<String> deleteTask(Long id){
        if(taskRepository.delete(id)){
            return new ResponseEntity<>("task was deleted successfully!", HttpStatus.ACCEPTED);
        }
        throw new ApiRequestException(
                String.format("task with id: %d not found. Could not delete!",id)
        );

    }

    /**
     * Updates an existing task.
     *
     * @param taskUpdate the task data transfer object containing updated task details
     * @return a ResponseEntity with a success message and HTTP status code
     * @throws ApiRequestException if the task with the given ID is not found
    */
    public ResponseEntity<String> updateTask(TaskRequest taskUpdate){
        Optional<Task> taskFound = taskRepository.findById(taskUpdate.getId());

        String text = taskUpdate.getText();
        String priority = taskUpdate.getPriority();
        OffsetDateTime dueDate = taskUpdate.getDueDate();
        Instant dueDateInstant = null;

        if(dueDate != null){
            dueDateInstant = dueDate.toInstant();
        }

        if(taskFound.isPresent()){
            Task task = taskFound.get();
            task.setText(text);
            task.setPriority(priority);
            task.setDueDate(dueDateInstant);

            taskRepository.save(task);
            return new ResponseEntity<String>("task was updated successfully!", HttpStatus.ACCEPTED);
        }
        throw new ApiRequestException(
                String.format("task with id: %d not found. Could not update!",taskUpdate.getId())
        );
//        return new ResponseEntity<String>("task not found. Could not update!", HttpStatus.BAD_REQUEST);
    }

    /**
     * Updates the done status of a task by its ID.
     *
     * @param id the ID of the task to update
     * @return a ResponseEntity with a success message and HTTP status code
     * @throws ApiRequestException if the task with the given ID is not found
    */
    public ResponseEntity<String> updateDoneStatus(Long id){
        boolean isUpdated = taskRepository.updateDoneState(id);
        if(isUpdated){
            return new ResponseEntity<String>("Done status updated successfully!", HttpStatus.ACCEPTED);
        }
        throw new ApiRequestException(
                String.format("task with id: %d not found. Could not update!",id)
        );
//        return new ResponseEntity<String>("Done status was not updated, not found!", HttpStatus.BAD_REQUEST);
    }

    /**
     * Retrieves tasks based on the given criteria and pagination settings.
     *
     * @param taskSearchRequest the task request containing search criteria
     * @return a ResponseEntity containing the paginated tasks and HTTP status code
    */
    public ResponseEntity<TasksPageResultDTO> getTasks(TaskSearchRequest taskSearchRequest){
        TasksPageResultDTO paginationResponse = taskRepository.findByCriteriaPagination(taskSearchRequest);
        return new ResponseEntity<>(paginationResponse, HttpStatus.OK);
    }

    /**
     * Retrieves time metrics for tasks based on their priority levels.
     *
     * @return a ResponseEntity containing the time metrics for tasks
     */
    public ResponseEntity<TimeDTO> getTimeMetrics(){
        TimeDTO time = new TimeDTO();
        TaskDTO allCompletedFilter = TaskDTO.builder()
                .text("")
                .priority("All")
                .status("Completed")
                .build();
        TaskDTO lowCompletedFilter = TaskDTO.builder()
                .text("")
                .priority("Low")
                .status("Completed")
                .build();
        TaskDTO mediumCompletedFilter = TaskDTO.builder()
                .text("")
                .priority("Medium")
                .status("Completed")
                .build();
        TaskDTO highCompletedFilter = TaskDTO.builder()
                .text("")
                .priority("High")
                .status("Completed")
                .build();


        List<Task> tasks = taskRepository.findByCriteria(allCompletedFilter);
        time.setAverageTime(averageTime(tasks));

        List<Task> lowPriorTasks = taskRepository.findByCriteria(lowCompletedFilter);
        time.setLowPriorTime(averageTime(lowPriorTasks));

        List<Task> mediumPriorTasks = taskRepository.findByCriteria(mediumCompletedFilter);
        time.setMediumPriorTime(averageTime(mediumPriorTasks));

        List<Task> highPriorTasks = taskRepository.findByCriteria(highCompletedFilter);
        time.setHighPriorTime(averageTime(highPriorTasks));

        return new ResponseEntity<TimeDTO>(time,HttpStatus.CREATED);
    }

    /**
     * Calculates the average time taken to complete tasks.
     *
     * @param tasks the list of tasks to calculate the average time for
     * @return the average time in the format "HH:mm:ss"
     */
    public String averageTime(List<Task> tasks){
        if(tasks.isEmpty()){
            return "00:00:00";
        }
        long seconds = 0L;
        int amountTasks = tasks.size();

        // Calculate the total seconds between creation and done dates for all tasks
        for(Task task: tasks){
            seconds += ChronoUnit.SECONDS.between(task.getCreationDate(), task.getDoneDate());
        }

        long averageSeconds = seconds/amountTasks;
        long hours = averageSeconds / 3600;
        long minutes = (averageSeconds % 3600) / 60;
        seconds = averageSeconds % 60;

        // Return the average time in "HH:mm:ss" format
        return String.format("%02d:%02d:%02d", hours, minutes, seconds);
    }


}
