import React from 'react';

interface StatusDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Specify the type for the onSelect event
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ label, options, onSelect }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <select className="select select-bordered" onChange={onSelect}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusDropdown;
