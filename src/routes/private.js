// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

type Props = {
  user?: Object,
  children: any,
  history: Object
}

@connect(
  state => ({
    user: state.user.data
  })
)
@withRouter
export default class PrivateRoute extends PureComponent<Props> {
  componentWillMount() {
    const { user } = this.props;
    const token = localStorage.getItem('auth_token');
    
    if (!user || !token) {
      this.props.history.push('/login');
    }
  }

  componentDidUpdate() {
    const { user } = this.props;
    const token = localStorage.getItem('auth_token');

    if (!user || !token) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { user, children, component: Component, ...rest } = this.props;

    return <Route {...rest} render={(props) => (
      (user && localStorage.getItem('auth_token'))
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  }
}