import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const SeedCreator = () => {
  const [errorsValue, setErrorsValue] = useState('0');
  return (
    <div className="d-inline-flex">
      <InputGroup>
        <Form.Control
          placeholder="Seed"
          aria-label="Seed"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          Random
        </Button>
      </InputGroup>
    </div>
  );
};

export default SeedCreator;
