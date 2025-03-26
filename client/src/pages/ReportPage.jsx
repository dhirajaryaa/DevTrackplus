import tasks from "../data/task.json";
import time from "../data/time.json"
import DashboardCard from "../components/custom/DashboardCard";
import { ClipboardListIcon, TimerIcon, TrendingUpIcon } from "lucide-react";
import TaskTable from "@/components/custom/tracker/TaskTable";

function ReportPage() {
  return (
    <section className="w-full h-full p-4 grid grid-rows-4 gap-5">
      <div className="grid grid-cols-3 gap-4">
        <DashboardCard
          title="Tasks Completed"
          value="20"
          trend="+15%"
          positive
          icon={<ClipboardListIcon className="size-5 text-primary" />}
        />

        <DashboardCard
          title="Time Tracked"
          value="120h"
          trend="+20%"
          positive
          icon={<TimerIcon className="size-5 text-blue-500" />}
        />

        <DashboardCard
          title="Productivity Score"
          value="87%"
          trend="+3%"
          icon={<TrendingUpIcon className="size-5 text-yellow-500" />}
        />
      </div>
      <div className="row-span-3">
        <TaskTable tasks={time} />
      </div>
    </section>
  );
}

export default ReportPage;
