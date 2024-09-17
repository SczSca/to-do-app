package com.todo.demo.Entity;

import java.util.HashMap;
import java.util.Map;

public class PriorityMap {
    public static final Map<String, Integer> PRIORITY_MAP = new HashMap<>();

    static {
        PRIORITY_MAP.put("Low", 1);
        PRIORITY_MAP.put("Medium", 2);
        PRIORITY_MAP.put("High", 3);
    }
}
