import React, { PureComponent } from 'react';
import CustomInput from "components/CustomInput/CustomInput.jsx";

export default class ReduxInput extends PureComponent {
  render() {
    const { input, meta: { touched, error }, inputProps, labelText, id, formControlProps } = this.props;
    return (
        <CustomInput
            inputProps={{...input, ...inputProps}}
            success={inputProps && !inputProps.notValidate && !error && touched}
            error={inputProps && !inputProps.notValidate && !!error && touched}
            labelText={labelText}
            id={id}
            formControlProps={formControlProps}
            helpText={(inputProps && !inputProps.notValidate && touched) ? error : ''}
        />
    )
  }
}
