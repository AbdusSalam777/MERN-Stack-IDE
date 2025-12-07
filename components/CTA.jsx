import React from "react";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className=" py-12 mt-6 mb-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Start Your Next Project Today!</h2>
        <p className="text-gray-300 mb-6">Create, manage, and showcase your projects with ease.</p>
        <Link
          to="/projects"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded  hover:bg-black"
        ><button className=" active:scale-90">
            Go to Projects
        </button>
        
        </Link>
      </div>
    </section>
  );
};
