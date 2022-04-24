import React from 'react'

import useInput from '../hooks/useInput';

const SimpleInput = (props) => {

  const nameInputRef = React.useRef()


  //name validation
  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueIsValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetName
  } = useInput(value => value.trim() !== '')


  // email validation
  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueIsValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmail
  } = useInput(value => value.includes("@"))


  // form validation
  let formisValid = false

  if (nameIsValid && emailIsValid /*add other input items, if needed*/) {
    formisValid = true
  }


  const formSubmitHandler = (e) => {
    e.preventDefault()

    if (nameInputHasError || emailInputHasError) {
      return
    }

    resetName()
    resetEmail()

    /*
    //it's better to use Refs if you need to read the value once
    
    const enteredValue = nameInputRef.current.value
    console.log(enteredValue)
    nameInputRef.current.value = ""  => NOT IDEAL
    */
  }

  return (
    <form onSubmit={formSubmitHandler}>

      <div
        className={`form-control ${nameInputHasError && 'invalid'}`}
      >
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          ref={nameInputRef}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className='error-text'>Name must not be empty.</p>}
      </div>

      <div
        className={`form-control ${emailInputHasError && 'invalid'}`}
      >
        <label htmlFor='email'>Your Email</label>
        <input
          type='email'
          id='email'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p className='error-text'>Must enter a valid email.</p>}
      </div>

      <div className="form-actions">
        <button disabled={!formisValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
