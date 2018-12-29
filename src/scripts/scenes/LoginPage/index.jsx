import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ErrorMessage from 'components/ErrorMessage';
import SimpleInput from 'components/SimpleInput';
import Button from 'components/Button';
import FormWrapper from './components/FormWrapper';

import { createLoggedInCookie } from 'services/User';
import { isEmail } from 'services/String';

import './styles.scss';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: null,
    };

    this.handleInputsChange = this.handleInputsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputsChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  validateFields() {
    const { username, password } = this.state;

    if (!username || !password) {
      this.setState({
        error: 'Wypełnij wszystkie pola',
      });

      return false;
    }

    if (!isEmail(username)) {
      this.setState({
        error: 'Podaj poprawny adres email',
      });

      return false;
    }

    return true;
  }

  handleSubmit() {
    const fieldValid = this.validateFields();

    if (!fieldValid) {
      return;
    }

    const { history } = this.props;

    createLoggedInCookie('token_aplikacji');

    history.push('/');
  }

  render() {
    const { username, password, error } = this.state;

    return (
      <div className="app-login-page">
        <FormWrapper>
          <SimpleInput
            name="username"
            label="Email:"
            value={username}
            onChange={this.handleInputsChange}
          />
          <SimpleInput
            name="password"
            type="password"
            label="Hasło:"
            value={password}
            onChange={this.handleInputsChange}
          />
          { error && <ErrorMessage message={error} /> }
          <Button
            text="Zaloguj się"
            onClick={this.handleSubmit}
          />
        </FormWrapper>
      </div>
    );
  }
}

export default withRouter(LoginPage);
