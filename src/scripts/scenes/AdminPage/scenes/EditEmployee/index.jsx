import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import FormWrapper from 'components/FormWrapper';
import SimpleInput from 'components/SimpleInput';
import DropdownWithSearch from 'components/DropdownWithSearch';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import SuccessMessage from 'components/SuccessMessage';

import { getEmployee, updateEmployee } from 'services/APIs';
import { isEmail } from 'services/String';

import { toggleLoader } from 'data/store/actions';

import { updateModels } from '../../services';

import './styles.scss';

const formFieldsShape = {
  name: '',
  surname: '',
  person_num: '',
  person_card: '',
  phone_number: '',
  address_id: '',
  email: '',
  salary: '',
  password: '',
  password_confirmation: '',
  contract_type: '',
};

class EditEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formFields: { ...formFieldsShape },
      activeAddress: null,
      errorMessage: '',
      successMessage: '',
    };

    this.handleInputsChange = this.handleInputsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { storeModels, location: { userId }, dispatch } = this.props;

    if (!userId) {
      return;
    }

    dispatch(toggleLoader(true));

    getEmployee(userId)
      .then((response) => {
        dispatch(toggleLoader(false));

        if (!response) {
          return;
        }

        const activeAddress = storeModels.addresses.find(address => address.value === response.address_id);

        this.setState({
          formFields: {
            ...formFieldsShape,
            ...response,
          },
          activeAddress: activeAddress.text,
        });
      });
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
    const { email, password, password_confirmation: passwordConfirmation } = formFields;
    const fieldsToSkip = ['password', 'password_confirmation'];
    let allFields = true;

    for (const key of Object.keys(formFields)) {
      if (fieldsToSkip.includes(key)) {
        continue;
      }

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
    const { location: { userId }, dispatch } = this.props;

    dispatch(toggleLoader(true));

    updateEmployee({
      employee_id: userId,
      ...formFields,
    })
      .then((response) => {
        dispatch(toggleLoader(false));

        if (!response || response && response.code !== 200) { //eslint-disable-line
          this.setState({
            errorMessage: 'Coś poszło nie tak, spróbuj ponownie',
          });

          return;
        }

        this.setState({
          errorMessage: '',
          successMessage: 'Zapisano zmiany',
        });

        updateModels();
      });
  }

  render() {
    const { formFields, errorMessage, successMessage, activeAddress } = this.state;
    const { storeModels, location: { userId } } = this.props;

    if (!userId) {
      return <Redirect to="/admin/manage-users" />;
    }

    return (
      <div className="admin-edit-employee-page">
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
            activeItem={activeAddress}
            label="Adres:"
            name="address_id"
            items={storeModels ? storeModels.addresses : []}
            onChange={this.handleInputsChange}
          />
          <SimpleInput
            name="email"
            label="Email:"
            value={formFields.email}
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

          <Button text="Zapisz" onClick={this.handleSubmit} />
        </FormWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  storeModels: state.storeModels,
});

export default connect(mapStateToProps)(EditEmployee);
