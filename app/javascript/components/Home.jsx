import React, { Fragment } from "react";
import Header from "./Header/Header";
import UrlTable from "./Url/UrlTable";
export default () => (
  <Fragment>
    <Header />
    <div className="pt-24 pb-16 lg:pt-28 w-full max-w-screen-lg mx-auto">
      <UrlTable />
    </div>
  </Fragment>
);
