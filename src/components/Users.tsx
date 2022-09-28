import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { IUser } from '../models/User';
import { useAppSelector } from '../redux-hooks';

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const { region } = useAppSelector((state) => state.region);

  const fetchData = async (users: IUser[], page: number, results: number) => {
    try {
      setIsLoading(true);
      const contry =
        region === 'Ukraine'
          ? 'ua'
          : region === 'USA'
          ? 'us'
          : region === 'France'
          ? 'FR'
          : 'ua';
      const response = await fetch(
        `https://randomuser.me/api/?results=${results}&nat=${contry}&${page}`
      );

      await response.json().then((data) => {
        setUsers([...users, ...data.results]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
    fetchData(users, page, 10);
  };

  const changeDataByRegion = async () => {
    try {
      await fetchData([], 1, 20);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPage(1);
    setUsers([]);
    changeDataByRegion();
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
          {users.map(({ id, location, name, phone }, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{id.value || 'no id'}</td>
              <td>{`${name.first} ${name.last}`}</td>
              <td>{`${location.state}, ${location.city}, ${location.street.name}, ${location.street.number}`}</td>
              <td>{phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button style={{ fontSize: '14px' }} variant="dark" onClick={nextPage}>
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
