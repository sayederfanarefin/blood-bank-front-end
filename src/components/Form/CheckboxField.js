import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { change } from 'redux-form';

import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import withStyles from "@material-ui/core/styles/withStyles";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

@connect(
  null,
  dispatch => ({
    changeField: bindActionCreators(change, dispatch)
  })
)
@withStyles(regularFormsStyle)
export default class ReduxCheckInput extends PureComponent {
  render() {
    const { input, inputProps, classes } = this.props;
    return (
      <FormControlLabel
        control={
          <Checkbox
            onChange={input.onChange}
            checked={input.value}
            name={input.name}
            tabIndex={-1}
            checkedIcon={
              <Check className={classes.checkedIcon} />
            }
            icon={<Check className={classes.uncheckedIcon} />}
            classes={{
              checked: classes.checked,
              root: classes.checkRoot
            }}
          />
        }
        {...inputProps}
      />
    );
  }
}
