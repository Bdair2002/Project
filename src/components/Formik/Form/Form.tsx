import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useRef } from 'react';
import Input from '../Input/Input';
import './Form.css';
import Button from '../../Button/Button';
type FormProps = {
  initialValues: Record<string, string>;
  validationSchema?: Yup.ObjectSchema<Record<string, any>>;
  showIcon?: boolean;
  onSubmit: (values: Record<string, string>) => void;
  fields: {
    name: string;
    label: string;
    type: string;
    accept?: string;
    placeholder?: string;
    required?: boolean;
  }[];
};

const CustomForm = ({ showIcon, initialValues, validationSchema, onSubmit, fields }: FormProps) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched, handleChange, handleBlur, values, isValid, dirty }) => (
        <Form>
          {fields.map((field, index) => (
            <div key={field.name} className="form-group">
              <label htmlFor={field.name}>{field.label}</label>{' '}
              {showIcon && touched?.[field.name] && !errors?.[field.name] && (
                <span className="tick-mark" role="img" aria-label="valid">
                  ✔️
                </span>
              )}
              <Input
                ref={index === 0 ? firstInputRef : undefined}
                name={field.name}
                id={field.name}
                accept={field.accept}
                className={field.name}
                type={field.type || 'text'}
                value={values[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={field.placeholder || ''}
                required={field.required}
              />
              {showIcon && errors[field.name] && touched[field.name] && (
                <div className="error">{errors[field.name]}</div>
              )}
            </div>
          ))}
          <Button disabled={!dirty || !isValid} className="login-btn" size="medium" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CustomForm;
