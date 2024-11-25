import { useState, useEffect } from 'react';
import TheWord from './TheWord';
import AlphabetGrid from './Keyboard';

const Game = () => {
  // Lista de palavras
  const wordList = ['REACT', 'JAVASCRIPT', 'PYTHON', 'TAILWIND', 'HANGMAN', 'REDUX', 'VUEJS', 'NODEJS', 'ANGULAR', 'GITHUB', 'TYPESCRIPT'];

  // Estado da palavra atual e das letras adivinhadas
  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Seleciona uma palavra aleatória ao carregar o componente
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setCurrentWord(wordList[randomIndex]);
  }, []);

  return (
    <div className="p-8">
      <TheWord currentWord={currentWord} guessedLetters={guessedLetters} />
      <AlphabetGrid
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        setGuessedLetters={setGuessedLetters}
      />
    </div>
  );
};

export default Game;
