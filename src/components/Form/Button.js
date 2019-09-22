import React from 'react';

type Props = {
  children?: any,
  className: string,
  onClick: Function,
  disabled: boolean,
  status?: string,
}

const Button = (props: Props) => (
  <button
    className={`btn btn-${props.status || 'default'}${props.className ? ' ' + props.className : ''}`}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.children && props.children}
  </button>
)

export default Button;
