import React from "react";
import CategoryCard from "./CategoryCard";

export default ({ categories, setCategories, setAlert }) => {
  return (
    <table className="table-auto w-full">
      <thead className="text-teal-700">
        <tr>
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Color</th>
          <th className="px-4 py-2">Edit</th>
          <th className="px-4 py-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            categories={categories}
            setCategories={setCategories}
            setAlert={setAlert}
          />
        ))}
      </tbody>
    </table>
  );
};
