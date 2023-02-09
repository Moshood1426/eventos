import React from "react";

interface FormSelectItemProps {
  options: string[];
  name: string;
  labelText?: string;
  dontLabel?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const FormSelectItem: React.FC<FormSelectItemProps> = ({
  name,
  labelText,
  onChange,
  options,
  value,
  dontLabel,
  disabled,
}) => {
  return (
    <div className="form_row">
      {!dontLabel && (
        <label htmlFor={name} className="form_label">
          {labelText ? labelText : name}
        </label>
      )}

      <select
        name={name}
        id={name}
        className="form_input"
        onChange={onChange}
        value={value}
        disabled={disabled}
      >
        {options.map((item, index) => {
          return (
            <option key={index} value={item} className="form_select_option">
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelectItem;
