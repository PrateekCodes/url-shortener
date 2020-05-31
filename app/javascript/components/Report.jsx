import React, { Fragment } from "react";
import Header from "./layout/Header";
import PageHead from "./layout/PageHead";
import ReportTable from "./report/ReportTable";

export default () => (
  <Fragment>
    <Header />
    <div className="pt-24 pb-16 lg:pt-28 w-full max-w-screen-lg mx-auto">
      <PageHead />
      <ReportTable />
    </div>
  </Fragment>
);
