import { useState } from 'react';

function TheWord() {
    const [currentWord, setCurrentWord] = useState('React');
    
    const letterElements = currentWord.split('').map((letter, index) => (
        <span key={index} className="text-4xl p-4 m-2 word">{letter.toUpperCase()}</span>
    ));

  return (
    <div className='cont-word'>
        {letterElements}
    </div>
  )
}

export default TheWord