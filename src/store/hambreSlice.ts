import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Game, GameFactory, RealDeckFactory, Card, Row } from '../business';

export interface GameState {
    game: Game | null,
    player1Points: number;
    player2Points: number;
    playerName: string | null;
}

const initialState: GameState = {
    game: null,
    player1Points: 0,
    player2Points: 0,
    playerName: null,
}

export const hambreSlice = createSlice({
    name: 'hambre',
    initialState,
    reducers: {
        createGame: state => {
            const deckFactory = new RealDeckFactory();
            const gameFactory = new GameFactory(deckFactory, 2);
            return {
                ...state,
                game: gameFactory.createGame()
            }
        },
        placeCardToRow: (state, action: PayloadAction<{ card: Card; row: Row }>) => {
            if (!state.game) { return state; }
            state.game.placeCardToRow(action.payload.card, action.payload.row);
            return { ...state }
        },
        countPlayerPoints: (state) => {
            if (state.game) {
                const player1 = state.game.getPlayer(0);
                const player2 = state.game.getPlayer(1);
                state.player1Points = player1.getArchivedRows().reduce((acc, row) => acc + row.countPoints(), 0);
                state.player2Points = player2.getArchivedRows().reduce((acc, row) => acc + row.countPoints(), 0);
            }
        },
        setPlayerName: (state, action: PayloadAction<string>) => {
            state.playerName = action.payload;
        },
    },
});

export const { createGame, placeCardToRow, countPlayerPoints, setPlayerName } = hambreSlice.actions
export default hambreSlice.reducer
