import React from "react";
import logo from "@/assets/images/logo.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import { RouteSignIn } from "@/helpers/RouteName";
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
        <Button asChild className="rounded-full">
          <Link to={RouteSignIn} >
            <MdLogin />
            Sing In
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
