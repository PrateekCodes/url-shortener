import React, { useState } from "react";
import API from "../../utils/API";

export default ({ categories, setCategories, setAlert }) => {
  const colors = [
    "#bfdadc",
    "#ffffff",
    "#cc0000",
    "#acacac",
    "#9fc8ea",
    "#f4b4a4",
    "#10c947",
    "#0989bc",
    "#eaf47c",
  ];

  const [title, setTitle] = useState("");
  const [colorIndex, setColorIndex] = useState(0);
  const [color, setColor] = useState(colors[colorIndex]);

  const handleCancel = () => {
    setTitle("");
    setColor("#bfdadc");
    setColorIndex(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && color && color.length === 7) {
      try {
        const res = await API("categories/", "post", {
          category: { title, color },
        });
        setCategories(categories.concat(res.data.category));
      } catch ({ response: { data } }) {
        setAlert(data.errors[0]);
        setTimeout(() => setAlert(""), 4000);
      }
    } else {
      if (color.length !== 7) setAlert("Hex color length is not equal to 7");
      else setAlert("Title or Color missing.");
      setTimeout(() => setAlert(""), 4000);
    }
  };

  return (
    <form className="w-full mt-3 mb-2" onSubmit={handleSubmit}>
      <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          name="title"
          value={title}
          placeholder="Enter category name"
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <button
          type="button"
          style={{ backgroundColor: color }}
          onClick={() => {
            setColorIndex(colorIndex < colors.length ? colorIndex + 1 : 0);
            setColor(colors[colorIndex]);
          }}
          className="appearance-none py-1 px-3 rounded-full"
        >
          <svg
            className="octicon octicon-sync js-new-label-color-icon text-gray-dark"
            viewBox="0 0 12 16"
            version="1.1"
            width="12"
            height="16"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10.24 7.4a4.15 4.15 0 01-1.2 3.6 4.346 4.346 0 01-5.41.54L4.8 10.4.5 9.8l.6 4.2 1.31-1.26c2.36 1.74 5.7 1.57 7.84-.54a5.876 5.876 0 001.74-4.46l-1.75-.34zM2.96 5a4.346 4.346 0 015.41-.54L7.2 5.6l4.3.6-.6-4.2-1.31 1.26c-2.36-1.74-5.7-1.57-7.85.54C.5 5.03-.06 6.65.01 8.26l1.75.35A4.17 4.17 0 012.96 5z"
            ></path>
          </svg>
        </button>
        <input
          type="text"
          name="color"
          value={color}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          placeholder="Enter hex color"
          onChange={({ target: { value } }) => setColor(value)}
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          Create Category
        </button>
        <button
          type="button"
          className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
