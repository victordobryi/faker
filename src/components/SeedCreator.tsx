import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { appSlice } from '../store/reducers/app';
import { useAppDispatch } from '../redux-hooks';

const SeedCreator = () => {
  const [seedValue, setSeedValue] = useState(0);
  const { setSeed } = appSlice.actions;
  const dispatch = useAppDispatch();
  return (
    <div className="d-inline-flex">
      <InputGroup>
        <Form.Control
          placeholder="Seed"
          aria-label="Seed"
          aria-describedby="basic-addon2"
          type="number"
          onChange={(e) => setSeedValue(Number(e.target.value))}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={() => dispatch(setSeed(seedValue))}
        >
          Random
        </Button>
      </InputGroup>
    </div>
  );
};

export default SeedCreator;
