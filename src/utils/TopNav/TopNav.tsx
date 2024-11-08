"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthToken } from "@/hooks/useAuthToken";
import { Apps } from "@mui/icons-material";
import { Building2, LogIn, LogOut, ScanBarcode, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function TopNav() {
  const { token, removeToken } = useAuthToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Apps className="h-5 w-5 text-primary" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span className="text-xs font-bold">
                  Create Your Own Organization
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Building2 className="mr-2 h-4 w-4" />
                <span className="text-xs font-bold">Create New Department</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <h2 className="text-lg font-bold text-primary">RMTFT</h2>
        </div>
        {token ? (
          <>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5 text-primary" />
              <span className="sr-only">Logout</span>
            </Button>
            <Link to="/qr_code" className="flex items-center gap-2">
              <ScanBarcode className="h-5 w-5 text-primary" />
              <span className="text-sm font-bold text-primary">Show QR</span>
            </Link>
          </>
        ) : (
          <Link to="/login" className="flex items-center gap-2">
            <LogIn className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-primary">Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}
