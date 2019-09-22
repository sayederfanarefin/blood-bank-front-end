import React from 'react';

type Props = {
  className?: string,
  type: string,
  name: string,
  placeholder?: string,
  value?: string,
  checked?: boolean,
  input?: Object,
  onChange?: Function,
  onBlur?: Function,
  onDragStart?: Function,
  onDrop?: Function,
  onFocus?: Function,
}

const Input = (props: Props) => {
  const checked = props.input ? props.input.checked : props.checked;
  const value = props.input ? props.input.value : props.value;
  const onChange = props.input ? props.input.onChange : props.onChange;
  const onBlur = props.input ? props.input.onBlur : props.onBlur;
  const onDragStart = props.input ? props.input.onDragStart : props.onDragStart;
  const onDrop = props.input ? props.input.onDrop : props.onDrop;
  const onFocus = props.input ? props.input.onFocus : props.onFocus;

  return (
    <input
      className={`form-control${props.className ? ' ' + props.className : ''}`}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder || ''}
      value={value}
      checked={checked}
      onChange={onChange}
      onBlur={onBlur}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onFocus={onFocus}
    />
  )
}

export default Input;
