import { useState, useEffect } from "react";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import Bricks from "./Bricks";

const Game = () => {
  const words = ["REACT", "JAVASCRIPT", "PYTHON", "FRAMER", "TAILWIND"];
  const [currentWord, setCurrentWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (wrongAttempts >= 9) {
      setIsGameOver(true);
      alert("Game Over");
    }
  }, [wrongAttempts]);

  useEffect(() => {
    if (currentWord.split("").every((letter) => guessedLetters.includes(letter))) {
      setIsGameOver(true);
    }
  }, [guessedLetters, currentWord]);

  const handleGuess = (letter) => {
    if (!currentWord.includes(letter)) {
      setWrongAttempts((prev) => Math.min(prev + 1, 9));
    }
    setGuessedLetters((prev) =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  };

  const startNewGame = () => {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setWrongAttempts(0);
    setIsGameOver(false);
  };

  return (
    <div className="flex flex-col items-center">
      <TheWord currentWord={currentWord} guessedLetters={guessedLetters} />
      <Bricks wrongAttempts={wrongAttempts} />
      <Keyboard
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        setGuessedLetters={handleGuess}
        isGameOver={isGameOver}
      />
      <button
        onClick={startNewGame}
        className="bg-sky-400 p-4 my-4 rounded-xl text-slate-800 font-bold px-16"
      >
        Novo Jogo
      </button>
    </div>
  );
};

export default Game;

