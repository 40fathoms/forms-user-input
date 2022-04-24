import React from 'react'

import useInput from '../hooks/useInput';


const BasicForm = (props) => {

  const {
    value: firstNameValue,
    hasError: firstNameHasError,
    valueIsValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    reset: resetFirstName
  } = useInput(value => value.trim() !== '')

  const {
    value: lastNameValue,
    hasError: lastNameHasError,
    valueIsValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: resetLastName
  } = useInput(value => value.trim() !== '')

  const {
    value: emailValue,
    hasError: emailHasError,
    valueIsValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmail
  } = useInput(value => value.includes("@"))


  // form validation
  let formIsValid = false

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true
  }


  const formSubmitHandler = (e) => {
    e.preventDefault()

    if (!formIsValid) {
      return
    }

    resetFirstName()
    resetLastName()
    resetEmail()
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>

        <div className={`form-control ${firstNameHasError && 'invalid'}`}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && <p className='error-text'>Please enter a first name.</p>}
        </div>

        <div className={`form-control ${lastNameHasError && 'invalid'}`}>
          <label htmlFor='name'>Last Name</label>
          <input
            type='name'
            id='name'
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && <p className='error-text'>Please enter a last name.</p>}
        </div>

      </div>

      <div className={`form-control ${emailHasError && 'invalid'}`}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
            type='email'
            id='name'
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && <p className='error-text'>Must enter a valid email.</p>}
      </div>

      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
