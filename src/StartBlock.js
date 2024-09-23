import React from 'react';
import img123 from "./img123.png"
import "./StartBlock.css"

const StartScreen = ({ onStart }) => {
  return (
    <div className="startblock">
      <h1>Number Memory Test</h1>
      <img className='img123' src={img123} alt='img123' />
      <button onClick={onStart} type="button" className="btn btn-primary p-2">Start</button>

    </div>
  );
}

export default StartScreen;
