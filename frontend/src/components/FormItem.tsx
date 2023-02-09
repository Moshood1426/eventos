import React from "react";

interface FormItemProps {
  name: string;
  placeholder?: string;
  type: string;
  value: string;
  label?: boolean;
  labelText?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormItem: React.FC<FormItemProps> = ({
  label,
  labelText,
  name,
  placeholder,
  type,
  value,
  disabled,
  onChange,
}) => {
  return (
    <div className="form_row">
      {label && (
        <label htmlFor={name} className="form_label">
          {labelText ? labelText : name}
        </label>
      )}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className="form_input"
        placeholder={placeholder ? placeholder : name}
        disabled={disabled ? true : false}
      />
    </div>
  );
};

export default FormItem;
