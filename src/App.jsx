import Bricks from "./components/Bricks";
import Header from "./components/Header"
import Status from "./components/Status";
import TheWord from "./components/TheWord";
import Keyboard from "./components/Keyboard";
import './index.css';

function App() {

  return (
    <>
      <Header />
      <Status />
      <Bricks />
      <TheWord />
      <Keyboard />
    </>
  )
}

export default App
