import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import StartBlock from './StartBlock';
import Game from './Game'; // Ensure this is imported

function App() {
  const [started, setStarted] = useState(false);

  // Function to start the game
  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div className="App">
      <Header />
      {started ? <Game /> : <StartBlock onStart={handleStart} />}
      
    </div>
  );
}

export default App;
