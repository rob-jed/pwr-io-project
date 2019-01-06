import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ErrorMessage from 'components/ErrorMessage';
import SimpleInput from 'components/SimpleInput';
import Button from 'components/Button';
import FormWrapper from './components/FormWrapper';

import { toggleLoader } from 'data/store/actions';
import { handleLogin } from 'services/APIs';
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

  handleSubmit(e) {
    e.preventDefault();

    const fieldValid = this.validateFields();

    if (!fieldValid) {
      return;
    }

    const { username, password } = this.state;
    const { dispatch } = this.props;

    dispatch(toggleLoader(true));

    handleLogin(username, password).then((response) => {
      dispatch(toggleLoader(false));

      if (!response) {
        this.setState({
          error: 'Coś poszło nie tak. Spróbuj ponownie',
        });

        return;
      }

      if (response.error) {
        this.setState({
          error: response.error,
        });

        return;
      }

      const { access_token: token } = response;

      if (token) {
        const { history } = this.props;

        createLoggedInCookie(token);

        history.push('/');
      }
    });
  }

  render() {
    const { username, password, error } = this.state;

    return (
      <div className="app-login-page">
        <FormWrapper>
          <form onSubmit={this.handleSubmit}>
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
          </form>
        </FormWrapper>
      </div>
    );
  }
}

export default connect(withRouter)(LoginPage);
