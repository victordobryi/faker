import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { appSlice } from '../store/reducers/app';
import { useAppDispatch } from '../redux-hooks';
import { getRandomNumber } from '../utils/getRandomNumber';

const SeedCreator = () => {
  const [seedValue, setSeedValue] = useState(123);
  const { setSeed } = appSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSeed(seedValue));
  }, [seedValue]);

  return (
    <div className="d-inline-flex">
      <InputGroup>
        <Form.Control
          placeholder="Seed"
          aria-label="Seed"
          aria-describedby="basic-addon2"
          type="number"
          onChange={(e) => {
            setSeedValue(Number(e.target.value));
          }}
          value={seedValue}
        />
        <Button
          variant="secondary"
          id="button-addon2"
          onClick={() => {
            setSeedValue(getRandomNumber(0, 10000));
          }}
        >
          Random
        </Button>
      </InputGroup>
    </div>
  );
};

export default SeedCreator;
