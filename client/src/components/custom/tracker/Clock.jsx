import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Clock = () => {
  const [time, setTime] = useState(0);
  const [sessionTime, setSessionTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }, []);

  const formattedTime = useMemo(() => formatTime(time), [time, formatTime]);
  const progressValue = useMemo(() => (time / sessionTime) * 100, [time]);

  return (
    <Card className="sm:w-sm w-full  shadow-lg px-3 py-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          Task Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="relative size-46 sm:size-56 p-2">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-300 stroke-current"
              strokeWidth="10"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
            />
            <circle
              className="text-blue-500 stroke-current"
              strokeWidth="10"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              strokeDasharray="283"
              strokeDashoffset={283 - (progressValue / 100) * 283}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
            {formattedTime}
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Button onClick={() => setIsRunning(true)} disabled={isRunning}>
            Start
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsRunning(false)}
            disabled={!isRunning}
          >
            Stop
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              setIsRunning(false);
              setTime(0);
            }}
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Clock;
