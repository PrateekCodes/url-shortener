import React, { Fragment } from "react";
import Header from "./layout/Header";
import UrlTable from "./url/UrlTable";
import PageHead from "./layout/PageHead";

export default () => (
  <Fragment>
    <Header />
    <div className="pt-24 pb-16 lg:pt-28 w-full max-w-screen-lg mx-auto">
      <PageHead />
      <UrlTable />
    </div>
  </Fragment>
);
