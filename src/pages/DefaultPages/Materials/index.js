import React from "react";

import { CssBaseline } from "@material-ui/core";
import useCamp from "../../../hooks/useCamp";
import LoadingPage from "../../LoadingPage";
import DraaiboekAppBar from "../../../components/AppBar";

// import useStyles from "./styles";

export default function MaterialsPage() {
  const [camp, loading] = useCamp();

  // const classes = useStyles();

  if (loading || !camp) {
    return <LoadingPage />;
  }

  const page = camp.pages.find((p) => p.defaultPage === "Materials");

  return (
    <>
      <CssBaseline />
      <DraaiboekAppBar title={page.name} backPage="." />
    </>
  );
}
