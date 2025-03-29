import { useState } from "react";
import { Calendar, Flag } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const TaskCard = ({ task }) => {
  const [isChecked, setIsChecked] = useState(task?.completed);

  const getStatusColor = function (status) {
    switch (status) {
      case "Todo":
        return "text-blue-500 bg-blue-100";
      case "In Progress":
        return "text-yellow-500 bg-yellow-100";
      case "Completed":
        return "text-red-500 bg-red-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <article className="mb-4 bg-gradient-to-t from-accent/40 rounded-lg p-4 shadow border w-full max-w-sm">
      {/* Task Header with Checkbox */}
      <div className="flex items-center gap-5 ">
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => setIsChecked(checked)}
        />
        <h1
          className={`text-lg font-semibold flex items-center gap-2 ${
            isChecked ? "line-through text-gray-400" : ""
          }`}
        >
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
        <Badge variant="outline" className={`${getStatusColor(task.status)}`}>
          {task?.status}
        </Badge>
        <button className="text-blue-500 hover:underline text-sm">
          View Details
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
