import React from 'react';

const FormInput = ({label,name,type,placeholder,value,onChange}) => {
    return (
        <div className=' form-control'>
            <label className="form-control ">
                <div className="label">
                    <span className="label-text">{label}</span>

                </div>
                <input type={type} name={name}  placeholder={placeholder} value={value} onChange={onChange} className="input input-bordered " />
               
            </label>
        </div>
    );
}

export default FormInput;
