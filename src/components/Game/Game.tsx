import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import './Game.css';
import { CardComponent } from '../Card/CardComponent';

export const GameBoard: React.FC<{}> = () => {
    const dispatch = useAppDispatch()
    const game = useAppSelector(state => state.hambre.game)

    if (!game) {
        return <div>Loading game...</div>;
    }

    // const player0 = game.getPlayer(0)

    const nextCard = game.peekCard()

    return (
        <div>
            <CardComponent card={nextCard} />
        </div>
    )
}


//{nextCard.getPoints()} {nextCard.getColors()}