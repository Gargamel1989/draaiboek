import React from "react";
import { useHistory } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import DraaiboekAppBar from "../../../components/AppBar";
import useCamp from "../../../hooks/useCamp";
import LoadingPage from "../../LoadingPage";
import Calendar from "./Calendar";

export default function SchedulePage() {
  const history = useHistory();

  const [camp, loading] = useCamp();

  if (loading || !camp) {
    return <LoadingPage />;
  }

  const page = camp.pages.find((p) => p.defaultPage === "Schedule");

  return (
    <>
      <CssBaseline />
      <DraaiboekAppBar title={page.name} backPage="." />
      <Calendar
        camp={camp}
        onSelectEvent={(event) => history.push(`./activity/${event.id}`)}
      />
    </>
  );
}
