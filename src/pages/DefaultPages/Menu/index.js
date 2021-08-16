import React from "react";

import { CssBaseline } from "@material-ui/core";
import useCamp from "../../../hooks/useCamp";
import LoadingPage from "../../LoadingPage";
import DraaiboekAppBar from "../../../components/AppBar";
// import Header from "../../components/base/Header";
// import TaskContext from "../../components/base/App/TaskContext";

// import Schedule from "./Schedule";
// import Maaltijd from "./Maaltijd";
// import useStyles from "./styles";

export default function MenuPage() {
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
  const [camp, loading] = useCamp();

  // const classes = useStyles();

  if (loading || !camp) {
    return <LoadingPage />;
  }

  const page = camp.pages.find((p) => p.defaultPage === "Menu");

  return (
    <>
      <CssBaseline />
      <DraaiboekAppBar title={page.name} backPage="." />
    </>
  );
}
