
const AlphabetGrid = () => {
  // Array de letras de A a Z
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  return (
    <>
        <div className="max-w-lg mx-auto flex flex-wrap justify-center gap-4 py-8">
        {letters.map((letter) => (
            <button
            key={letter}
            className="w-14 h-14 bg-yellow-400 text-black font-bold text-lg rounded-md shadow-md transition-transform transform hover:scale-110 hover:bg-yellow-500 focus:outline-none"
            >
            {letter}
            </button>
        ))}
        
        </div>
        <div className="flex items-center justify-center">
            <button className="bg-sky-400 p-4 my-4 rounded-xl text-slate-800 font-bold px-16">New Game</button>
        </div>
        
    </>
    
  );
};

export default AlphabetGrid;
