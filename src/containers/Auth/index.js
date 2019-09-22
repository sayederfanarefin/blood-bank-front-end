// @flow
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import PagesHeader from "components/Header/PagesHeader.jsx";
import Footer from "components/Footer/Footer.jsx";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";

import bgImage from "assets/img/login-bg.jpg";

type Props = {
  classes: Object,
  pageTitle: string,
  withoutLinks: boolean,
  children: any
}

@withStyles(pagesStyle)
@withRouter
export default class AuthWrapper extends PureComponent<Props> {
  
  componentDidMount() {
    document.body.style.overflow = "unset";
  }

  render() {
    const { children, classes, withoutLinks, ...rest } = this.props;
    return (
      <div>
        <PagesHeader {...rest} withoutLinks={withoutLinks} />
        <div className={classes.wrapper} ref="wrapper">
          <div
            className={classes.fullPage}
            style={{ backgroundImage: "url(" + bgImage + ")" }}
          >
            {children}
            <Footer white />
          </div>
        </div>
      </div>
    )
  }
}
