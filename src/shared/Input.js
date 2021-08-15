import React, { useState, useEffect } from 'react';

const FormInput = ({
  type = 'text',
  value = '',
  name,
  label,
  placeholder,
  onInput,
  onBlur,
  readOnly
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    setInputType(type);
  }, [type]);

  const handleInput = e => {
    e.persist();
    const { value } = e.target;
    setInputValue(value);
    onInput(value);
  };

  return (
    <div className="input__box">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        className={`input`}
        id={name}
        value={inputValue}
        type={inputType}
        onChange={handleInput}
        onBlur={onBlur}
        readOnly={readOnly}
        disabled={readOnly}
      />
    </div>
  );
};

export default FormInput;
