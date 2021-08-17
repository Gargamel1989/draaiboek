import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import useCamp from "./hooks/useCamp";
import ActivityPage from "./pages/ActivityPage";

import Auth from "./pages/Auth";
import CreateEnvironment from "./pages/CreateEnvironment";
import CustomPage from "./pages/CustomPage";
import ContactInformationPage from "./pages/DefaultPages/ContactInformation";
import MaterialsPage from "./pages/DefaultPages/Materials";
import MenuPage from "./pages/DefaultPages/Menu";
import ParticipantsPage from "./pages/DefaultPages/Participants";
import SchedulePage from "./pages/DefaultPages/Schedule";
import LoadingPage from "./pages/LoadingPage";
import NotFoundPage from "./pages/NotFoundPage";
import Portal from "./pages/Portal";
import SelectEnvironment from "./pages/SelectEnvironment";
import SettingsPage from "./pages/SettingsPage";
import SiteAdministration from "./pages/SiteAdministration";

const Routes = () => {
  const { pathname } = useLocation();

  return (
    <Switch>
      {/* Remove trailing slashes for more consistent redirecting */}
      <Redirect strict from="/:url*(/+)" to={pathname.slice(0, -1)} />

      <Route path="/login">
        <Auth />
      </Route>
      <ProtectedRoute path="/admin">
        <SiteAdministration />
      </ProtectedRoute>
      <ProtectedRoute path="/createEnvironment">
        <CreateEnvironment />
      </ProtectedRoute>
      <ProtectedRoute exact path="/">
        <SelectEnvironment />
      </ProtectedRoute>

      <Route path="/camp/:campId">
        <CampRoutes />
      </Route>
    </Switch>
  );
};

const CampRoutes = () => {
  const [camp, loading, error] = useCamp();
  const [calendarDate, setCalendarDate] = React.useState<Date | null>(null);

  const DraaiboekContext = React.createContext({});

  React.useEffect(() => {
    if (!camp && !loading) document.title = "Draaiboeker";
    else if (camp) document.title = camp.name;
  }, [camp, loading]);

  if (!camp && !loading && error && error.message === "Not Found") {
    return <NotFoundPage />;
  }

  if (loading || !camp) {
    return <LoadingPage />;
  }

  return (
    <DraaiboekContext.Provider value={{ calendarDate, setCalendarDate }}>
      <Switch>
        <ProtectedRoute exact path="/camp/:campId">
          <Portal camp={camp} />
        </ProtectedRoute>
        <ProtectedRoute exact path="/camp/:campId/activity/:activityId">
          <ActivityPage camp={camp} />
        </ProtectedRoute>
        <ProtectedRoute path="/camp/:campId/contactInformation">
          <ContactInformationPage camp={camp} />
        </ProtectedRoute>
        <ProtectedRoute path="/camp/:campId/materials">
          <MaterialsPage camp={camp} />
        </ProtectedRoute>
        <ProtectedRoute path="/camp/:campId/menu">
          <MenuPage camp={camp} />
        </ProtectedRoute>
        <ProtectedRoute path="/camp/:campId/participants">
          <ParticipantsPage camp={camp} />
        </ProtectedRoute>
        <ProtectedRoute path="/camp/:campId/schedule">
          <SchedulePage camp={camp} />
        </ProtectedRoute>
        <ProtectedRoute path="/camp/:campId/settings">
          <SettingsPage camp={camp} />
        </ProtectedRoute>
        <ProtectedRoute path="/camp/:campId/:pageName">
          <CustomPage camp={camp} />
        </ProtectedRoute>
      </Switch>
    </DraaiboekContext.Provider>
  );
};

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
