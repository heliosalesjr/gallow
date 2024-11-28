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
  const [gameMessage, setGameMessage] = useState(null);


  useEffect(() => {
    if (wrongAttempts >= 9) {
      setGameMessage({
        title: "Game Over",
        message: `A palavra era: ${currentWord}`,
        action: "Restart",
      });
      setIsGameOver(true);
    }
  }, [wrongAttempts]);
  
  useEffect(() => {
    if (currentWord.split("").every((letter) => guessedLetters.includes(letter))) {
      setGameMessage({
        title: "Parabéns!",
        message: "Você acertou a palavra!",
        action: "Next Word",
      });
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

  const handleGameAction = () => {
  if (gameMessage.action === "Restart") {
    startNewGame();
  } else if (gameMessage.action === "Next Word") {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setWrongAttempts(0);
    setIsGameOver(false);
    setGameMessage(null);
  }
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

    {gameMessage && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">{gameMessage.title}</h2>
          <p className="text-lg mb-6">{gameMessage.message}</p>
          <button
            onClick={handleGameAction}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            {gameMessage.action}
          </button>
        </div>
      </div>
    )}
  </div>
);
};

export default Game;


