import Bricks from "./components/Bricks";
import Header from "./components/Header"
import Status from "./components/Status";

import Game from "./components/Game";
import './index.css';

function App() {

  return (
    <>
      <Header />
      <Status />
      <Bricks />
      <Game />
    </>
  )
}

export default App
