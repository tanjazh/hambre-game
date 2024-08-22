import { Button, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import styled from "styled-components";

const StyledCard = styled(Card)`
    width: 100%;
    height: 150vh;
    display: flex;
    position: relative;
    background: #f98dc9;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: rgba(249, 141, 201, 0.8);
    color: black;
    border-radius: 15px;
`;

const CenteredContent = styled.div`
    text-align: center;
    max-width: 600px;
`;

const HambreLogo = styled.img`
    height: 100px;
    width: 180px;
    position: relative;
    margin-top: -10px;
`;

export function InfoComponent({ onContinue }: { onContinue: () => void }) {
    return (
        <StyledCard>
            <CardHeader>
                <HambreLogo src={`${process.env.PUBLIC_URL}/logo.png`} />
            </CardHeader>
            <CardBody>
                <CenteredContent>
                    <p>Hambre is a fast-paced card game where you mix over 30 ingredients to create unique 4-card combos. Compete to score the most points before the deck runs out!</p>
                    <h4>How to Play</h4>
                    <ul>
                        <li>On your turn, draw a random ingredient card.</li>
                        <li>Store cards on your two boards (refrigerator and table), each holding up to 4 cards.</li>
                        <li>Create a combo when you collect 4 cards on a board, score the points, and remove the cards.</li>
                        <li>Keep making combos until ingredients run out.</li>
                        <li>Matching all 4 cards by color doubles your points.</li>
                    </ul>
                </CenteredContent>
            </CardBody>
            <CardFooter>
                <Button
                    onClick={onContinue}
                    fontFamily="Super Bubble"
                    backgroundColor="grey"
                    color="white">
                    Continue
                </Button>
            </CardFooter>
        </StyledCard>
    )
};
