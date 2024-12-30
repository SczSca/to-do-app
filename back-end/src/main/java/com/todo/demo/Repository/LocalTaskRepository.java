package com.todo.demo.Repository;

import com.todo.demo.Entity.PriorityMap;
import com.todo.demo.Entity.Task;
import com.todo.demo.Model.dto.TaskDTO;
import com.todo.demo.Model.dto.TasksPageResultDTO;
import com.todo.demo.Model.request.TaskSearchRequest;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public class LocalTaskRepository implements TaskRepository {
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

    /**
     * Updates the done state of a task identified by its ID.
     * If the task is marked as done, it will be marked as not done and vice versa.
     * The done date is set to the current date and time if the task is marked as done.
     *
     * @param id the ID of the task to update
     * @return true if the task was found and updated, false otherwise
     */
    @Override
    public boolean updateDoneState(Long id) {
        Optional<Task> taskFound = findById(id);

        if (taskFound.isPresent()) {
            Task task = taskFound.get();
            Instant doneDate = null;
            boolean previousVal = task.getIsDone();

            // Toggle the done state of the task
            task.setIsDone(!previousVal);

            // Set the done date to the current date and time if the task is now marked as done
            if (!previousVal) {
                doneDate = Instant.now();
            }

            task.setDoneDate(doneDate);
            return true;
        }
        return false;
    }

    @Override
    public boolean save(Task task) {
        try{
            if (task.getId() == null) {

                task.setId(currentId++);
            }
            taskStorage.put(task.getId(), task);
            return true;
        } catch (Exception e) {
            // Log the exception if necessary
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean delete(Long id) {
        Task removedTask = taskStorage.remove(id);
        return removedTask != null;
    }

    @Override
    public TasksPageResultDTO findByCriteriaPagination(TaskSearchRequest taskSearchRequest){
        String status = taskSearchRequest.getStatus();
        String text = taskSearchRequest.getText();
        String priority = taskSearchRequest.getPrior();
        boolean isDateAsc = taskSearchRequest.isDateAsc();
        boolean isPriorAsc = taskSearchRequest.isPriorAsc();
        int page = taskSearchRequest.getPage();


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
                    //convert dueDate to days since 1970
                    int dateComparison = a.getDueDate().compareTo(b.getDueDate());
                    if(dateComparison != 0){
                        //if isDateAsc is false, reverse the comparison to sort in descending order
                        if(!isDateAsc){
                            dateComparison *= -1;
                        }
                        return dateComparison;
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

                    //if isPriorAsc is false, reverse the comparison to sort in descending order
                    if(!isPriorAsc){
                        priorComparison *= -1;
                    }

                    //
                    return priorComparison;
                })
                .toList();

        int tasksAmount = tasksList.size();
        int elementsInPagination = 10;
        long pageSize = tasksAmount / elementsInPagination;

        //if there is some remainder tasks, add a page for them
        if(tasksAmount % elementsInPagination > 0){
            pageSize++;
        }

        int fromIndex = elementsInPagination * (page - 1);

        // Calculate the sublist for pagination. The Math.min function ensures that the toIndex value does not exceed the size of the tasksList,
        // which prevents an IndexOutOfBoundsException. This is particularly useful for the last page, which may contain fewer than 10 tasks.
        List<Task> tasksFromPage = tasksList.subList(fromIndex, Math.min(fromIndex + 10, tasksAmount));

        return new TasksPageResultDTO(tasksFromPage,pageSize,page);
    }

    /**
     * Finds tasks based on the given criteria.
     * Filters tasks by status, text, and priority as specified in the TaskRequest.
     *
     * @param taskFilter the criteria for filtering tasks
     * @return a list of tasks that match the given criteria
     */
    @Override
    public List<Task> findByCriteria(TaskDTO taskFilter) {
        String status = taskFilter.getStatus();
        String text = taskFilter.getText();
        String priority = taskFilter.getPriority();

        return taskStorage.values().stream()
                .filter(task -> text.isEmpty() || task.getText().toLowerCase().contains(text.toLowerCase()))
                .filter(task -> priority.equals("All") || task.getPriority().equals(priority))
                .filter(task -> status.equals("All") ||
                        (status.equals("Completed") && task.getIsDone()) ||
                        (status.equals("Pending") && !task.getIsDone()))
                .collect(Collectors.toList());
    }

    @Override
    public boolean deleteAll() {
        taskStorage.clear();
        return true;
    }


    @Override
    public boolean saveAll(List<Task> taskList) {
        for(Task task: taskList){
            save(task);
        }
        return true;
    }


}
