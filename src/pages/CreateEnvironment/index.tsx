import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

import BasicInformationForm from "./BasicInformationForm";
import ContentForm from "./ContentForm";
import ConfigurationForm from "./ConfigurationForm";
import useStyles from "./styles";

import DraaiboekAppBar from "../../components/AppBar";
import Loader from "../../components/Loader";
import firebase from "../../firebase";
import useInput from "../../hooks/useInput";
import { Redirect } from "react-router-dom";
import useUser from "../../hooks/useUser";

const steps = ["Basic Information", "Default Content", "Configuration"];

export default function CreateEnvironment() {
  const [user] = useUser();

  const [activeStep, setActiveStep] = React.useState(0);

  const nameInput = useInput<string>("");
  const dateFromInput = useInput<Date>(new Date());
  const dateUntilInput = useInput<Date>(new Date());

  const schedulePageInput = useInput<boolean>(true);
  const materialsPageInput = useInput<boolean>(true);
  const participantsPageInput = useInput<boolean>(true);
  const contactInformationPageInput = useInput<boolean>(true);
  const menuPageInput = useInput<boolean>(true);

  const [loading, setLoading] = React.useState(false);
  const [newCampId, setNewCampId] = React.useState<string | null>(null);

  const classes = useStyles();

  const handleNext = async () => {
    if (activeStep + 1 >= steps.length) {
      setLoading(true);

      const result = await firebase.db.collection("camps").add({
        name: nameInput.value,
        dateFrom: dateFromInput.value,
        dateUntil: dateUntilInput.value,
        editors: [user?.email],
        users: [],
        pages: [
          {
            name: "Schedule",
            path: "schedule",
            defaultPage: "Schedule",
            image: "/img/portal/schedule/3573382.jpg",
            description:
              "Een overzicht van alle activiteiten die doorheen de week georganiseerd worden.",
            visible: schedulePageInput.value,
          },
          {
            name: "Materials",
            path: "materials",
            defaultPage: "Materials",
            image: "/img/portal/materials/16562.jpg",
            description:
              "Een lijst van benodigde materialen, geordend per activiteit en per dag",
            visible: materialsPageInput.value,
          },
          {
            name: "Contact Information",
            path: "contactInformation",
            defaultPage: "ContactInformation",
            image: "/img/portal/contact/2480553.jpg",
            description:
              "Belangrijke contactgegevens voor en tijdens het kamp.",
            visible: contactInformationPageInput.value,
          },
          {
            name: "Participants",
            path: "participants",
            defaultPage: "Participants",
            image: "/img/portal/youths/5852.jpg",
            description:
              "Een alfabetische lijst van de aanwezige jongeren met foto's.",
            visible: participantsPageInput.value,
          },
          {
            name: "Menu",
            path: "menu",
            defaultPage: "Menu",
            image: "/img/portal/menu.jpg",
            description:
              "Een overzicht van het eten dat doorheen het kamp geserveerd zal worden.",
            visible: menuPageInput.value,
          },
        ],
        activities: [],
        contacts: [],
        menu: [],
        participants: [],
      });

      setNewCampId(result.id);
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  if (newCampId) {
    return <Redirect to={`/camp/${newCampId}`} />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <DraaiboekAppBar />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {loading ? (
              <Loader />
            ) : (
              <React.Fragment>
                {activeStep === 0 && (
                  <BasicInformationForm
                    nameInput={nameInput}
                    dateFromInput={dateFromInput}
                    dateUntilInput={dateUntilInput}
                  />
                )}
                {activeStep === 1 && (
                  <ContentForm
                    schedulePageInput={schedulePageInput}
                    materialsPageInput={materialsPageInput}
                    participantsPageInput={participantsPageInput}
                    contactInformationPageInput={contactInformationPageInput}
                    menuPageInput={menuPageInput}
                  />
                )}
                {activeStep === 2 && <ConfigurationForm />}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
