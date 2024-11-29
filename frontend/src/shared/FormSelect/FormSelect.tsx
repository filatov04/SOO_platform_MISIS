import React from 'react';
import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';

interface optionProps {
  id: number;
  value: string;
  name: string;
}

interface FormSelectProps {
  register: UseFormRegisterReturn;
  options: optionProps[];
  onChange: (value: string) => void;
  value: string;
}

export const FormSelect = ({ register, options, onChange, value }: FormSelectProps): JSX.Element => {
  return (
    <select {...register} value={value} onChange={(e) => onChange(e.currentTarget.value)}>
      <option value=''></option>
      {options.map((elem) => (
        <option value={elem.value} key={elem.id}>
          {elem.name}
        </option>
      ))}
    </select>
  );
};
