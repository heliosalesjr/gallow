import { useState } from "react";
import { BsBricks } from "react-icons/bs"; // Ícone da brick
import { GiFireAxe } from "react-icons/gi"; // Ícone do machado
import { motion } from "framer-motion";

const Bricks = () => {
  const [bricks, setBricks] = useState(Array(9).fill(true)); // Estado das bricks
  const [breaking, setBreaking] = useState(null); // Índice do machado visível

  // Função para quebrar a brick
  const breakBrick = (index) => {
    setBreaking(index); // Define o índice da brick sendo quebrada
    setTimeout(() => {
      setBricks((prev) => prev.map((brick, i) => (i === index ? false : brick)));
      setBreaking(null); // Reseta o machado após a animação
    }, 500); // Tempo para sincronizar com a animação
  };

  return (
    <div className="flex gap-2 justify-center items-center py-4">
      {bricks.map((isActive, index) => (
        <div key={index} className="relative">
          {/* Exibe o machado apenas se a brick está sendo quebrada */}
          {breaking === index && (
            <motion.div
              initial={{ opacity: 0, y: -50, rotate: -30 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="absolute -top-10 left-0"
            >
              <GiFireAxe size={40} color="white" />
            </motion.div>
          )}

          {/* Brick */}
          {isActive && (
            <motion.div
              key={index}
              onClick={() => breakBrick(index)} // Teste: clica para quebrar a brick
              initial={{ opacity: 1 }}
              animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BsBricks size={50} className="bg-slate-300" color="#505050"/>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Bricks;
