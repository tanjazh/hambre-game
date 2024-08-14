import './App.css';
import { Flex } from '@chakra-ui/react'
import { GameBoard } from './pages/GamePage'
import { WelcomePage } from './pages/WelcomePage';
import { useAppSelector } from './store/store';

function App() {
  const game = useAppSelector(state => state.hambre.game);
  const playerName = useAppSelector(state => state.hambre.playerName);

  return (
    <Flex>
      {!game && <WelcomePage />}
      {!!game && <GameBoard game={game} playerName={playerName} />}
    </Flex>
  );
}

export default App;
