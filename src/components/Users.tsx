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
  const { region } = useAppSelector((state) => state.region);

  const addUsers = async (users: IUser[], usersCount: number) => {
    try {
      const newUsers = [];
      setIsLoading(true);
      console.log(region);
      region === 'Russia'
        ? faker.setLocale('ru')
        : region === 'USA'
        ? faker.setLocale('en_US')
        : region === 'China'
        ? faker.setLocale('zh_CN')
        : faker.setLocale('ru');
      faker.setLocale('ru');
      const firstName = faker.name.firstName();
      console.log(firstName);
      for (let i = 0; i < usersCount; i++) {
        const fullName = faker.name.fullName();
        const phone = faker.phone.number();
        const state = faker.address.state();
        const city = faker.address.city();
        const street = faker.address.street();
        const id = faker.datatype.uuid();
        const user: IUser = {
          fullName,
          phone,
          state,
          city,
          street,
          id
        };
        newUsers.push(user);
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
  }, [region]);

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
