import React, { forwardRef } from 'react';
import './Input.css';

type InputProps = {
  accept?: string;
  name?: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  className: string;
  required?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ required, accept, name, id, type, placeholder, value, onChange, onBlur, className }, ref) => {
    return (
      <div className="inputField">
        <input
          required={required}
          ref={ref}
          className={`input ${className}`}
          name={name}
          id={id}
          value={value}
          type={type}
          placeholder={placeholder}
          accept={accept}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
