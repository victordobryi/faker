import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { IUser } from '../models/User';
import { useAppSelector } from '../redux-hooks';
import { faker } from '@faker-js/faker';
import { createError } from '../utils/createError';

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { region, seed, error } = useAppSelector((state) => state.app);

  useEffect(() => {
    setUsers([]);
    addUsers(20);
    window.addEventListener('scroll', scrollHandler);
    return function () {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [region, seed, error]);

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
    const isIntegerNum = Number.isInteger(error);
    const remainNum = isIntegerNum ? 0 : String(error).split('.')[1];
    const finalErrorsCount =
      remainNum > Math.random() ? Math.trunc(error) + 1 : Math.trunc(error) + 0;

    faker.seed(seed);

    try {
      setIsLoading(true);
      faker.setLocale(region || 'ru');
      for (let i = 0; i < usersCount; i++) {
        const newUser: IUser = {
          fullName: faker.name.fullName(),
          phone: faker.phone.number(),
          state: faker.address.state(),
          city: faker.address.city(),
          street: faker.address.street(),
          id: faker.datatype.uuid()
        };
        for (let i = 0; i < finalErrorsCount; i++) {
          for (const key in newUser) {
            newUser[key] = createError(newUser[key]);
          }
        }
        setUsers((users) => [...users, newUser]);
      }
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    } finally {
      setIsLoading(false);
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
              <td className="text-truncate">{index + 1}</td>
              <td
                className=" col-3 text-truncate"
                style={{ maxWidth: '150px' }}
              >
                {id || 'no id'}
              </td>
              <td
                className="col-2 text-truncate"
                style={{ maxWidth: '150px' }}
              >{`${fullName}`}</td>
              <td
                className="col-6 text-truncate"
                style={{ maxWidth: '150px' }}
              >{`${state}, ${city}, ${street}`}</td>
              <td className="col-1 text-truncate" style={{ maxWidth: '150px' }}>
                {phone}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  ) : (
    <Spinner variant="light" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Users;
