import React from "react";
import { useLocation, Link } from "react-router-dom";

export default () => {
  const path = useLocation().pathname;
  return (
    <div className="container mx-auto px-6 flex justify-between items-center mb-4">
      <span className="leading-normal text-xl text-gray-700 font-bold">
        List of {path === "/" ? " Urls" : "Categories"}
      </span>
      <Link
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        to={path === "/" ? "categories" : "/"}
      >
        Manage {path === "/" ? "Categories" : "Urls"}
      </Link>
    </div>
  );
};
