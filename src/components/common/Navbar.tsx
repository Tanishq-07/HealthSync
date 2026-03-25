import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import { firebaseLogout } from "../../firebase/authService";
import { logout } from "../../modules/auth/authSlice";
import { LogOut, Bell, Heart } from "lucide-react";
import MobileSidebar from "./MobileSidebar";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);

  const handleLogout = async () => {
    await firebaseLogout();
    dispatch(logout());
  };

  const initials = user?.displayName
    ? user.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.charAt(0).toUpperCase() ?? "U";

  const displayName = user?.displayName ?? user?.email?.split("@")[0] ?? "User";
  const role = user?.role ?? "Administrator";

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <div className="flex items-center gap-2 font-bold text-blue-600 text-lg">
          <Heart className="w-5 h-5 hidden md:block" />
          <span>HealthCore</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        
        <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
            {initials}
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-semibold text-slate-800">{displayName}</p>
            <p className="text-xs text-slate-400 capitalize">{role}</p>
          </div>
        </div>

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline font-medium">Logout</span>
        </button>

      </div>
    </header>
  );
};

export default Navbar;