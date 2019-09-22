// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { updateDocTitle } from "helpers/htmlHelper";

// @material-ui/core components
import Button from "components/CustomButtons/Button.jsx";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Warning from "@material-ui/icons/Warning";
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import withStyles from "@material-ui/core/styles/withStyles";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import ErrorCatcher from 'components/ErrorCatcher';

type Props = {
  classes: Object,
  history: Object
}

@withStyles(registerPageStyle)
@withRouter
export default class NotFound extends Component<Props> {

  componentWillMount() {
    // Update page title
    updateDocTitle('404 not found');
  }

  render() {
    const { classes, history } = this.props;

    return (
      <ErrorCatcher>
        <GridContainer justify="center" style={{ textAlign: "center" }}>
          <GridItem xs={12} sm={6} md={6} style={{margin: "30px 0 30px 0"}}>
            <h2><Warning color="error" fontSize="large" style={{ marginBottom: "-5px" }} />This page isn't available!</h2>
            <p>The link you followed may be broken, or the page may have been removed.</p>
            <div>
              <Button color="primary" onClick={() => history.goBack()}>
                <KeyboardArrowLeft className={classes.icons} /> Go back
              </Button>
            </div>
          </GridItem>
        </GridContainer>
      </ErrorCatcher>
    );
  }
}