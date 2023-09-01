import React, { useState } from 'react'

const useInputValidation = (validation) => {
  const [value, setValue] = useState('')
  const [isTouched, setIsTouched] = useState(false) 

  const onChange = event => {
    setValue(event.target.value);
    setIsTouched(true);
  }

  const onBlur = event => {
    setIsTouched(true);
  }

  const isError = validation(value, isTouched);

  const reset = () => {
    setValue('')
    setIsTouched(false)
  }

  return {
    value,
    onChange,
    onBlur,
    isError,
    reset,
  }
}

export default useInputValidation