import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const ErrorCreator = () => {
  const [errorsValue, setErrorsValue] = useState('0');
  return (
    <div className="d-inline-flex">
      <InputGroup size="sm">
        <Form.Control
          className="rounded"
          placeholder="Errors count"
          aria-label="Errors count"
          value={errorsValue}
          onChange={(e) => setErrorsValue(e.target.value)}
        />
        <Form.Range
          min="0"
          max="10"
          step="0.25"
          onChange={(e) => setErrorsValue(e.target.value)}
          value={errorsValue}
        />
      </InputGroup>
    </div>
  );
};

export default ErrorCreator;
