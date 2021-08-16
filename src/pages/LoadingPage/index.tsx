import React from "react";
import { CssBaseline } from "@material-ui/core";

import DraaiboekAppBar from "../../components/AppBar";
import Loader from "../../components/Loader";

export default function LoadingPage() {
  return (
    <React.Fragment>
      <CssBaseline />
      <DraaiboekAppBar title="" />
      <Loader />
    </React.Fragment>
  );
}
