import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { HiMenu } from "react-icons/hi";
import { VscClose } from "react-icons/vsc";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  if (isActive) document.body.className = "overflow-hidden";

  const onLogout = () => {
    console.log("user is logged out");
  };

  const NavSmall = () => {
    return (
      <nav className="md:hidden flex justify-between items-center h-14 bg-transparent text-blue-100 px-8 border-b-2 border-blue-100 ">
        <h1 className="text-2xl font-semibold">Fendch</h1>

        {isActive ? (
          <VscClose
            className="text-2xl cursor-pointer hover:scale-105 hover:text-blue-200 transition"
            onClick={() => setIsActive(false)}
          />
        ) : (
          <HiMenu
            className="text-2xl cursor-pointer hover:scale-105 hover:text-blue-200 transition"
            onClick={() => setIsActive(true)}
          />
        )}

        <ul
          className={`md:hidden ${
            isActive ? "flex flex-col" : "hidden"
          } items-center justify-center gap-4 text-blue-100 px-8 fixed top-14 left-0 right-0 bottom-0 z-40 bg-gradient-to-r from-violet-500 to-indigo-500`}
        >
          <Link
            to="/"
            className="text-2xl text-blue-50 hover:text-blue-300 hover:scale-105 transition"
          >
            Home
          </Link>
          <Link
            to="/projects"
            className="text-2xl text-blue-50 hover:text-blue-300 hover:scale-105 transition"
          >
            All Projects
          </Link>
          <Link
            to="/login"
            className="text-2xl text-blue-50 hover:text-blue-300 hover:scale-105 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-2xl text-blue-50 hover:text-blue-300 hover:scale-105 transition"
          >
            Register
          </Link>
          <Link
            to="/admin"
            className="text-2xl text-blue-50 hover:text-blue-300 hover:scale-105 transition"
          >
            Admin
          </Link>
        </ul>
      </nav>
    );
  };

  return (
    <>
      <NavSmall />
      <nav className="hidden md:flex gap-4 items-center justify-between h-14 bg-gradient-to-r from-violet-600 to-blue-600 text-blue-100 px-8 border-b-2 border-blue-100">
        <div className="flex gap-4 items-center">
          <h1 className="text-2xl font-semibold">Fendch</h1>
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <Link to="/challenges">
            <Button>Challenges</Button>
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
