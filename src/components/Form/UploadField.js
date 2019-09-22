import React, { PureComponent } from 'react';

import ImageUpload from "components/CustomUpload/ImageUpload.jsx";

export default class ReduxUploadInput extends PureComponent {
  render() {
    const { input, meta: { touched, error }, inputProps } = this.props;
    return (
        <ImageUpload
          {...inputProps}
          onChange={input.onChange}
        />
    )
  }
}
