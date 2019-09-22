import React, { PureComponent } from 'react';

import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import withStyles from "@material-ui/core/styles/withStyles";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

@withStyles(regularFormsStyle)
export default class ReduxRadioInput extends PureComponent {
  render() {
    const { input, inputProps, classes } = this.props;
    return (
        <FormControlLabel
          control={
            <Radio
              checked={input.value === inputProps.value}
              onChange={input.onChange}
              value={inputProps.value}
              name={input.name}
              aria-label={inputProps.label}
              icon={<FiberManualRecord className={classes.radioUnchecked}/>}
              checkedIcon={<FiberManualRecord className={classes.radioChecked}/>}
              classes={{
                checked: classes.radio,
                root: classes.radioRoot
              }}
            />
          }
          classes={{
            label: classes.label
          }}
          label={inputProps.label}
        />
    )
  }
}
