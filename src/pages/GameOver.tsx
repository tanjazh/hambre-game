import { useAppSelector } from '../store/store';
import styled from "styled-components";
import { Button, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { useDispatch } from "react-redux";
import { createGame } from "../store/hambreSlice";

const Background = styled.div`
    display: flex;
    position: relative;
    background-image: url(${process.env.PUBLIC_URL}/dale_background.webp);
    background-size: cover;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    flex-direction: column;
`;

const StyledCard = styled(Card)`
    width: 300px;
    height: 300px;
    display: flex;
    position: relative;
    background: #f98dc9;
    text-align: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: rgba(249, 141, 201, 0.8);
    color: black;
    border-radius: 15px;
`;

export function GameOver() {

    const player1Points = useAppSelector(state => state.hambre.player1Points);
    const player2Points = useAppSelector(state => state.hambre.player2Points);

    function winnerHambre() {
        if (player1Points > player2Points) {
            return <p>YOU WON</p>;
        } else if (player1Points < player2Points) {
            return <p>YOU LOST</p>;
        } else {
            return <p>It's a tie!</p>;
        }
    };

    const dispatch = useDispatch();

    function onClick() {
        dispatch(createGame())
    };

    return (
        <Background>
            <Card>
                <StyledCard>
                    <CardHeader>
                        <h1>GAME OVER</h1>
                        <p>{winnerHambre()}</p>
                    </CardHeader>
                    <CardBody>
                        Player1 Points: {player1Points} <br />
                        Player2 Points: {player2Points}
                    </CardBody>
                    <CardFooter>
                        <Button
                            onClick={onClick}
                            fontFamily="Super Bubble"
                            backgroundColor="grey"
                            color="white">
                            Start new game
                        </Button>
                    </CardFooter>
                </StyledCard>
            </Card>
        </Background>
    );
};
