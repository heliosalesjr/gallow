import { useState } from 'react';

function TheWord({ currentWord, guessedLetters }) {
    const letterElements = currentWord.split('').map((letter, index) => (
      <span
        key={index}
        className="text-4xl p-4 m-2 word"
      >
        {guessedLetters.includes(letter.toUpperCase()) ? letter.toUpperCase() : '_'}
      </span>
    ));
  
    return <div className="cont-word">{letterElements}</div>;
  }
  
  export default TheWord;
  