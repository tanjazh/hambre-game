import { CardComponent } from './CardComponent';
import { Row } from '../business';
import styled from 'styled-components';
import { Flex } from '@chakra-ui/react';

const SingleRowContainer = styled.div`
    position: relative;
    background: rgb(248, 166, 208);
    width: 310px;
    display: flex;
    padding: 5px;
    border: 10px solid rgba(81, 167, 186);
    border-radius: 20px;
    flex-direction: row;
    direction: rtl;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${process.env.PUBLIC_URL}/logo.png);
        background-size: 200px;
        background-repeat: no-repeat;
        background-position: center;
        filter: grayscale(100%);
        opacity: 0.5; 
        z-index: 1;
    }
    & > * {
        position: relative;
        z-index: 2; 
    }
`;

const AddCard = styled.div`
    position: relative;
    width: 100px;
    height: 125px;
    display: flex;
    margin-right: 40px;
    justify-content: center;
    align-items: center;
    border: 2px solid white;
    border-radius: 8px;
    font-family: comic sans ms;
    font-size: 60px;
    color: white;
`;

const NoCard = styled.div`
    position: flex;
    width: 100px;
    height: 125px;
    display: flex;
    margin-left: -65px;
    justify-content: center;
    align-items: center;
`;

interface RowComponentProps {
    row: Row;
    onClick: () => void;
    addingPossible: boolean;
};

export function RowComponent(props: RowComponentProps) {

    const rowCards = props.row.getCards();

    return (
        <Flex>
            <SingleRowContainer onClick={props.onClick}>
                {rowCards.map((card, index) =>
                    <CardComponent key={index} card={card} zIndex={index + 1} />
                )}
                {rowCards.length < 1 && <NoCard />}
                {rowCards.length < 2 && <NoCard />}
                {rowCards.length < 3 && <NoCard />}
                {rowCards.length < 4 && <NoCard />}
                {props.addingPossible ? <AddCard>+</AddCard> : <></>}
            </SingleRowContainer>
        </Flex>
    );
};