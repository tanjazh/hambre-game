import styled from 'styled-components';
import { Card } from '../business';
import { Color } from '../business/card';
import { Flex } from '@chakra-ui/react';

interface CardComponentProps {
    card: Card;
    zIndex: number;
};

const colorToRgb: Record<Color, string> = {
    [Color.Orange]: "rgb(252, 128, 52)",
    [Color.Blue]: "rgb(34, 74, 213)",
    [Color.Green]: "rgb(41, 242, 125)",
    [Color.Purple]: "rgb(186, 55, 210)"
};

const CardContainer = styled.div < { zIndex: number } >`
    width: 100px;
    height: 125px;
    border: 5px solid white;
    border-radius: 10px;
    position: relative;
    overflow: visible;
    boarder: 2px;
    z-index: ${props => props.zIndex};
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    margin-left: -65px;
    transition: transform 0.3s ease, z-index 0s 0.3s;
    cursor: pointer;
    &:hover {
        transform: translate(10px);
        z-index: 10;
    }
`;

const Background = styled.div<{ background: string, clipPath: string }>`
    background-color: ${props => props.background};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
    clip-path: ${props => props.clipPath};
`;

const CardContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    font-size: 1em;
    z-index: 1;
    color: black;
    padding: 10px;
    height: 100%;
    box-sizing: border-box;
`;

const PointsContainer = styled.div<{ position: 'upper' | 'lower' }>`
    font-family: comic sans ms;
    font-size: large;
    color: white;
    -webkit-text-stroke-width: 0.3px;
    -webkit-text-stroke-color: black;
    margin: 2px;
    position: absolute;
    ${props => props.position === 'upper' ? `
        top: 0;
        left: 10px;
    ` : `
        bottom: 0;
        right: 10px;
    `}
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImageBackgroundContainer = styled.img`
    max-width: 80%;
    max-height: 80%;
    position: absolute;
    z-index: 5;
`;

const ImageForeground = styled.img`
    max-width: 80%;
    max-height: 80%;
    position: relative;
    z-index: 6;
`;

const getClipPath = (index: number, total: number): string =>
    total === 1 ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        : `polygon(0 ${index * (100 / total)}%, 100% ${index * (100 / total)}%, 100% ${(index + 1) * (100 / total)}%, 0 ${(index + 1) * (100 / total)}%)
`;


// const getClipPath = (index: number, total: number): string => {
//     if (total === 1) return 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
//     if (total === 2) return index === 0
//         ? 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'
//         : 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)';
//     if (total === 3) return [
//         'polygon(0 0, 100% 0, 100% 33.33%, 0 33.33%)',
//         'polygon(0 33.33%, 100% 33.33%, 100% 66.66%, 0 66.66%)',
//         'polygon(0 66.66%, 100% 66.66%, 100% 100%, 0 100%)'
//     ][index];
//     if (total === 4) return [
//         'polygon(0 0, 100% 0, 100% 25%, 0 25%)',
//         'polygon(0 25%, 100% 25%, 100% 50%, 0 50%)',
//         'polygon(0 50%, 100% 50%, 100% 75%, 0 75%)',
//         'polygon(0 75%, 100% 75%, 100% 100%, 0 100%)'
//     ][index];
//     return 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
// };

export function CardComponent({ card, zIndex }: CardComponentProps) {
    const colors: Color[] = card.getColors();
    const points = card.getPoints();

    return (
        <Flex>
            <CardContainer zIndex={zIndex} >
                {colors.map((color, index) => (
                    <Background
                        key={index}
                        background={colorToRgb[color]}
                        clipPath={getClipPath(index, colors.length)}
                    />
                ))}
                <CardContent>
                    <PointsContainer position='upper'>{points}</PointsContainer>
                    <ImageContainer>
                        <ImageBackgroundContainer src={`${process.env.PUBLIC_URL}/NewSparkle.png`} />
                        <ImageForeground src={`${process.env.PUBLIC_URL}/foodIcons/${card.getImage()}.png`} />
                    </ImageContainer>
                    <PointsContainer position='lower'>{points}</PointsContainer>
                </CardContent>
            </CardContainer>
        </Flex>
    );
};