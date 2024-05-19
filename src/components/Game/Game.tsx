import React, { useState, useEffect } from 'react'
import { Game, GameFactory, RealDeckFactory } from '../../business'


export const GameBoard: React.FC<{}> = () => {
    const [game, setGame] = useState<Game>();

    useEffect(() => {
        const deckFactory = new RealDeckFactory();
        const gameFactory = new GameFactory(deckFactory, 2);
        const newGame = gameFactory.createGame();
        setGame(newGame);
    }, []);

    if (!game) {
        return <div>Loading game...</div>;
    }

    return (
        <div>

        </div>
    )
}
