import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
// import '../../assets/css/lib/toastr/toastr.min.css';

type Props = {
  closeToast: string,
  message: string,
  status: string,
  t: Function
}

const Toastr = (props: Props) => (
  <div className={`alert alert-${props.status} alert-dismissable mb-0`} role="alert">
      <button type="button" className="close" onClick={props.closeToast}>
          <span>×</span>
      </button>
      <h3 className="alert-heading font-size-h4 my-2">{props.t('toastr.errorMessage')}</h3>
      <p className="mb-0">{props.t(props.message)}</p>
  </div>
);

export default Toastr;
