import React, { useState, useEffect } from 'react';
import { Input, Button, Row, Col, Divider, Select, Typography, message } from 'antd';
import Hangman from './Hangman';
import './HangmanGame.css';

const { Title } = Typography;
const { Option } = Select;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ '.split('');

const HangmanGame = ({ word, wordList }) => {
  const [errors, setErrors] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [clickedLetters, setClickedLetters] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (errors >= 10) {
      setGameOver(true);
      message.error(`You lost! The word was: ${word}`);
    }

    const uniqueLetters = [...new Set(word.toUpperCase().split(''))];
    const allLettersGuessed = uniqueLetters.every(letter => guessedLetters.includes(letter));
    
    if (allLettersGuessed) {
      setGameOver(true);
      message.success('You guessed the word!');
    }
  }, [errors, guessedLetters, word]);

  const handleLetterClick = (letter) => {
    if (gameOver) return;
    
    if (word.toUpperCase().includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    } else {
      setErrors(errors + 1);
    }
    setClickedLetters([...clickedLetters, letter]);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value.toUpperCase());
  };

  const handleWordGuess = () => {
    if (gameOver) return;

    if (inputValue === word.toUpperCase()) {
      setGuessedLetters([...new Set(word.toUpperCase().split(''))]); // Mark all letters as guessed
      setGameOver(true);
    } else {
      setErrors(errors + 1);
    }
    setInputValue('');
  };

  const handleSelectGuess = (selectedWord) => {
    if (gameOver) return;

    if (selectedWord.toLowerCase() === word.toLowerCase()) {
      setGuessedLetters([...new Set(word.toUpperCase().split(''))]); // Mark all letters as guessed
      setGameOver(true);
    } else {
      setErrors(errors + 1);
    }
  };

  const renderSquares = () => {
    return word.toUpperCase().split('').map((letter, index) => (
      <div key={index} className="square">
        {guessedLetters.includes(letter) ? letter : '_'}
      </div>
    ));
  };

  return (
    <div className="hangman-game">
      <Title level={2}>Hangman Game</Title>
      <Hangman errors={errors} />
      <Divider />
      <div className="squares-container">
        {renderSquares()}
      </div>
      <Divider />
      <Row gutter={[16, 16]}>
        {alphabet.map((letter) => (
          <Col key={letter}>
            <Button 
              onClick={() => handleLetterClick(letter)} 
              disabled={clickedLetters.includes(letter) || gameOver}
            >
              {letter}
            </Button>
          </Col>
        ))}
      </Row>
      <Divider />
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Guess the word"
        onPressEnter={handleWordGuess}
        disabled={gameOver}
      />
      <Button onClick={handleWordGuess} disabled={gameOver}>Submit</Button>
      <Divider />
      <Select
        placeholder="Select the word"
        onChange={handleSelectGuess}
        style={{ width: 200 }}
        disabled={gameOver}
      >
        {wordList.map((w, index) => (
          <Option key={index} value={w}>
            {w}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default HangmanGame;
