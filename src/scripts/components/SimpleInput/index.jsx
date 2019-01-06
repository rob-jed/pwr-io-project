import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

const defaultProps = {
  label: '',
  type: 'text',
  onChange: null,
  value: '',
};

class SimpleInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.value && !prevState.isActive && this.props.value) {
      this.setState({
        isActive: true,
      });
    }
  }

  handleChange(e) {
    const { name, onChange } = this.props;
    const { value } = e.target;

    onChange(name, value);
  }

  handleFocus() {
    const { isActive } = this.state;

    if (!isActive) {
      this.setState({
        isActive: true,
      });
    }
  }

  handleBlur() {
    const { isActive } = this.state;
    const { value } = this.props;

    if (isActive && !value) {
      this.setState({
        isActive: false,
      });
    }
  }

  getWrapperClassList() {
    const { isActive } = this.state;
    const classList = ['simple-input'];

    if (isActive) {
      classList.push('active');
    }

    return classList.join(' ');
  }

  render() {
    const { name, label, type, value } = this.props;

    return (
      <div className={this.getWrapperClassList()}>
        {
          label &&
          (
            <label htmlFor={name}>
              {label}
            </label>
          )
        }
        <div className="input-wrapper">
          <input
            name={name}
            type={type}
            value={value}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </div>
      </div>
    );
  }
}

SimpleInput.propTypes = propTypes;
SimpleInput.defaultProps = defaultProps;

export default SimpleInput;
