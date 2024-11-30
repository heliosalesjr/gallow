import { useState, useEffect } from "react";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import Bricks from "./Bricks";
import wordsData from "../words.json"; // Importando o JSON
import { FaLaughWink } from "react-icons/fa";

const Game = () => {
  const [currentWordData, setCurrentWordData] = useState(
    wordsData[Math.floor(Math.random() * wordsData.length)]
  );
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameMessage, setGameMessage] = useState(null);
  const [hintPoints, setHintPoints] = useState([]);
  const [score, setScore] = useState(0); // Estado para pontuação geral
  const [usedHints, setUsedHints] = useState(0); // Estado para acompanhar as dicas usadas

  useEffect(() => {
    if (wrongAttempts >= 9) {
      setGameMessage({
        title: "Oh no!",
        message: `The word was: ${currentWordData.word}`,
        action: "Restart",
      });
      setIsGameOver(true);
    }
  }, [wrongAttempts]);

  useEffect(() => {
    if (
      currentWordData.word
        .split("")
        .every((letter) => guessedLetters.includes(letter))
    ) {
      setGameMessage({
        title: "Good job",
        message: "You got it right!",
        action: "Next Word",
      });
      setIsGameOver(true);
      // Adiciona apenas uma nova dica
      setHintPoints((prev) => [...prev, { used: false }]);
      setScore((prev) => prev + 1); // Incrementa a pontuação geral
      setUsedHints(0); // Reseta as dicas usadas para a nova palavra
    }
  }, [guessedLetters, currentWordData]);

  const handleGuess = (letter) => {
    if (!currentWordData.word.includes(letter)) {
      setWrongAttempts((prev) => Math.min(prev + 1, 9));
    }
    setGuessedLetters((prev) =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  };

  const startNewGame = () => {
    const newWordData = wordsData[Math.floor(Math.random() * wordsData.length)];
    setCurrentWordData(newWordData);
    setGuessedLetters([]);
    setWrongAttempts(0);
    setIsGameOver(false);
    setUsedHints(0); // Reseta as dicas usadas
  };

  const handleGameAction = () => {
    if (gameMessage.action === "Restart" || gameMessage.action === "Next Word") {
      startNewGame();
    }
    setGameMessage(null); // Fecha o modal para qualquer ação
  
  };

  const handleHintClick = (index) => {
    if (hintPoints[index].used) return; // Ignora cliques em dicas já usadas
  
    const availableTip = currentWordData.tips.find((tip, i) => !hintPoints.some((h) => h.used && h.tipIndex === i));
    
    if (availableTip) {
      setGameMessage({
        title: "Tip",
        message: availableTip,
        action: "Close",
      });
      setHintPoints((prev) =>
        prev.map((hint, i) =>
          i === index ? { ...hint, used: true, tipIndex: currentWordData.tips.indexOf(availableTip) } : hint
        )
      );
    } else {
      setGameMessage({
        title: "No more tips available",
        message: "You have used all tips for this word!",
        action: "Close",
      });
    }
  
  
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold bg-green-600 p-2 rounded-lg shadow-md mb-4">
        Score: {score}
      </div>

      <TheWord
        currentWord={currentWordData.word}
        guessedLetters={guessedLetters}
      />
      <div className="flex items-center mt-4 gap-2">
      {hintPoints.map((hint, index) => (
        <FaLaughWink
          key={index}
          size={32}
          color={hint.used ? "gray" : "orange"}
          className="cursor-pointer"
          onClick={() => handleHintClick(index)}
        />
        ))}
      </div>
      <Bricks wrongAttempts={wrongAttempts} />
      <Keyboard
        currentWord={currentWordData.word}
        guessedLetters={guessedLetters}
        setGuessedLetters={handleGuess}
        isGameOver={isGameOver}
      />
      <button
        onClick={startNewGame}
        className="bg-sky-400 p-4 my-4 rounded-xl text-slate-800 font-bold px-16"
      >
        New Game
      </button>

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
