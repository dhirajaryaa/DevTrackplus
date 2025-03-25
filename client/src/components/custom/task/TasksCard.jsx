import { useState } from "react";
import { Calendar, Flag } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const TaskCard = ({ task }) => {
  const [isChecked, setIsChecked] = useState(false);

  const statusColors = {
    Todo: "text-blue-500",
    "In Progress": "text-yellow-500",
    Completed: "text-green-500",
  };

  return (
    <article className="mb-4 bg-gradient-to-t from-accent/40 rounded-lg p-4 shadow border w-full max-w-sm">
      {/* Task Header with Checkbox */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => setIsChecked(checked)}
        />
        <h1
          className={`text-lg font-semibold flex items-center gap-2 ${
            isChecked ? "line-through text-gray-400" : ""
          }`}
        >
          <div
            className={`${statusColors[task?.status]} w-4 h-4 rounded-full`}
          />
          {task?.title}
        </h1>
      </div>

      {/* Task Description */}
      <p className="text-sm text-gray-400 mt-2 truncate line-clamp-2">
        {task?.description}
      </p>

      {/* Task Meta Information */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(task?.createdAt).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-1">
          <Flag className="w-4 h-4 text-red-500" />
          {task?.priority}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-3">
        <Badge variant="outline">{task?.status}</Badge>
        <button className="text-blue-500 hover:underline text-sm">
          View Details
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
