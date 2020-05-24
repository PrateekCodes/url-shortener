import React, { Fragment, useState, useEffect } from "react";
import Header from "./layout/Header";
import PageHead from "./layout/PageHead";
import CategoryTable from "./categories/CategoryTable";
import AddCategory from "./categories/AddCategory";
import Alert from "./layout/Alert";

import API from "../utils/API";

export default () => {
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    (async () => {
      const res = await API("categories/", "get");
      if (res.status === 200) {
        setCategories(res.data.categories);
      }
    })();
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="pt-24 pb-16 lg:pt-28 w-full max-w-screen-lg mx-auto">
        {alert && <Alert message={alert} />}
        <PageHead />
        <AddCategory
          setAlert={setAlert}
          categories={categories}
          setCategories={setCategories}
        />
        <CategoryTable
          setAlert={setAlert}
          categories={categories}
          setCategories={setCategories}
        />
      </div>
    </Fragment>
  );
};
