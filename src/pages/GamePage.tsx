import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { CardComponent } from '../components/CardComponent';
import { Game, Row } from '../business';
import { placeCardToRow, countPlayerPoints } from '../store/hambreSlice';
import styled from "styled-components";
import { RowComponent } from '../components/RowComponent';
import { Flex, Grid, GridItem, Box, Image, Text, VStack } from '@chakra-ui/react';
import { GameOver } from '../pages/GameOver';

interface GameBoardProps {
    game: Game;
    playerName: string | null;
};

const Background = styled.div`
    display: flex;
    background-image: url(${process.env.PUBLIC_URL}/Adobe_Background.png);
    background-size: cover;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100vh;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6); 
`;

const CenteredGridItem = styled(GridItem)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DeckContainer = styled.div`
  position: relative;
  width: 120px;
  height: 160px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StackEffect = styled.div<{ offsetX: number; offsetY: number }>`
  position: absolute;
  width: 100px;
  height: 125px;
  border: 1px solid white;
  border-radius: 10px;
  background-color: rgba(247, 168, 208, 0.8);
  z-index: 0;
  transform: translate(${props => props.offsetX}px, ${props => props.offsetY}px);
`;

const RowContainer = styled.div<{ position: 'second-player' | 'first-player' }>`
    display: flex;
    flex-direction: row; 
    align-items: center; 
    justify-content: center;
    width: 100%;
    height: 180px;
    position: relative;
`;

const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const PlayerInfo = ({ name, score }: { name: string | null; score: number }) => {
    return (
        <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="6"
            boxShadow="lg"
        >
            <Image />
            <VStack spacing={4} align="stretch" mt="4">
                <Text fontSize="2xl" fontWeight="bold">{name}</Text>
                <Text fontSize="md" color="gray.500">Score: {score} </Text>
            </VStack>
        </Box>
    );
};


export const GameBoard = ({ game, playerName }: GameBoardProps) => {
    const dispatch = useAppDispatch();

    const hambreState = useAppSelector((state) => state.hambre);

    const player1 = game.getPlayer(0);
    const activeRows1 = game.getActiveRowsOf(player1);

    const player2 = game.getPlayer(1);
    const activeRows2 = game.getActiveRowsOf(player2);

    const activePlayer = game.getActivePlayer();

    const handleRowClick = (row: Row) => () => {
        dispatch(placeCardToRow({ card: game.peekCard(), row }));
        dispatch(countPlayerPoints());
    };

    useEffect(() => {
        if (!game.isFinished() && activePlayer === player2) {
            const computerTurn = () => {
                const randomRowIndex = Math.floor(Math.random() * activeRows2.length);
                dispatch(placeCardToRow({ card: game.peekCard(), row: activeRows2[randomRowIndex] }));
            };
            setTimeout(() => {
                computerTurn();
            }, 500);

            const pointsPlayer2 = dispatch(countPlayerPoints());
            console.log(pointsPlayer2);
        };
    }, [player2, activePlayer, game]);

    const deckSize = game.getDeck().getCount();

    if (game.isFinished()) {
        return (
            <BoardContainer>
                <GameOver />
            </BoardContainer>
        );
    };

    return (
        <Background>
            <Overlay />
            <Grid
                templateAreas={`"secondPlayerRows"
                                "playGround"
                                "firstPlayerRows"`}
                gridTemplateRows={'1fr 1fr 1fr'}
                gridTemplateColumns={'1fr'}
                justifyContent="center"
                alignItems="center"
                position="relative">
                <CenteredGridItem area={'secondPlayerRows'}>
                    <RowContainer position='second-player'>
                        <Flex>
                            {activeRows2.map((row, index) => (
                                <React.Fragment key={index}>
                                    <RowComponent
                                        row={row}
                                        onClick={() => { }}
                                        addingPossible={false}
                                    />
                                    {(index === 0) && <PlayerInfo name="Player2" score={hambreState.player2Points} />}
                                </React.Fragment>
                            ))}
                        </Flex>
                    </RowContainer>
                </CenteredGridItem>
                <CenteredGridItem area={'playGround'}>
                    <DeckContainer>
                        {deckSize > 42 && (
                            <>
                                <StackEffect offsetX={0} offsetY={-14} />
                                <StackEffect offsetX={-10} offsetY={-7} />
                                <StackEffect offsetX={-20} offsetY={0} />
                            </>
                        )}
                        {deckSize <= 42 && deckSize > 20 && (
                            <>
                                <StackEffect offsetX={-10} offsetY={-7} />
                                <StackEffect offsetX={-20} offsetY={0} />
                            </>
                        )}
                        {deckSize <= 20 && (
                            <StackEffect offsetX={-20} offsetY={0} />
                        )}

                        <CardComponent card={game.peekCard()} zIndex={1} />
                    </DeckContainer>
                </CenteredGridItem>
                <CenteredGridItem area={'firstPlayerRows'}>
                    <RowContainer position='first-player'>
                        <Flex>
                            {activeRows1.map((row, index) => (
                                <React.Fragment key={index}>
                                    <RowComponent
                                        row={row}
                                        onClick={handleRowClick(row)}
                                        addingPossible={true}
                                    />
                                    {(index === 0) && <PlayerInfo name={playerName} score={hambreState.player1Points} />}
                                </React.Fragment>
                            ))}
                        </Flex>
                    </RowContainer>
                </CenteredGridItem>
            </Grid>
        </Background>
    );
};
