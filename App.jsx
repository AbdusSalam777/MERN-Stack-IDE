import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

// Pages
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import EditorComp from "./pages/Editor";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import OverviewPage from "./pages/overviewPage";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import { Footer } from "./components/Footercomponent";
import RequestHistory from "./components/RequestHistory";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* ---------------- PUBLIC ROUTES ---------------- */}
        <Route path="/" element={<HomePage />} />

        <Route
          path="/sign-in/*"
          element={
            <SignedOut>
              <SignInPage />
            </SignedOut>
          }
        />
        <Route
          path="/about"
          element={
           <AboutPage/>
          }
        />

          <Route
          path="/requests"
          element={
           <RequestHistory/>
          }
        />

        <Route
          path="/overview"
          element={
           <OverviewPage/>
          }
        />

        <Route
          path="/contact"
          element={
           <ContactPage/>
          }
        />
        <Route
          path="/sign-in/sso-callback/*"
          element={
            <SignedOut>
              <SignInPage />
            </SignedOut>
          }
        />

        {/* ---------------- PROTECTED ROUTES ---------------- */}
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <EditorComp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor/:id"
          element={
            <ProtectedRoute>
              <EditorComp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />

        {/* ---------------- CATCH ALL ---------------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer/>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </BrowserRouter>
  );
}

export default App;
