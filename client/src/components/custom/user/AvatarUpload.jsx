import React, { useRef, useState } from "react";
import { Camera, CircleX, Loader2, Upload } from "lucide-react";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function AvatarUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || null);

  const avatarRef = useRef(null);

  const handleAvatarClick = () => {
    if (avatarRef.current) {
      avatarRef.current.click();
    }
  };

  const handleFileChange = (e) => {   
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        ref={avatarRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <Avatar
        className="size-35 mx-auto cursor-pointer relative"
        onClick={handleAvatarClick}
      >
        <div className="absolute size-35 top-0 left-0 bg-transparent hover:bg-gray-900/40 border-accent-foreground/80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Camera className="text-white size-8 dark:text-black border-accent-foreground/80 " />
        </div>
        <AvatarImage src={avatarPreview} alt={user?.name} />
      </Avatar>
      <div className="w-full flex items-center mt-4 gap-3 justify-center">
        <Button 
          type="button"
          disabled={isLoading }
          variant="outline"
          className={`${
            avatarPreview === user?.avatar?.url ? "hidden" : "block"
          }`}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <Upload />}
        </Button>
      </div>
    </div>
  );
}

export default AvatarUpload;
