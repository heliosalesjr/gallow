import { useState, useEffect } from "react";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import Bricks from "./Bricks";
import { FaLaughWink } from "react-icons/fa"; // Importa o ícone de dica

const Game = () => {
  const words = ["REACT", "JAVASCRIPT", "PYTHON", "FRAMER", "TAILWIND"];
  const [currentWord, setCurrentWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameMessage, setGameMessage] = useState(null);
  const [hintPoints, setHintPoints] = useState(0); // Estado para pontos de dica
  const [score, setScore] = useState(0); // Estado para pontuação geral

  useEffect(() => {
    if (wrongAttempts >= 9) {
      setGameMessage({
        title: "Oh no!",
        message: `The word was: ${currentWord}`,
        action: "Restart",
      });
      setIsGameOver(true);
    }
  }, [wrongAttempts]);

  useEffect(() => {
    if (currentWord.split("").every((letter) => guessedLetters.includes(letter))) {
      setHintPoints((prev) => prev + 1); // Ganha 1 ponto de dica ao acertar
      setScore((prev) => prev + 1); // Ganha 1 ponto geral ao acertar
      setGameMessage({
        title: "Good job",
        message: "You got it right!",
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
      setGameMessage(null);
    } else if (gameMessage.action === "Next Word") {
      startNewGame();
      setGameMessage(null);
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      {/* Pontuação geral no canto superior direito */}
      <div className="text-xl font-bold bg-green-600 p-2 rounded-lg shadow-md mb-4">
        Score: {score}
      </div>

      {/* Palavras e jogo */}
      <TheWord currentWord={currentWord} guessedLetters={guessedLetters} />
      <Bricks wrongAttempts={wrongAttempts} />

      {/* Dicas */}
      <div className="flex items-center mt-4 gap-2">
        {[...Array(hintPoints)].map((_, index) => (
          <FaLaughWink key={index} size={32} color="orange" />
        ))}
      </div>

      {/* Teclado */}
      <Keyboard
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        setGuessedLetters={handleGuess}
        isGameOver={isGameOver}
      />

      {/* Botão de novo jogo */}
      <button
        onClick={startNewGame}
        className="bg-sky-400 p-4 my-4 rounded-xl text-slate-800 font-bold px-16"
      >
        New Game
      </button>

      {/* Mensagem de final de jogo */}
      {gameMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-stone-600 p-6 rounded-lg shadow-lg text-center">
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
