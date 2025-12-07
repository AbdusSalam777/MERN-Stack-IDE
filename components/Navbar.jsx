import React from "react";
import { Link } from "react-router-dom";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";

export const Navbar = () => {
  return (
    <nav className="w-full bg-[#1e1e1e] border-b border-gray-700 py-3 px-6 flex justify-between items-center">
      <Link to="/" className="text-green-400 text-2xl font-bold">
        CodePlayground
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
        <Link to="/editor" className="text-gray-300 hover:text-white transition-colors">Editor</Link>
        <Link to="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link>
        <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
      </div>

      <SignedOut>
        <Link
          to="/sign-in"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          Sign In
        </Link>
      </SignedOut>

      <SignedIn>
        <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
      </SignedIn>
    </nav>
  );
};
