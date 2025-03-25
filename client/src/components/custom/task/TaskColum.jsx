import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import TaskCard from "./TasksCard";
import { Skeleton } from "@/components/ui/skeleton";
import tasks from "../../../data/task.json";

function TaskColum() {
  const [isLoading, setIsLoading] = useState(false);
  const taskSection = [
    {
      label: "Todo",
      color: "bg-blue-500",
    },
    {
      label: "In Progress",
      color: "bg-yellow-500",
    },
    {
      label: "Completed",
      color: "bg-green-500",
    },
  ];

  return (
    <section className="mt-3 w-fit p-2 rounded-lg flex justify-center flex-wrap gap-8 sm:justify-normal ">
      {taskSection?.map((item) => {
        const taskCount = tasks?.filter(
          (task) => task?.status?.toLowerCase() == item.label?.toLowerCase()
        )?.length;

        return (
          <div key={item.label} >
            <h2 className="flex items-center gap-2 my-4 justify-center text-center">
              <span className={`${item.color} w-4 h-4 rounded-full`} />
              <span className="mr-6 text-lg font-semibold capitalize">
                {item.label}
              </span>
              <span>
                <Badge variant="secondary" className="ml-auto">
                  {taskCount < 10 ? `0${taskCount}` : taskCount}
                </Badge>
              </span>
            </h2>
            {isLoading ? (
              <div className="min-w-[250px] space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-14 w-full" />
                <div className="grid grid-cols-5 gap-4">
                  <Skeleton className="w-full col-span-3 h-8" />
                  <Skeleton className="w-full col-span-2 h-8" />
                </div>
              </div>
            ) : (
              <>
                {tasks?.map(
                  (task) =>
                    task?.status?.toLowerCase() ===
                      item.label.toLowerCase() && (
                      <TaskCard key={task.id} task={task} />
                    )
                )}
              </>
            )}
          </div>
        );
      })}
    </section>
  );
}

export default TaskColum;
