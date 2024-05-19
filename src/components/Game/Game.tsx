import React, { useState, useEffect } from 'react'
import { Game, GameFactory, RealDeckFactory } from '../../business'
import { useSelector, useDispatch } from 'react-redux'
import { createGame, selectGame } from '../../store/hambreSlice'


export const GameBoard: React.FC<{}> = () => {
    const game = useSelector(selectGame)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(createGame())
    }, [dispatch]);

    if (!game) {
        return <div>Loading game...</div>;
    }

    return (
        <div>

        </div>
    )
}
