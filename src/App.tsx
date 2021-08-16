import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import ActivityPage from "./pages/ActivityPage";

import Auth from "./pages/Auth";
import CreateEnvironment from "./pages/CreateEnvironment";
import CustomPage from "./pages/CustomPage";
import ContactInformationPage from "./pages/DefaultPages/ContactInformation";
import MaterialsPage from "./pages/DefaultPages/Materials";
import MenuPage from "./pages/DefaultPages/Menu";
import ParticipantsPage from "./pages/DefaultPages/Participants";
import SchedulePage from "./pages/DefaultPages/Schedule";
import Portal from "./pages/Portal";
import SelectEnvironment from "./pages/SelectEnvironment";
import SiteAdministration from "./pages/SiteAdministration";

const Routes = () => {
  const { pathname } = useLocation();
  const [calendarDate, setCalendarDate] = React.useState<Date | null>(null);

  const DraaiboekContext = React.createContext({});

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

      <DraaiboekContext.Provider value={{ calendarDate, setCalendarDate }}>
        <Switch>
          <ProtectedRoute exact path="/camp/:campId">
            <Portal />
          </ProtectedRoute>
          <ProtectedRoute exact path="/camp/:campId/activity/:activityId">
            <ActivityPage />
          </ProtectedRoute>
          <ProtectedRoute path="/camp/:campId/contactInformation">
            <ContactInformationPage />
          </ProtectedRoute>
          <ProtectedRoute path="/camp/:campId/materials">
            <MaterialsPage />
          </ProtectedRoute>
          <ProtectedRoute path="/camp/:campId/menu">
            <MenuPage />
          </ProtectedRoute>
          <ProtectedRoute path="/camp/:campId/participants">
            <ParticipantsPage />
          </ProtectedRoute>
          <ProtectedRoute path="/camp/:campId/schedule">
            <SchedulePage />
          </ProtectedRoute>
          <ProtectedRoute path="/camp/:campId/:pageName">
            <CustomPage />
          </ProtectedRoute>
        </Switch>
      </DraaiboekContext.Provider>
    </Switch>
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
