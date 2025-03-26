import React, { useState, useMemo, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TaskSelect({ tasks, setClockTitle }) {
  const [selectedTask, setSelectedTask] = useState("");

  // Memoize tasks to avoid unnecessary calculations
  const memoizedTasks = useMemo(() => tasks || [], [tasks]);

  // Handle selection efficiently
  const handleSelect = useCallback(
    (value) => {
      setSelectedTask(value);
      setClockTitle(value);
    },
    [setClockTitle]
  );

  return (
    
    <Select value={selectedTask} onValueChange={handleSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Task" />
      </SelectTrigger>
      <SelectContent>
        {memoizedTasks.map((task) => (
          <SelectItem value={task.title} key={task.title}>
            {task.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default TaskSelect;
