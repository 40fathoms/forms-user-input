import React from 'react'


const initialInputState = {
    value: '',
    isTouched: false
};

const InputStateReducer = (state, action) => {
    if(action.type === 'INPUT') {
        return {value: action.value, isTouched: state.isTouched}
    }
    if(action.type === 'BLUR') {
        return {value: state.value, isTouched: true}
    }
    if(action.type === 'RESET') {
        return {value: '', isTouched: false}
    }
}


const useInput = (validateValue) => {

    const [inputState, dispatchInput] = React.useReducer(InputStateReducer, initialInputState)

    const valueIsValid = validateValue(inputState.value)
    const hasError = !valueIsValid && inputState.isTouched

    const valueChangeHandler = (e) => {
        dispatchInput({type:'INPUT', value: e.target.value})
    }

    const valueBlurHandler = (e) => {
        dispatchInput({type:'BLUR'})
    }

    const reset = () => {
        dispatchInput({type:'RESET'})
    }

    return {
        value: inputState.value,
        hasError,
        valueIsValid,
        valueChangeHandler,
        valueBlurHandler,
        reset
    }

}

export default useInput