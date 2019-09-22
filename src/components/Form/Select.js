import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';

export default (props) => {
  const { options } = props;
  let value;

  if (props.isMulti) {
    value = props.input.value.map(val =>
      props.options.find(
        option => option[props.labelKey || props.valueKey] ?
          option[props.labelKey || props.valueKey].toString() === val.toString()
           : false
         )
     )

    if (!value || !value.length) {
      value = props.input.value;
    }
  }
  else {

    value = options.find(
      option => option[props.labelKey || props.valueKey] ?
        option[props.labelKey || props.valueKey].toString() === props.input.value.toString()
         : false
       );

    if (!value) {
      value = props.input.value;
    }
  }

  // console.log('value: ', value);

  return props.creatable ? <CreatableSelect
    {...props}
    value={value}
    onChange={(value) => {
      let localValue = value;

      if (props.valueKey) {

        if (props.isMulti) {
          localValue = value.map((val) => {
            if (typeof val !== 'string') {
              return val[props.labelKey || props.valueKey];
            }

            return val;
          })
        }
        else {
          localValue = typeof value !== 'string' ? value[props.labelKey || props.valueKey] : value;
        }
      }

      if (props.onSelectChange) {
        props.onSelectChange(value);
      }
      return props.input.onChange(localValue);
    }}
    onBlur={() => props.input.onBlur(props.input.value)}
    options={options}
  /> : <Select
    {...props}
    value={value}
    onChange={(value) => {
      let localValue = value;

      if (props.valueKey) {

        if (props.isMulti) {
          localValue = value.map((val) => {
            if (typeof val !== 'string') {
              return val[props.valueKey];
            }

            return val;
          })
        }
        else {
          localValue = typeof value !== 'string' ? value[props.valueKey] : value;
        }
      }
      if (props.onSelectChange) {
        props.onSelectChange(value);
      }

      return props.input.onChange(localValue);
    }}
    onBlur={() => props.input.onBlur(props.input.value)}
    options={options}
  />
};
