
const AlphabetGrid = () => {
  // Array de letras de A a Z
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  return (
    <div className="max-w-lg mx-auto grid grid-cols-5 gap-4">
      {letters.map((letter) => (
        <button
          key={letter}
          className="w-16 h-16 bg-yellow-400 text-black font-bold text-lg rounded-md shadow-md transition-transform transform hover:scale-110 hover:bg-yellow-500 focus:outline-none"
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetGrid;
