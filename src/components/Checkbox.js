import React from "react";

export const Checkbox = ({
  label,
  value,
  name,
  onChange,
  checked,
  onClick,
}) => {
  return (
    <label onClick={onClick} className="radio-checkbox-label" htmlFor={value}>
      <input
        type="checkbox"
        name={name}
        id={value}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {label}
    </label>
  );
};
