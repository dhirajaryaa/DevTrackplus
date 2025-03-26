import { useState, useMemo } from "react";
import Clock from "@/components/custom/tracker/clock";
import TaskSelect from "@/components/custom/tracker/TaskSelect";
import TaskTable from "@/components/custom/tracker/TaskTable";
import tasksData from "../data/task.json";
import TrackerStats from "@/components/custom/tracker/TrackerStats";

function TimeTracker() {
  const [clockTitle, setClockTitle] = useState("Task Timer");
  const tasks = useMemo(() => tasksData || [], [tasksData]);

  return (
    <section className="w-full h-full p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Left Section (Tasks & Stats) */}
      <div className="md:col-span-2 w-full">
        <h2 className="text-lg font-semibold mb-3">Select Task</h2>
        <TaskSelect tasks={tasks} setClockTitle={setClockTitle} />

        {/* Stats Section */}
        <div className="pt-3">
          <h2 className="text-lg font-semibold mb-3">Tasks Stats</h2>
          <TrackerStats />
        </div>
      </div>

      {/* Clock Section */}
      <div className="w-full">
        <Clock clockTitle={clockTitle} />
      </div>

      {/* Recent Tracked Tasks */}
      <div className="w-full col-span-1 md:col-span-3">
        <h2 className="text-lg font-semibold mb-3">Recent Time Tracked</h2>
        <TaskTable tasks={tasks} />
      </div>
    </section>
  );
}

export default TimeTracker;
