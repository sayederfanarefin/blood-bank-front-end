import React from 'react';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import ErrorCatcher from 'components/ErrorCatcher';

type Props = {
    classes: Object,
    option: string
}

type State = {
    arrowRef: React.Node
}

const styles = theme => ({
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  }
});

@withStyles(styles)
export default class VehicleOption extends React.Component<Props, State> {
  state = {
    arrowRef: null
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };

  render() {
    const { option } = this.props;

    return (
      <ErrorCatcher>
        <strong>{option}</strong>
      </ErrorCatcher>
    );
  }
};
