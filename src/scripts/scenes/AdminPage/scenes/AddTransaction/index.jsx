import React, { Component } from 'react';

import FormWrapper from 'components/FormWrapper';
import SimpleInput from 'components/SimpleInput';
import DropdownWithSearch from 'components/DropdownWithSearch';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import SuccessMessage from 'components/SuccessMessage';

import { isEmail } from 'services/String';

import './styles.scss';

const formFieldsShape = {
  name: '',
  surname: '',
  person_num: '',
  person_card: '',
  phone_number: '',
  address_id: '',
  email: '',
};

const dropdownItems = [
  {
    text: 'Marian',
    value: 1,
  },
  {
    text: 'Bogdan',
    value: 2,
  },
];

class AddClient extends Component {
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
    const { email } = formFields;
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

    if (!isEmail(email)) {
      this.setState({
        errorMessage: 'Podaj poprawny adres email',
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

    // TODO: API CALL
    this.setState({
      formFields: { ...formFieldsShape },
      errorMessage: '',
      successMessage: 'Dodano klienta',
    });
  }

  render() {
    const { formFields, errorMessage, successMessage } = this.state;

    return (
      <div className="admin-add-client-page">
        <FormWrapper heading="Uzupełnij formularz">
          <SimpleInput
            name="name"
            label="Imię:"
            value={formFields.name}
            onChange={this.handleInputsChange}
          />
          <SimpleInput
            name="surname"
            label="Nazwisko:"
            value={formFields.surname}
            onChange={this.handleInputsChange}
          />
          <DropdownWithSearch
            label="Pracownik:"
            name="employee_id"
            items={dropdownItems}
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

export default AddClient;
