import React, { useState } from "react";
import { CircleX, Loader2, Upload } from "lucide-react";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function AvatarUpload() {
  const [isLoading, setIsLoading] = useState();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full">
      <Avatar className={"size-30 mx-auto relative"}>
        <AvatarImage src={user?.avatar?.url} alt={user?.name} />
      </Avatar>
      <div className="w-full flex items-center mt-4 gap-3 justify-center">
        <div>
          <input type="file" accept="image/*" />
        </div>
        <Button
          variant="outline"
          type="button"
          size="icon"
          disabled={isLoading}
        >
          <CircleX />
        </Button>
        <Button
          type="button"
          disabled={isLoading}
          variant="outline"
          size="icon"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <Upload />}
        </Button>
      </div>
    </div>
  );
}

export default AvatarUpload;
