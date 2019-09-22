import React, { PureComponent } from 'react';

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import withStyles from "@material-ui/core/styles/withStyles";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import "./index.scss";


@withStyles(registerPageStyle)
export default class ReduxSelect extends PureComponent {
  render() {
    const { input, inputProps, classes } = this.props;
    return (
      <FormControl fullWidth className={`${classes.selectFormControl} select-box`}>
        <InputLabel htmlFor={input.name} className={classes.selectLabel}>
          {inputProps.label}
        </InputLabel>
        <Select
          MenuProps={{ className: classes.selectMenu }}
          classes={{ select: classes.select }}
          {...inputProps}
          onChange={input.onChange}
          value={input.value}
        >

          {inputProps.options.map((option, index) => (
            <MenuItem classes={{ root: classes.selectMenuItem }} key={index} value={typeof option === "string" ? option : option.id}>
              {typeof option === "string" ? option : option.displayName}
            </MenuItem>
          ))}

        </Select>
      </FormControl>
    )
  }
}
