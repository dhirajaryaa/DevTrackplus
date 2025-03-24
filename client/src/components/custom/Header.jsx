import { useState } from "react";
import { Button } from "../ui/button";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";
import { Switch } from "../ui/switch";
import { Moon, Sun } from "lucide-react";

function Header() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  return (
    <header className="fixed top-0 z-50 w-full h-16 bg-white/80 backdrop-blur-2xl border-b flex items-center justify-center">
      <div className="container mx-auto px-3 flex items-center justify-between">
        <Logo />
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
      </div>
    </header>
  );
}

export default Header;

export const Logo = () => {
  return (
    <div className="relative inline-block px-2 py-1 select-none">
      <div className="absolute top-0 left-0 w-full h-full bg-sky-100 dark:bg-pink-600 rounded-md -rotate-1 -z-5"></div>
      <span className="text-black dark:text-white font-bold text-xl">
        DevTrack+
      </span>
    </div>
  );
};
