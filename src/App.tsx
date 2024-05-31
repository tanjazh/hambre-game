import React, { useEffect, useState } from 'react';
import './App.css';
import { Flex, Spacer } from '@chakra-ui/react'
import { GameBoard } from './components/Game/Game'
import { useDispatch } from 'react-redux';
import { createGame } from './store/hambreSlice';
import { SetPlayersInfo } from './steps/SetPlayersInfo'
import { CardComponent } from './components/Card/CardComponent';

enum Step {
  SetPlayersInfo,
  Play,
  Score
}

function App() {
  const [step, setStep] = useState<Step>(Step.SetPlayersInfo)


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(createGame())
  }, [dispatch]);

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetPlayersInfo:
        return <SetPlayersInfo onClickNext={(name: string) => { setStep(Step.Play) }} />;
      case Step.Play:
        return <GameBoard />;
      case Step.Score:
        return <></>;
    }
  }
  return (
    <Flex>
      <GameBoard />
    </Flex>
  );
}

export default App;
