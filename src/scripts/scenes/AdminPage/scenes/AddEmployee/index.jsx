import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormWrapper from 'components/FormWrapper';
import SimpleInput from 'components/SimpleInput';
import DropdownWithSearch from 'components/DropdownWithSearch';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import SuccessMessage from 'components/SuccessMessage';

import { createEmployee } from 'services/APIs';

import { toggleLoader } from 'data/store/actions';

import { updateModels } from '../../services';

import './styles.scss';

const formFieldsShape = {
  person_id: '',
  employment_date: '',
  salary: '',
  password: '',
  password_confirmation: '',
  contract_type: '',
};

class AddEpmloyee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formFields: { ...formFieldsShape },
      errorMessage: '',
      successMessage: '',
    };

    this.handleInputsChange = this.handleInputsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputsChange(name, value) {
    const { formFields } = this.state;

    this.setState({
      formFields: {
        ...formFields,
        [name]: value,
      },
    });
  }

  validateFields() {
    const { formFields } = this.state;
    const { password, password_confirmation: passwordConfirmation } = formFields;
    let allFields = true;

    for (const key of Object.keys(formFields)) {
      if (!formFields[key]) {
        allFields = false;
        this.setState({
          errorMessage: 'Uzupełnij wszystkie pola',
          successMessage: '',
        });
        break;
      }
    }

    if (!allFields) {
      return false;
    }

    if (password !== passwordConfirmation) {
      this.setState({
        errorMessage: 'Hasła muszą być takie same',
        successMessage: '',
      });

      return false;
    }

    return true;
  }

  handleSubmit() {
    const isValid = this.validateFields();

    if (!isValid) {
      return;
    }

    const { formFields } = this.state;
    const { dispatch } = this.props;

    dispatch(toggleLoader(true));

    createEmployee(formFields)
      .then((response) => {
        dispatch(toggleLoader(false));

        if (!response || response && response.code !== 200) {
          this.setState({
            errorMessage: 'Coś poszło nie tak, spróbuj ponownie',
          });

          return;
        }

        this.setState({
          errorMessage: '',
          successMessage: 'Dodano pracownika',
        });

        updateModels();
      });
  }

  render() {
    const { formFields, errorMessage, successMessage } = this.state;
    const { storeModels } = this.props;

    return (
      <div className="admin-add-client-page">
        <FormWrapper heading="Uzupełnij formularz">
          <DropdownWithSearch
            label="Osoba:"
            name="person_id"
            items={storeModels ? storeModels.persons : []}
            onChange={this.handleInputsChange}
          />
          <SimpleInput
            name="employment_date"
            label="Data zatrudnienia (YYYY-MM-DD):"
            value={formFields.employment_date}
            onChange={this.handleInputsChange}
          />
          <SimpleInput
            name="salary"
            label="Zarobki:"
            value={formFields.salary}
            onChange={this.handleInputsChange}
          />
          <SimpleInput
            name="password"
            label="Hasło:"
            type="password"
            value={formFields.password}
            onChange={this.handleInputsChange}
          />
          <SimpleInput
            name="password_confirmation"
            label="Potwierdź hasło:"
            type="password"
            value={formFields.password_confirmation}
            onChange={this.handleInputsChange}
          />
          <SimpleInput
            name="contract_type"
            label="Rodzaj umowy:"
            value={formFields.contract_type}
            onChange={this.handleInputsChange}
          />

          { errorMessage && <ErrorMessage message={errorMessage} />}
          { successMessage && <SuccessMessage message={successMessage} />}

          <Button text="Dodaj" onClick={this.handleSubmit} />
        </FormWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  storeModels: state.storeModels,
});

export default connect(mapStateToProps)(AddEpmloyee);
