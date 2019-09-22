import React, { PureComponent } from 'react';

import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';


type Props = {
  className?: string,
  status?: string,
  inputType?: string,
  // Input
  inputClassName?: string,
  type: string,
  input: any,
  placeholder?: string,
  name: string,
  onChange: Function,
  // Label
  labelClassName?: string,
  labelText: string,
  // Helper
  helperClassName?: string,
  helperText?: string
};

export default class FormGroup extends PureComponent<Props> {
  render() {
    const {
      className, inputType, labelClassName, labelText, inputClassName,
      type, name, placeholder, onChange, helperClassName, helperText,
      input, meta: { touched, error }
    } = this.props;

    let inputComponent; // What input should be ( input || textarea )
    if (inputType && inputType === 'textarea') {
      inputComponent = (
        <Textarea
          className={`${touched && error ? 'is-invalid' : ''} ${inputClassName}`}
          name={input.name || name}
          value={input.value}
          placeholder={placeholder}
          onChange={input.onChange || onChange}
        />
      );
    } else if (inputType && inputType === 'select') {
      inputComponent = (
        <div
          className={(touched && error) ? 'form-control no-padding is-invalid' : ''}
        >
          <Select
            {...this.props}
          />
        </div>
      );
    } else {
      inputComponent = (
        <Input
          className={`${touched && error ? 'is-invalid' : ''} ${inputClassName}`}
          type={type}
          name={input.name || name}
          value={input.value}
          placeholder={placeholder}
          onChange={input.onChange || onChange}
        />
      );
    }

    return (
      <div className={`form-group ${className || ''}${touched && error ? ' has-error' : ''}`}>
        {labelText && <label className={`control-label${labelClassName ? ' ' + labelClassName : ''}`}>{labelText}</label>}
        {inputComponent}
        {helperText || (touched && error) ? <small id={labelText} className={`invalid-feedback animated fadeIn ${helperClassName ? ' ' + helperClassName : ''}`}>{helperText || (touched && error) || ''}</small> : null}
      </div>
    );
  }
}
