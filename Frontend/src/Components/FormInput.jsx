import React from 'react';

const FormInput = ({label,name,type,defaultValue}) => {
    return (
        <div className=' form-control'>
            <label className="form-control ">
                <div className="label">
                    <span className="label-text">{label}</span>

                </div>
                <input type={type} name={name} defaultValue={defaultValue} className="input input-bordered " />
               
            </label>
        </div>
    );
}

export default FormInput;
