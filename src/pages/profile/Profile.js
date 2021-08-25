import React from "react";
import { Grid } from "@material-ui/core";

// components
import Widget from "../../components/Widget/Widget";

function Profile() {

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={6} lg={5}>
        <Widget>
          Profile
        </Widget>
      </Grid>
    </Grid>
  );
}

// #######################################################################

export default Profile;
