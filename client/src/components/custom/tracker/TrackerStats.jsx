import { useState, useEffect, useMemo, useCallback } from "react";
import tasksData from "../../../data/task.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TrackerStats() {
  const [tasks, setTasks] = useState([]);
  const [prevLongestTask, setPrevLongestTask] = useState(0);

  // Load tasks when component mounts
  useEffect(() => {
    setTasks(tasksData); // Simulating data load
  }, []);

  // Compute statistics dynamically
  const taskStats = useMemo(() => {
    if (!tasks?.length) {
      return { totalTime: 0, avgTime: 0, longestTask: 0 };
    }

    const durations = tasks.map((task) => Number(task.duration) || 0);
    const totalTime = durations.reduce((acc, time) => acc + time, 0);
    const avgTime = totalTime / tasks.length || 0;
    const longestTask = Math.max(...durations, 0);

    return { totalTime, avgTime, longestTask };
  }, [tasks]);

  // Track previous longest task
  useEffect(() => {
    if (taskStats.longestTask > prevLongestTask) {
      setPrevLongestTask(taskStats.longestTask);
    }
  }, [taskStats.longestTask, prevLongestTask]);

  // Format time into 00:00
  const formatTime = useCallback((time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, []);

  return (
   
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <Card className="bg-gradient-to-t from-accent/80 to-accent/10 py-8 ">
          <CardHeader>
            <CardTitle>Total Time Spent</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-xl font-bold sm:text-3xl">
            {formatTime(taskStats.totalTime)}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-t from-accent/80 to-accent/10 py-8">
          <CardHeader>
            <CardTitle>Average Task Duration</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-xl font-bold sm:text-3xl">
            {formatTime(taskStats.avgTime)}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-t from-accent/80 to-accent/10 py-8">
          <CardHeader>
            <CardTitle>Longest Task Duration</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-xl font-bold sm:text-3xl">
            {formatTime(taskStats.longestTask)}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-t from-accent/80 to-accent/10 py-8">
          <CardHeader>
            <CardTitle>Previous Longest Task</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-xl font-bold sm:text-3xl">
            {formatTime(prevLongestTask)}
          </CardContent>
        </Card>
      </div>
   
  );
}

export default TrackerStats;
