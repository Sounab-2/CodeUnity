import React from 'react';

const SubmitButton = ({ text, disabled }) => {
  return (
    <button type='submit' className='btn btn-primary w-full' disabled={disabled}>
      {text}
    </button>
  );
}


export default SubmitButton;
