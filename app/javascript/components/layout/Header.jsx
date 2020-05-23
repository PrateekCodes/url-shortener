import React from "react";

export default () => {
  return (
    <header className="top-0 lef-0 w-full z-40 bg-white fixed border-b border-gray-200">
      <nav className="container mx-auto px-6 h-16 flex justify-center items-center">
        <div className="cursor-pointer text-teal-700 font-bold text-xl">
          &lt;{" "}
          <span className="text-black">
            Url <span className="text-gray-700">Shortener</span>
          </span>{" "}
          <span className="text-yellow-500">/</span>&gt;
        </div>
      </nav>
    </header>
  );
};
