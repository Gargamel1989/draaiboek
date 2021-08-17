import React from "react";

import { CssBaseline } from "@material-ui/core";
import { Camp } from "../../../hooks/useCamp";
import DraaiboekAppBar from "../../../components/AppBar";
import NotFoundPage from "../../NotFoundPage";
// import Header from "../../components/base/Header";
// import TaskContext from "../../components/base/App/TaskContext";

// import Schedule from "./Schedule";
// import Maaltijd from "./Maaltijd";
// import useStyles from "./styles";

export default function MenuPage({ camp }: { camp: Camp }) {
  // const params = useParams();
  // const tasks = React.useContext(TaskContext);
  // const [selectedActivity, setSelectedActivity] = useState(null);

  // useEffect(() => {
  //   if (tasks) {
  //     if (params && params.id) {
  //       setSelectedActivity(tasks.find((t) => t.gid === params.id));
  //     } else {
  //       setSelectedActivity(null);
  //     }
  //   }
  // }, [params, tasks]);

  // const onSelectEvent = (event) => {};

  // if (selectedActivity) {
  //   return (
  //     <>
  //       <Header title={selectedActivity.name} defaultBack="/schema/keuken" />
  //       <Maaltijd meal={selectedActivity} />
  //     </>
  //   );
  // }

  // return (
  //   <>
  //     <Header title="Weekmenu" />
  //     <Schedule onSelectEvent={onSelectEvent} />
  //   </>
  // );

  // const classes = useStyles();

  const page = camp.pages.find((p) => p.defaultPage === "Menu");

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
