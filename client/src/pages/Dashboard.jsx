import DashboardCard from "@/components/custom/DashboardCard";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  MenuIcon,
  TimerIcon,
  UsersIcon,
  ClipboardListIcon,
} from "lucide-react";
import React from "react";

function Dashboard() {
  return (
    <div className="flex flex-col gap-2 mt-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Tasks Completed"
          value="20"
          trend="+15%"
          positive
          icon={<ClipboardListIcon className="size-5 text-primary" />}
        />

        <DashboardCard
          title="Tasks Progress"
          value="134"
          trend="+8%"
          positive
          icon={<UsersIcon className="size-5 text-green-500" />}
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
    </div>
  );
}

export default Dashboard;
