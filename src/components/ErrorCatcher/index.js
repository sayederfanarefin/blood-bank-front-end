import React from 'react';
import * as Sentry from '@sentry/browser';

export default class ErrorCatcher extends React.Component {
    state = {
        error: null
    }
    
    componentDidCatch(error, errorInfo) {
      this.setState({ error })
      
      console.log('ErrorCatcher componentDidCatch: ', {error, errorInfo})
      
      Sentry.withScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });
        Sentry.captureException(error);
      });
    }
    
    render() {
      const { children } = this.props;
      const { error } = this.state;
      
      return error ? <p>{error}</p> : children;
    }
}