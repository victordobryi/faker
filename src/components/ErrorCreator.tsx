import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useAppDispatch } from '../redux-hooks';
import { appSlice } from '../store/reducers/app';

const ErrorCreator = () => {
  const [errorsValue, setErrorsValue] = useState(0);
  const { setError } = appSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setError(errorsValue));
  }, [errorsValue]);

  return (
    <div className="d-inline-flex">
      <InputGroup size="sm">
        <Form.Control
          className="rounded"
          placeholder="Errors count"
          aria-label="Errors count"
          type="number"
          value={errorsValue}
          onChange={(e) => setErrorsValue(Number(e.target.value))}
        />
        <Form.Range
          min="0"
          max="10"
          step="0.25"
          onChange={(e) => setErrorsValue(Number(e.target.value))}
          value={errorsValue}
        />
      </InputGroup>
    </div>
  );
};

export default ErrorCreator;
