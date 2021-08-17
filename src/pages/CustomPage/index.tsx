import React from "react";
import { useParams, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Editor } from "@tinymce/tinymce-react";

import AppBar from "../../components/AppBar";

import useStyles from "./styles";
import { Camp } from "../../hooks/useCamp";

type CustomPageParams = {
  campId: string;
  pageName: string;
};

export default function CustomPage({ camp }: { camp: Camp }) {
  const params = useParams<CustomPageParams>();

  const classes = useStyles();

  if (!params.pageName) return <Redirect to={`/camp/${params.campId}`} />;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar title={camp.name} backPage="./" />
      <main>
        <Container className={classes.container} maxWidth="md">
          <Editor
            initialValue="<p>This is the initial content of the editor.</p>"
            apiKey="59zjw96nsct9uyc9qmpvlx4ueu5nyt9swh82x8z1pffuixll"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "table | " +
                "removeformat | code help",
              content_style:
                "body { font-family:'Roboto', sans-serif; font-size:14px }",
              valid_children: "+body[style]",
            }}
          />
        </Container>
      </main>
    </React.Fragment>
  );
}
