import React, { Fragment } from "react";
import Header from "./layout/Header";
import PageHead from "./layout/PageHead";
import CategoryTable from "./categories/CategoryTable";

export default () => (
  <Fragment>
    <Header />
    <div className="pt-24 pb-16 lg:pt-28 w-full max-w-screen-lg mx-auto">
      <PageHead />
      <CategoryTable />
    </div>
  </Fragment>
);
