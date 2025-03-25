import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Hourglass, PlusCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function TaskFilter() {
  return (
    <div className="flex w-full rounded-lg items-center justify-between p-2 pt-4 gap-2">
      <div className="flex items-center gap-2 sm:gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Filter />
              <span className="hidden sm:block">Filters</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All Tasks</DropdownMenuItem>
            <DropdownMenuItem>High Priority</DropdownMenuItem>
            <DropdownMenuItem>Medium Priority</DropdownMenuItem>
            <DropdownMenuItem>Low Priority</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild >
            <Button variant={"outline"}>
              <Hourglass />
              <span className="hidden sm:block">Priority</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Urgent</DropdownMenuItem>
            <DropdownMenuItem>High</DropdownMenuItem>
            <DropdownMenuItem>Medium</DropdownMenuItem>
            <DropdownMenuItem>Low</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Link to="/add-task">
        <Button variant={"destructive"}>
          <PlusCircle />
          Add Task
        </Button>
      </Link>
    </div>
  );
}

export default TaskFilter;
