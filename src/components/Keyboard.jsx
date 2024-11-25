const Keyboard = ({ currentWord, guessedLetters, setGuessedLetters, isGameOver }) => {
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  const handleClick = (letter) => {
    if (!isGameOver && !guessedLetters.includes(letter)) {
      setGuessedLetters(letter);
    }
  };

  return (
    <div className="max-w-lg mx-auto flex flex-wrap justify-center gap-4 py-8">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => handleClick(letter)}
          className={`w-14 h-14 text-black font-bold text-lg rounded-md shadow-md transition-transform transform hover:scale-110 focus:outline-none ${
            guessedLetters.includes(letter)
              ? currentWord.includes(letter)
                ? "bg-blue-500"
                : "bg-red-500"
              : "bg-yellow-400 hover:bg-yellow-500"
          }`}
          disabled={isGameOver || guessedLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;

