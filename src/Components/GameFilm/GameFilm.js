import React, { useEffect, useState } from 'react';
import { Spin, Alert, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import api from '../../Utils/api';
import HangmanGame from './HangmanGame';

const { Title, Paragraph } = Typography;

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const handleReload = () => {
  window.location.reload();
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
    <div className = "gamefilm">
      <Title level={2}>Can you figure out the movie title?</Title>
      <Paragraph>{data.overview} <br/>
        Genres: {data.genero}</Paragraph>
      <HangmanGame word={data.original_title} wordList={wordList} image = {data.poster} />
      <Paragraph>
        This project is a web-based Hangman game where users guess movie titles. The frontend, built with React, fetches movie data from a FastAPI backend, which interacts with a MySQL database. Key components include a Base layout, GameFilm for fetching and displaying data, HangmanGame for managing game logic, and Hangman for visualizing progress. The backend provides endpoints to retrieve random movies and related titles, enabling an interactive user experience with dynamic visual feedback and reload functionality.<br/><Link to='/DevJourney/apifilm/description'>More</Link>
      </Paragraph>
      <Button onClick={handleReload}> New Film </Button>
    </div>
  );
};

export default GameFilm;
