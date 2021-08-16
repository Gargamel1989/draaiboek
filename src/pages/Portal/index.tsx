import React from "react";
import { Link, useLocation } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import AppBar from "../../components/AppBar";

import useStyles from "./styles";
import useCamp from "../../hooks/useCamp";
import {
  CardActionArea,
  CardActions,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import LoadingPage from "../LoadingPage";

type IPage = {
  name: string;
  path: string;
  defaultPage: string | undefined;
  image: string;
  description: string;
  visible: boolean;
};

export default function Portal() {
  const [camp, loading] = useCamp();
  const location = useLocation();

  const classes = useStyles();

  React.useEffect(() => {
    if (!camp) return;

    document.title = camp.name;
  }, [camp]);

  if (loading || !camp) {
    return <LoadingPage />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar title={camp.name} />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
            >
              {camp.name}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Draaiboek {camp.dateFrom.getFullYear()}
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {camp.pages
              .filter((page: IPage) => page.visible)
              .map((page: IPage) => (
                <Grid key={page.path} item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardActionArea
                      className={classes.cardActionArea}
                      component={Link}
                      to={`${location.pathname}/${page.path}`}
                    >
                      <CardMedia
                        className={classes.cardMedia}
                        image={page.image}
                        title={page.name}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {page.name}
                        </Typography>
                        <Typography>{page.description}</Typography>
                      </CardContent>
                    </CardActionArea>
                    {camp.canEdit && (
                      <CardActions>
                        <Tooltip title="Edit this card">
                          <IconButton aria-label="Edit this card">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Hide this card">
                          <IconButton aria-label="Hide this card">
                            <VisibilityOffIcon />
                          </IconButton>
                        </Tooltip>
                      </CardActions>
                    )}
                  </Card>
                </Grid>
              ))}
            {camp.canEdit && (
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardActionArea
                    className={classes.cardActionArea}
                    component={Link}
                    to={`${location.pathname}/createCustomPage`}
                  >
                    <CardMedia
                      className={classes.cardMedia}
                      image={"/img/portal/add_new.webp"}
                      title="Create Custom Page"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Create Custom Page
                      </Typography>
                      <Typography>Add a new custom page</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
