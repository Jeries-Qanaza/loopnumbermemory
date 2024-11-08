import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Game.css';

const Game = () => {
  const [level, setLevel] = useState(1);
  const [rnd, setRnd] = useState(null);
  const [visible, setVisible] = useState(true);
  const [score, setScore] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!gameOver) {
      const numberLength = level;
      let number;

      // Generate a number with the correct length
      do {
        number = Math.floor(Math.random() * Math.pow(10, numberLength));
      } while (String(number).length < numberLength);

      setRnd(number);

      const timerDuration = level < 5 ? 1400 * level : 1000 * level;

      const timer = setTimeout(() => {
        setVisible(false);
        setShowInput(true);
      }, timerDuration);

      document.documentElement.style.setProperty('--loading-duration', `${timerDuration / 1000}s`);
      setAnimate(true);

      return () => clearTimeout(timer);
    }
  }, [level, gameOver]);

  const handleSubmit = useCallback(() => {
    const userInputElem = inputRef.current;
    const userInput = userInputElem.value.trim();

    if (userInput === '') {
      alert('Please enter a valid number');
      return;
    }

    const parsedUserInput = parseInt(userInput, 10);

    if (isNaN(parsedUserInput)) {
      alert('Please enter a valid number');
      return;
    }

    setUserAnswer(parsedUserInput);

    if (parsedUserInput === rnd) {
      setScore(score + 1);
      setLevel(level + 1);
      setVisible(true);
      setRnd(null);
      setShowInput(false);
      setAnimate(false);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setGameOver(true);
    }

    userInputElem.value = "";
  }, [rnd, score, level]);

  useEffect(() => {
    const userInputElem = inputRef.current;

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    };

    if (userInputElem) {
      userInputElem.addEventListener('keypress', handleKeyPress);
    }

    if (showInput && userInputElem) {
      userInputElem.focus();
    }

    return () => {
      if (userInputElem) {
        userInputElem.removeEventListener('keypress', handleKeyPress);
      }
    };
  }, [handleSubmit, showInput]);

  const tryAgain = () => {
    setLevel(1);
    setScore(0);
    setVisible(true);
    setShowInput(false);
    setAnimate(false);
    setGameOver(false);
    setUserAnswer(null);
  };

  const GameOver = () => {
    const correctDigits = String(rnd).split('');
    const userDigits = String(userAnswer);

    return (
      <div className="game-over">
        <h1>Game Over!</h1>
        <h4>{`Level: ${level}`}</h4>

        <div className="number-container">
          <h2>Correct Number:</h2>
          <div className="number-display">
            {rnd}
          </div>

          <h2>Your Answer:</h2>
          <div className="number-display">
            {userDigits.split('').map((digit, index) => (
              <span
                key={index}
                className="number-box"
                style={{ backgroundColor: index < correctDigits.length && digit === correctDigits[index] ? 'green' : 'red' }}
              >
                {digit}
              </span>
            ))}
          </div>
        </div>

        <button className="submit" onClick={tryAgain}>Try Again</button>
      </div>
    );
  };

  return (
    <section className="Game">
      {gameOver ? (
        <GameOver />
      ) : (
        <>
          <h1>Level {level}</h1>
          {visible && <h2 className='generated_random_number'>{rnd}</h2>}
          <div className={`colorLine ${animate ? 'animate' : ''}`}></div>
          {showInput && (
            <div>
              <input
                className="userInput"
                type="text"
                ref={inputRef}
                inputMode="numeric"
              />
              <button className="submit" onClick={handleSubmit}>Submit</button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Game;
