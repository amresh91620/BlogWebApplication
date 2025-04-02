import React from "react";
import logo from "@/assets/images/logo.png";
import profile from "@/assets/images/profile.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import { RouteBlogAdd, RouteProfile, RouteSignIn } from "@/helpers/RouteName";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaRegUserCircle } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { MdLogout } from "react-icons/md";





const Topbar = () => {
  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b top-0">
      <div>
        <img src={logo} width={60} alt="Logo" />
      </div>
      <div className="w-[500px]">
        <SearchBox />
      </div>
      <div>
        {/* <Button asChild className="rounded-full">
          <Link to={RouteSignIn} >
            <MdLogin />
            Sing In
          </Link>
        </Button> */}


        <DropdownMenu>
          <DropdownMenuTrigger>
          <Avatar>
          <AvatarImage src={profile} />
          <AvatarFallback><img src={profile} alt="Profile"/></AvatarFallback>
        </Avatar>
          </DropdownMenuTrigger>

       <DropdownMenuContent>
  <DropdownMenuLabel>
    <p>Amresh Kumar</p>
    <p className="text-sm">amresh91620@gmail.com</p>
  </DropdownMenuLabel>


  <DropdownMenuItem asChild className="cursor-pointer">
    <Link to={RouteProfile} className="flex items-center gap-2">
      <FaRegUserCircle /> Profile
    </Link>
  </DropdownMenuItem>

  <DropdownMenuItem asChild className="cursor-pointer">
    <Link to={RouteBlogAdd} className="flex items-center gap-2">
      <MdAdd /> Create blog
    </Link>
  </DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem asChild className="cursor-pointer">
    <Link to="" className="flex items-center gap-2">
      < MdLogout  color="red"/> Logout
    </Link>
  </DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>



      </div>
    </div>
  );
};

export default Topbar;
