import React, { useEffect, useState } from 'react';
import { Spin, Alert } from 'antd';
import api from '../../Utils/api';

const GameFilm = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/movies'); 
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return  <Spin size="large" />;
  if (error) return <Alert
                        message="Error API"
                        description={error.message}
                        type="error"
                        />;

  return (
    <div>
      <h1>Data from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default GameFilm;
