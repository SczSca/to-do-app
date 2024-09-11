package com.todo.demo.Service;
import com.todo.demo.Entity.Task;
import com.todo.demo.Exception.ApiRequestException;
import com.todo.demo.Model.dto.TaskDTO;
import com.todo.demo.Model.dto.TimeDTO;
import com.todo.demo.Model.request.TaskRequest;
import com.todo.demo.Repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
//adds constructor that defines taskRepository
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public ResponseEntity<String> createTask(TaskDTO taskDto){
        Task newTask = new Task();
        newTask.setId(null);
        newTask.setText(taskDto.getText());
        newTask.setCreationDate(LocalDateTime.now());
        newTask.setPriority(taskDto.getPriority());
        newTask.setDueDate(taskDto.getDueDate());
        newTask.setIsDone(false);

        taskRepository.save(newTask);
        //return 201 created
        return new ResponseEntity<>("task created successfully!", HttpStatus.CREATED);

    }

    public ResponseEntity<String> deleteTask(Long id){
        taskRepository.delete(id);

        return new ResponseEntity<>("task was deleted successfully!", HttpStatus.ACCEPTED);
    }

    public ResponseEntity<String> updateTask(TaskDTO taskUpdate){
        Optional<Task> taskFound = taskRepository.findById(taskUpdate.getId());
        if(taskFound.isPresent()){
            Task task = taskFound.get();
            task.setText(taskUpdate.getText());
            task.setPriority(taskUpdate.getPriority());
            task.setDueDate(taskUpdate.getDueDate());

            taskRepository.save(task);
            return new ResponseEntity<String>("task was updated successfully!", HttpStatus.ACCEPTED);
        }
        throw new ApiRequestException(
                String.format("task with id: %02d not found. Could not update!",taskUpdate.getId())
        );
//        return new ResponseEntity<String>("task not found. Could not update!", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> updateDoneStatus(Long id){
        boolean isUpdated = taskRepository.updateDoneState(id);
        if(isUpdated){
            return new ResponseEntity<String>("Done status updated successfully!", HttpStatus.ACCEPTED);
        }
        throw new ApiRequestException(
                String.format("task with id: %02d not found. Could not update!",id)
        );
//        return new ResponseEntity<String>("Done status was not updated, not found!", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<List<Task>> getTasks(TaskRequest taskRequest){
        List<Task> tasks = taskRepository.findByCriteria(taskRequest);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    public ResponseEntity<TimeDTO> getTimeMetrics(){
        TimeDTO time = new TimeDTO();
        List<Task> tasks = taskRepository.findByCriteria(new TaskRequest("","All","Done"));
        time.setAverageTime(averageTime(tasks));

        List<Task> lowPriorTasks = taskRepository.findByCriteria(new TaskRequest("", "Low", "Done"));
        time.setLowPriorTime(averageTime(lowPriorTasks));

        List<Task> mediumPriorTasks = taskRepository.findByCriteria(new TaskRequest("", "Medium", "Done"));
        time.setMediumPriorTime(averageTime(mediumPriorTasks));

        List<Task> highPriorTasks = taskRepository.findByCriteria(new TaskRequest("", "High", "Done"));
        time.setHighPriorTime(averageTime(highPriorTasks));

        return new ResponseEntity<TimeDTO>(time,HttpStatus.CREATED);
    }

    public String averageTime(List<Task> tasks){
        if(tasks.isEmpty()){
            return "00:00:00";
        }
        long seconds = 0L;
        int amountTasks = tasks.size();

        for(Task task: tasks){

        seconds += ChronoUnit.SECONDS.between(task.getCreationDate(), task.getDoneDate());
        }

        long averageSeconds = seconds/amountTasks;
        long hours = averageSeconds / 3600;
        long minutes = (averageSeconds % 3600) / 60;
        seconds = averageSeconds % 60;
        return String.format("%02d:%02d:%02d", hours, minutes, seconds);
    }


}
