import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "@/app/auth/authApi";
import { removeUser } from "@/app/auth/authReducer";
import { toast } from "sonner";

function UserProfile() {
  const { user } = useSelector((state) => state.auth);
  const [logout, { isLoading }] = useLogoutUserMutation();
  const dispatch = useDispatch();

  function logoutUser() {
    logout()
      .unwrap()
      .then(() => {
        toast.success("Logout Successful");
        dispatch(removeUser());
      })
      .catch((err) => {
        const message = `Logout Failed!: ${err?.data?.message}`;
        toast.error(message);
        console.error(message, err);
      });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center cursor-pointer border-[3px] border-accent-foreground/80 rounded-full p-[1px]">
          <Avatar className={"cursor-pointer sm:size-9"}>
            <AvatarImage src={user?.avatar?.url} alt={user?.name} />
            <AvatarFallback className={"font-bold uppercase text-xl"}>
              {user?.name
                ?.split(" ")
                .map((name) => name[0])
                .join("") || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className={"text-center"}>
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            Profile
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logoutUser}>
            <LogOut />
            Logout
            <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfile;
