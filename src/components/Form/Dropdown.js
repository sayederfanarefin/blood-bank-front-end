import React, { PureComponent } from 'react';
import { Dropdown, MenuItem } from 'react-bootstrap';

type Props = {
  defaultValue?: Object,
  list: Array<Object>,
  buttonClass?: string,
  dropdownClass?: string,
  disabled?: boolean,
  onSelect?: Function
}

type State = {
  activeValue: Object
}

export default class DropdownComponent extends PureComponent<Props, State> {

  state = {
    activeValue: {}
  }

  /**
   * Add default value
   */
  componentWillMount() {
    this.setState({
      activeValue: this.props.defaultValue || this.props.list[0]
    })
  }

  /**
   * Handle on change of dropdown.
   * onSelect - send result to the parent (Optional)
   * @param  {Object} item New active item
   */
  onChange = (item: Object) => {

    this.setState({
      activeValue: item
    });

    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
  }

  render() {
    const { list, buttonClass, dropdownClass, disabled } = this.props;
    const { activeValue } = this.state;
    const isListCorrect = (list && list.length > 1);

    return (
      <Dropdown id={activeValue.label} className={dropdownClass}>
        <Dropdown.Toggle
          className={`btn dropdown-toggle${disabled ? ' disabled' : ''} ${buttonClass || ''}`}
        >
          {activeValue.icon && <i className={`flag-icon flag-icon-${activeValue.icon.toLowerCase()}`}></i>} <span className="d-none d-sm-inline-block"> {activeValue.label} </span>
          {isListCorrect && <i className="fa fa-fw fa-angle-down ml-1"></i>}
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu dropdown-menu-right p-0">
          {isListCorrect && <div className="p-2">
            {list.map((item, index) => item.label !== activeValue.label && <MenuItem key={index} onClick={() => this.onChange(item)}>
              <span className="dropdown-item">
                {item.icon && <i className={`flag-icon flag-icon-${item.icon.toLowerCase()}`}></i>} {item.label}
              </span>
            </MenuItem>)}
          </div>}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
