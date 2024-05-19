import { createSlice } from '@reduxjs/toolkit'
import { Game, GameFactory, RealDeckFactory } from '../business';

export interface GameState {
    game: Game | null
}

const initialState: GameState = {
    game: null
}

export const hambreSlice = createSlice({
    name: 'hambre',
    initialState,
    reducers: {
        createGame: state => {
            const deckFactory = new RealDeckFactory();
            const gameFactory = new GameFactory(deckFactory, 2);
            state.game = gameFactory.createGame();
        }
    }
})

export const { createGame } = hambreSlice.actions
export default hambreSlice.reducer
export const selectGame = (state: GameState) => state.game
