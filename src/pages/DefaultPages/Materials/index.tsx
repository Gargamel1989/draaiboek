import React from "react";

import { CssBaseline } from "@material-ui/core";
import { Camp } from "../../../hooks/useCamp";
import DraaiboekAppBar from "../../../components/AppBar";
import NotFoundPage from "../../NotFoundPage";

// import useStyles from "./styles";

export default function MaterialsPage({ camp }: { camp: Camp }) {
  // const classes = useStyles();

  const page = camp.pages.find((p) => p.defaultPage === "Materials");

  if (!page) {
    return <NotFoundPage />;
  }

  return (
    <>
      <CssBaseline />
      <DraaiboekAppBar title={page.name} backPage="." />
    </>
  );
}
