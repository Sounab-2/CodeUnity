import React from 'react';

const SubmitButton = ({text,bgcolor}) => {
  return (
    <button type='submit' className=' btn btn-primary w-full'>
      {text}
    </button>
  );
}

export default SubmitButton;
