package com.todo.demo.Repository;

import com.todo.demo.Entity.PriorityMap;
import com.todo.demo.Entity.Task;
import com.todo.demo.Model.dto.TasksPageResultDTO;
import com.todo.demo.Model.request.TaskRequest;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.*;
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
    public TasksPageResultDTO findByCriteriaPagination(TaskRequest taskRequest, int page, boolean isDateAsc, boolean isPriorAsc){
        String status = taskRequest.getStatus();
        String text = taskRequest.getText();
        String priority =taskRequest.getPriority();

        //filtering tasks based on the param sent from frontend
        //sorting tasks based on dueDate and Prior order
        List<Task> tasksList = taskStorage.values().stream()
                .filter(task -> text.isEmpty() || task.getText().toLowerCase().contains(text.toLowerCase()))
                .filter(task -> priority.equals("All") || task.getPriority().equals(priority))
                .filter(task -> status.equals("All") || status.equals("Completed") && task.getIsDone() || status.equals("Pending") && !task.getIsDone())
                .sorted((a, b) ->{

                    if (a.getDueDate() == null && b.getDueDate() != null) {
                        return 1; // `a` no date move to the end
                    } else if (a.getDueDate() != null && b.getDueDate() == null) {
                        return -1; // `b` no date move to the end
                    } else if (a.getDueDate() == null && b.getDueDate() == null) {
                        return 0; // Stay the same index/position
                    }

                    assert a.getDueDate() != null;
                    long dateA = a.getDueDate().toLocalDate().toEpochDay();  // days since 1970
                    long dateB = b.getDueDate().toLocalDate().toEpochDay();



                    int dateComparison = Long.compare(dateA,dateB);
                    if(dateComparison != 0){
                        return isDateAsc ? dateComparison : -dateComparison;
                    }

                    /*
                      Returns value from prior key where keys are:
                      {
                           "High": 3
                           "Medium": 2
                           "Low": 1
                       }
                    */
                    int priorA = PriorityMap.PRIORITY_MAP.get(a.getPriority());
                    int priorB = PriorityMap.PRIORITY_MAP.get(b.getPriority());
                    int priorComparison = Integer.compare(priorA,priorB);

                    return isPriorAsc ? priorComparison : -priorComparison;
                })
                .toList();

        int tasksAmount = tasksList.size();
        int elementsInPagination = 10;
        long pages = tasksAmount / elementsInPagination;
        //if there is some remainder tasks, add a page for them
        long pageSize = (tasksAmount % elementsInPagination) > 0 ? pages+1L : pages;

        int fromIndex = elementsInPagination * (page - 1);

        //Before using Math.min, my idea was to have an "if" to check if 10 * page was bigger than the last elements, adjust the value to avoid IndexOutOfBoundsException
        //Math.min checks if last page has less than 10 tasks, toIndex value adjusts to last tasksList's index
        List<Task> tasksFromPage = tasksList.subList(fromIndex, Math.min(fromIndex + 10, tasksAmount));

        return new TasksPageResultDTO(tasksFromPage,pageSize,page);
    }

    @Override
    public List<Task> findByCriteria(TaskRequest taskRequest){
        String status = taskRequest.getStatus();
        String text = taskRequest.getText();
        String priority =taskRequest.getPriority();

        return taskStorage.values().stream()
                .filter(task -> text.isEmpty() || task.getText().toLowerCase().contains(text.toLowerCase()))
                .filter(task ->  priority.equals("All") || task.getPriority().equals(priority))
                .filter(task -> status.equals("All") || status.equals("Completed") && task.getIsDone() || status.equals("Pending") && !task.getIsDone())
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
