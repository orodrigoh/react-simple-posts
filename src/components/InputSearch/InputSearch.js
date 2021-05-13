import React from 'react';
import './InputSearch.css';

const InputSearch = ({ onChange, value }) => {
  return (
    <input
      className='text-input'
      type='text'
      onChange={onChange}
      value={value}
    />
  );
};

export default InputSearch;
