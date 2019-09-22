import React from 'react';

type Props = {
  className?: string,
  name: string,
  placeholder?: string,
  children?: any,
  onChange: Function
}

const Textarea = (props: Props) => {
  return (
    <textarea
      className={`form-control ${props.className || ''}`}
      value={props.value}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
    >
      {props.children && props.children}
    </textarea>
  )
};

export default Textarea;
