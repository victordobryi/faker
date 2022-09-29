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
  const { region, seed, error } = useAppSelector((state) => state.app);

  const addUsers = async (users: IUser[], usersCount: number) => {
    faker.seed(seed);
    try {
      const newUsers = [];
      setIsLoading(true);
      faker.setLocale(region || 'ru');
      for (let i = 0; i < usersCount; i++) {
        newUsers.push({
          fullName: faker.name.fullName(),
          phone: faker.phone.number(),
          state: faker.address.state(),
          city: faker.address.city(),
          street: faker.address.street(),
          id: faker.datatype.uuid()
        });
        setUsers([...users, ...newUsers]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setUsers([]);
    addUsers([], 20);
  }, [region, seed]);

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
        onClick={() => addUsers(users, 10)}
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
