import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormWrapper from 'components/FormWrapper';
import SimpleInput from 'components/SimpleInput';
import DropdownWithSearch from 'components/DropdownWithSearch';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import SuccessMessage from 'components/SuccessMessage';

import { isEmail } from 'services/String';
import { createClient } from 'services/APIs';

import { toggleLoader } from 'data/store/actions';

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

    const { formFields } = this.state;
    const { dispatch } = this.props;

    dispatch(toggleLoader(true));

    createClient(formFields)
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
          successMessage: 'Dodano osobę',
        });
      });
  }

  render() {
    const { formFields, errorMessage, successMessage } = this.state;
    const { storeModels } = this.props;

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
          <SimpleInput
            name="person_num"
            label="PESEL:"
            value={formFields.person_num}
            onChange={this.handleInputsChange}
          />
          <SimpleInput
            name="person_card"
            label="Numer dowodu:"
            value={formFields.person_card}
            onChange={this.handleInputsChange}
          />
          <SimpleInput
            name="phone_number"
            label="Numer telefonu:"
            value={formFields.phone_number}
            onChange={this.handleInputsChange}
          />
          <DropdownWithSearch
            label="Adres:"
            name="address_id"
            items={storeModels ? storeModels.adresses : []}
            onChange={this.handleInputsChange}
          />
          <SimpleInput
            name="email"
            label="Email:"
            value={formFields.email}
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

export default connect(mapStateToProps)(AddClient);
