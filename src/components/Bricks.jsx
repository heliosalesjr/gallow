import { motion, AnimatePresence } from "framer-motion";
import { BsBricks } from "react-icons/bs";
import { GiFireAxe } from "react-icons/gi";

const Bricks = ({ wrongAttempts }) => {
  const bricks = Array(9).fill(true);

  return (
    <div className="flex gap-2 justify-center items-center py-4">
      {bricks.map((_, index) => (
        <div key={index} className="relative">
          {/* Exibe o machado apenas se a brick está sendo quebrada */}
          <AnimatePresence>
            {index === wrongAttempts && (
              <motion.div
                initial={{ opacity: 0, y: -50, rotate: -30 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute -top-10 left-0"
              >
                <GiFireAxe size={40} color="white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Brick */}
          {index >= wrongAttempts ? (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BsBricks size={50} className="bg-slate-300" color="#505050" />
            </motion.div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Bricks;

