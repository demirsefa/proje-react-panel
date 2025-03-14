import { Screen } from '../types/Screen';
import { FieldErrors, useForm } from 'react-hook-form';
import { StoreData } from '../index';
import { useNavigate } from 'react-router-dom';
import { CrudApi } from '../api/crudApi';
import React, { useEffect } from 'react';

export function Form({ data, screen }: { data?: any; screen: Screen }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: StoreData.screens[screen.controller].resolver,
    defaultValues: data,
  });
  const navigate = useNavigate();
  const fields = StoreData.screens[screen.controller].fields;
  useEffect(() => {
    reset(data);
  }, [data, reset]);
  return (
    <div className="form-wrapper">
      <form
        onSubmit={handleSubmit((dataForm) => {
          if (data) {
            CrudApi.edit(screen.controller, dataForm).then(() => {
              navigate('/' + screen.controller, {
                replace: true,
              });
            });
          } else {
            CrudApi.create(screen.controller, dataForm).then(() => {
              navigate('/' + screen.controller, {
                replace: true,
              });
            });
          }
        })}
      >
        {fields.map((field) => (
          <div className="form-field" key={field}>
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              {...register(field)}
              placeholder={`Enter ${field}`}
              id={field}
            />
            {errors[field] && (
              <span className="error-message">
                {/*@ts-ignore*/}
                {(errors[field] as FieldErrors)?.message}
              </span>
            )}
          </div>
        ))}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}
