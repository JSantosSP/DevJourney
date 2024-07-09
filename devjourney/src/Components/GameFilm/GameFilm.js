import React, { useEffect, useState } from 'react';
import { Spin, Alert } from 'antd';
import api from '../../Utils/api';
import HangmanGame from './HangmanGame';

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const GameFilm = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await api.get('/movies'); 
        setData(response1.data);
        const postData = {
          movie: response1.data.original_title
        };
        const response2 = await api.post('/moviesList', postData)
        
        const combinedList = [response1.data.original_title, ...response2.data];

        setWordList(shuffle(combinedList));
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
      <HangmanGame word={data.original_title} wordList={wordList}/>
    </div>
  );
};

export default GameFilm;
