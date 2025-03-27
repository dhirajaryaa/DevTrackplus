import { useState } from "react";
import { Button } from "../ui/button";
import UserProfile from "./UserProfile";
import { Link, useLocation } from "react-router-dom";
import { Switch } from "../ui/switch";
import { Moon, SquareDashedBottomCode, Sun } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";

function Header() {
  const { pathname } = useLocation();
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  return (
    <header className="flex sticky z-50 top-0 h-16 shrink-0 w-full justify-between  items-center gap-2 border-b px-4 bg-background/50 backdrop-blur-2xl">
      <div className="flex items-center space-x-2 flex-1">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-8 bg-muted-foreground"
        />
        <h1 className="text-xl sm:text-2xl font-semibold capitalize">
          {pathname.replace("/", "") || "Dashboard"}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {isUserLoggedIn ? (
          <>
            <div className="flex items-center space-x-2">
              <Sun className={`size-5 ${!isDarkMode && "text-sky-500"}`} />
              <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
              <Moon className={`size-5 ${isDarkMode && "text-sky-500"}`} />
            </div>
            <UserProfile />
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <Button variant={"outline"}>Login</Button>
            </Link>
            <Link to={"/signup"}>
              <Button>Signup</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

export const Logo = () => {
  return (
    <Link to="/">
      <div className="flex gap-2 p-3 justify-center bg-accent rounded-md items-center leading-none">
        <SquareDashedBottomCode size={25} />
        <span className="font-semibold text-xl">DevTrack+</span>
      </div>
    </Link>
  );
};
