package com.todo.demo.Repository;

import com.todo.demo.Entity.Task;
import com.todo.demo.Model.request.TaskRequest;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class TaskRepository implements TaskRepositoryI {
    private final HashMap<Long, Task> taskStorage = new HashMap<>();
    private long currentId = 1L;

    @Override
    public List<Task> findAll() {
        return new ArrayList<>(taskStorage.values());
    }

    @Override
    public Optional<Task> findById(Long id) {
        return Optional.ofNullable(taskStorage.get(id));
    }

    @Override
    public boolean updateDoneState(Long id) {
        Optional<Task> taskFound = findById(id);

        if(taskFound.isPresent()){
            Task task = taskFound.get();
            boolean previousVal = task.getIsDone();
            task.setIsDone(!previousVal);
            task.setDoneDate(previousVal ? null : LocalDateTime.now());
            return true;
        }
        return false;
    }

    @Override
    public void save(Task task) {
        if (task.getId() == null) {

            task.setId(currentId++);
        }
        taskStorage.put(task.getId(), task);
    }

    @Override
    public void delete(Long id) {

        taskStorage.remove(id);
    }

    @Override
    public List<Task> findByCriteria(TaskRequest taskRequest){
        String status = taskRequest.getStatus();
        String text = taskRequest.getText();
        String priority =taskRequest.getPriority();
        //TODO TRY IT
        return taskStorage.values().stream()
                .filter(task -> text.isEmpty() || task.getText().toLowerCase().contains(text.toLowerCase()))
                .filter(task ->  priority.equals("All") || task.getPriority().equals(priority))
                .filter(task -> status.equals("All") || status.equals("Done") && task.getIsDone() || status.equals("Pending") && !task.getIsDone())
                .collect(Collectors.toList());
    }

    @Override
    public void deleteAll() {
        taskStorage.clear();
    }


    @Override
    public void saveAll(List<Task> taskList) {
        for(Task task: taskList){
            save(task);
        }
    }


}
