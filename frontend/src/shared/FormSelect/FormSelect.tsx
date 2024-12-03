import React from 'react';
import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';
import './FormSelect.scss';

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
  multiple?: boolean;
  defaultValue?: string;
}

export const FormSelect = ({
  defaultValue = '',
  multiple = false,
  register,
  options,
  onChange,
  value
}: FormSelectProps): JSX.Element => {
  return (
    <select
      multiple={multiple}
      {...register}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      className='select'
    >
      <option disabled value=''>
        {defaultValue}
      </option>
      {options.map((elem) => (
        <option value={elem.value} key={elem.id}>
          {elem.name}
        </option>
      ))}
    </select>
  );
};
