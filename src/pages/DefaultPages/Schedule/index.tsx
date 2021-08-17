import React from "react";
import { useHistory } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import DraaiboekAppBar from "../../../components/AppBar";
import { Camp } from "../../../hooks/useCamp";
import Calendar from "./Calendar";
import NotFoundPage from "../../NotFoundPage";

export default function SchedulePage({ camp }: { camp: Camp }) {
  const history = useHistory();

  const page = camp.pages.find((p) => p.defaultPage === "Schedule");

  if (!page) {
    return <NotFoundPage />;
  }

  return (
    <>
      <CssBaseline />
      <DraaiboekAppBar title={page.name} backPage="." />
      <Calendar
        camp={camp}
        onSelectEvent={(event: any) => history.push(`./activity/${event.id}`)}
      />
    </>
  );
}
