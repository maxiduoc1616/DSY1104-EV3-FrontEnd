
import React, { useState, useEffect } from 'react';
import api from '../services/axios'; 

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    api.get('/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar los usuarios');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
