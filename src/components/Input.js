import React from "react";

export const Input = ({
  required,
  type,
  htmlFor,
  label,
  onChange,
  value,
  placeholder,
}) => (
  <div className="input-block">
    <label
      className={`label ${required === true ? "label-required" : ""}`}
      htmlFor={htmlFor}
    >
      {label}
    </label>
    <input
      type={type}
      className="text-input"
      required={required}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
    {/* validation text */}
    {/* <small
      class={`validation-message ${validationStatus ? "green-5" : "red-5"}`}
    >
      <i
        class={`uil ${validationStatus ? "uil-exclamation-circle" : "uil-check"}`}
      ></i>
      {validationText}
    </small> */}
  </div>
);
