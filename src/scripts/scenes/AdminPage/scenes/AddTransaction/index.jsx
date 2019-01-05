import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormWrapper from 'components/FormWrapper';
import SimpleInput from 'components/SimpleInput';
import DropdownWithSearch from 'components/DropdownWithSearch';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import SuccessMessage from 'components/SuccessMessage';

import { isEmail } from 'services/String';
import { addTransaction } from 'services/APIs';

import { toggleLoader } from 'data/store/actions';

import './styles.scss';

const formFieldsShape = {
  employee_id: '',
  person_id: '',
  offer_id: '',
  transaction_type: '',
  transaction_date: '',
  amount: '',
  facture_number: '',
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

    addTransaction(formFields)
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
          successMessage: 'Dodano transakcję',
        });
      });
  }

  render() {
    const { formFields, errorMessage, successMessage } = this.state;
    const { storeModels } = this.props;

    return (
      <div className="admin-add-client-page">
        <FormWrapper heading="Uzupełnij formularz">
          <DropdownWithSearch
            label="Pracownik:"
            name="employee_id"
            items={storeModels ? storeModels.employees : []}
            onChange={this.handleInputsChange}
          />
          <DropdownWithSearch
            label="Osoba:"
            name="person_id"
            items={storeModels ? storeModels.persons : []}
            onChange={this.handleInputsChange}
          />
          <DropdownWithSearch
            label="Oferta:"
            name="offer_id"
            items={storeModels ? storeModels.offers : []}
            onChange={this.handleInputsChange}
          />

          <SimpleInput
            name="transaction_type"
            label="Typ transakcji:"
            value={formFields.transaction_type}
            onChange={this.handleInputsChange}
          />
          <SimpleInput
            name="transaction_date"
            label="Data transakcji (YYYY-MM-DD):"
            value={formFields.transaction_date}
            onChange={this.handleInputsChange}
          />
          <SimpleInput
            name="amount"
            label="Ilość:"
            value={formFields.amount}
            onChange={this.handleInputsChange}
          />
          <SimpleInput
            name="facture_number"
            label="Numer faktury:"
            value={formFields.facture_number}
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
