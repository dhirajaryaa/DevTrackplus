import React, { useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function TaskTable({ tasks }) {
  
  // Function to format time into HH:MM or return "00:00" if missing
  const formatTime = (time) => {
    if (!time) return "00:00"; // Handle missing time
    const date = new Date(time);
    if (isNaN(date.getTime())) return "00:00"; // Handle invalid date
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Function to format duration into HH:MM:SS (Handles NaN by returning "00:00:00")
  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };
  

  // Memoized task data
  const memoizedTasks = useMemo(() => tasks || [], [tasks]);

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full border rounded-lg">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-left p-3">Task Name</TableHead>
            <TableHead className="text-left p-3">Start Time</TableHead>
            <TableHead className="text-left p-3">End Time</TableHead>
            <TableHead className="text-left p-3">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memoizedTasks.length > 0 ? (
            memoizedTasks.map((task) => (
              <TableRow key={task._id} className="border-b">
                <TableCell className="p-3">{task.title || "Untitled Task"}</TableCell>
                <TableCell className="p-3">{formatTime(task.startTime)}</TableCell>
                <TableCell className="p-3">{formatTime(task.endTime)}</TableCell>
                <TableCell className="p-3">{formatDuration(task.duration
)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center p-4">
                No tasks available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TaskTable;
