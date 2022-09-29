import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { IUser } from '../models/User';
import { useAppSelector } from '../redux-hooks';
import { faker } from '@faker-js/faker';

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { region, seed, error } = useAppSelector((state) => state.app);

  useEffect(() => {
    setUsers([]);
    addUsers(20);
  }, [region, seed]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return function () {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      addUsers(10);
    }
  };

  const addUsers = async (usersCount: number) => {
    faker.seed(seed);
    try {
      setIsLoading(true);
      faker.setLocale(region || 'ru');
      for (let i = 0; i < usersCount; i++) {
        const newUser = {
          fullName: faker.name.fullName(),
          phone: faker.phone.number(),
          state: faker.address.state(),
          city: faker.address.city(),
          street: faker.address.street(),
          id: faker.datatype.uuid()
        };
        setUsers((users) => [...users, newUser]);
      }
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  return !isLoading ? (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>Name</th>
            <th>Adress</th>
            <th>Tel</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ street, phone, state, fullName, id, city }, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{id || 'no id'}</td>
              <td>{`${fullName}`}</td>
              <td>{`${state}, ${city}, ${street}`}</td>
              <td>{phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        style={{ fontSize: '14px' }}
        variant="dark"
        onClick={() => addUsers(10)}
      >
        Load more
      </Button>
    </>
  ) : (
    <Spinner variant="light" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Users;
