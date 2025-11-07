import React from "react";
import { Navbar } from "../components/Navbar";
import { ProjectsCard } from "../components/ProjectsCard";

const ProjectsPage = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#1e1e1e] text-white flex flex-col items-center pt-24">
        <ProjectsCard />
      </div>
    </>
  );
};

export default ProjectsPage;
