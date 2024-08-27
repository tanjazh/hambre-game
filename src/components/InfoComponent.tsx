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
    height: 200px;
    width: 300px;
    position: relative;
    margin-top: -50px;
`;

export function InfoComponent({ onContinue }: { onContinue: () => void }) {
    return (
        <StyledCard>
            <CardHeader>
                <HambreLogo src={`${process.env.PUBLIC_URL}/logo.png`} />
            </CardHeader>
            <CardBody>
                <CenteredContent>
                    <p>Mix over 30 ingredients to create 4-card combos in this fast-paced card game!</p>
                    <p>Draw and play cards to create combos on your refrigerator and table boards. Each completed combo scores points, with double points for combos of the same color. Keep crafting combos until the main deck runs out of cards!</p>
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
