import React from 'react';

import './index.scss';

type Props = {
  children: Object,
  show: boolean,
  className?: string,
  status: string
}

const LoadingWrapper = (props: Props) => (
  <div className={`loading-wrapper${props.show ? ' show' : ''} ${props.className || ''}`}>
    {props.children}
    <div className="loading-wrapper__inner">
      <div className={`lds-roller loading-wrapper__icon spinner-${props.status || 'primary'}`}>
        <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
      </div>
    </div>
  </div>
);

export default LoadingWrapper;
