import React from 'react';

interface FormInputProps {
  label: string;
  placeholder: string;
  type?: string; // Type is optional and defaults to 'text'
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Specify the type for the onChange event
}

const FormInput: React.FC<FormInputProps> = ({ label, placeholder, type = 'text', onChange }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered"
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
