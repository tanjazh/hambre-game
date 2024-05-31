import React from 'react'
import './CardComponent.css';
import styled from 'styled-components';
import { Card } from '../../business';
import { GameBoard } from '../Game/Game'
import { Color } from '../../business/card';
import { Flex } from '@chakra-ui/react';

interface CardComponentProps {
    card: Card;
};

const colorToRgb: Record<Color, string> = {
    [Color.Orange]: "rgb(226, 116, 74)",
    [Color.Blue]: "rgb(74, 116, 226)",
    [Color.Green]: "rgb(74, 226, 116)",
    [Color.Purple]: "rgb(150, 74, 226)"
};

const CardContainer = styled.div < { background: string } > `
    background-color: ${props => props.background};
    width: 150px;
    height: 200px;
    border: 5px solid white;
    border-radius: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    color: black;
    margin: 10px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;
export function CardComponent(props: CardComponentProps) {
    const colors: Color[] = props.card.getColors()
    const color = colors[0]
    console.log(color)
    const background = ""
    const points = props.card.getPoints()

    // const cardContainerProps = getCardContainerProps(props.card)
    // console.log(cardContainerProps)

    // const cardListSingleColor = () => {
    //     if (color === Color.Blue) {
    //         background = colorToRgb.blue
    //     }



    // const color = colors[0] 
    //make a function out of this parameter = color und daraus kommt ein string
    // if (color === Color.Green) {
    //     //background = "rgb code"
    // }



    return (
        <Flex>
            <CardContainer background={colorToRgb[color]}>
                <div className='points-upper-container'>{points}</div>
                <div>Colors: {colors} </div>
                <div className='points-low-container'>{points}</div>
            </CardContainer>
        </Flex>
    )
}

function getCardContainerProps(card: Card) {
    const colors = card.getColors()
    return {
        background: colors.map(color => color.toString()).reduce((acc, color) => `${acc}+${color}`)
    }
}
