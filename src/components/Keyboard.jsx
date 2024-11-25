import PropTypes from 'prop-types';

const AlphabetGrid = ({ currentWord, guessedLetters, setGuessedLetters }) => {
    const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  
    const handleLetterClick = (letter) => {
      setGuessedLetters((prev) =>
        prev.includes(letter) ? prev : [...prev, letter]
      );
    };
  
    return (
      <>
        <div className="max-w-lg mx-auto flex flex-wrap justify-center gap-4 py-8">
          {letters.map((letter) => {
            const isCorrect = currentWord.includes(letter);
            const isGuessed = guessedLetters.includes(letter);
  
            return (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                className={`w-14 h-14 font-bold text-lg rounded-md shadow-md transition-transform transform hover:scale-110 focus:outline-none
                ${isGuessed ? (isCorrect ? 'bg-blue-400' : 'bg-red-400') : 'bg-yellow-400 hover:bg-yellow-500'}
                `}
              >
                {letter}
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-sky-400 p-4 my-4 rounded-xl text-slate-800 font-bold px-16"
            onClick={() => window.location.reload()} // Reinicia o jogo ao recarregar
          >
            New Game
          </button>
        </div>
      </>
    );
  };
  
  export default AlphabetGrid;
  