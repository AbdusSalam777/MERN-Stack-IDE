import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { Navbar } from "../components/Navbar";

const SignInPage = () => {
  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SignIn appearance={{ elements: { formButtonPrimary: "bg-blue-600 hover:bg-blue-700" } }} />
    </div>
    </>
    
  );
};

export default SignInPage;