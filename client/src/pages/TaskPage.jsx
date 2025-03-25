import TaskColum from "@/components/custom/task/TaskColum";
import TaskFilter from "@/components/custom/task/TaskFilter";
import React from "react";

function TaskPage() {
  return (
    <section>
      <TaskFilter />
      <TaskColum />
    </section>
  );
}

export default TaskPage;
