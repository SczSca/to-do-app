package com.todo.demo.Service;
import com.todo.demo.Entity.Task;
import com.todo.demo.Model.dto.TaskDTO;
import com.todo.demo.Repository.TaskRepository;
import com.todo.demo.Repository.TaskRepositoryI;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
//import java.util.*;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.Collectors;

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
        return new ResponseEntity<String>("task not found. Could not update!", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> updateDoneStatus(Long id){
        boolean isUpdated = taskRepository.updateDoneState(id);
        if(isUpdated){
            return new ResponseEntity<String>("Done status updated successfully!", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<String>("Done status was not updated, not found!", HttpStatus.BAD_REQUEST);
    }


}
