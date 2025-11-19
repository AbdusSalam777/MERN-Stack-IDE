import React, { useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();
  const toastShown = useRef(false); // track karne ke liye

  if (!isLoaded) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (!isSignedIn) {
    if (!toastShown.current) {
      toast.error("Login First!");
      toastShown.current = true; // sirf ek baar show kare
    }
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;