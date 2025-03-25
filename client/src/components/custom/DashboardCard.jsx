import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

function DashboardCard({ title, value, trend, positive, icon }) {
  return (
    <Card className="py-4 md:py-8 shadow-md bg-gradient-to-t from-accent/80 to-accent/10">
      <CardHeader className="relative flex items-center gap-4">
        {icon}
        <div>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold">{value}</CardTitle>
        </div>
        <div className="absolute right-4 top-4 mt-2">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            {positive ? (
              <TrendingUpIcon className="size-3" />
            ) : (
              <TrendingDownIcon className="size-3" />
            )}
            {trend}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="text-sm">
        {positive ? "Great progress!" : "Needs improvement"}
      </CardFooter>
    </Card>
  );
}

export default DashboardCard;
