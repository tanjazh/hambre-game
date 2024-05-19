import { Card, Points, Color } from "./card";
import { Deck, ManualDeckFactory, DeckFactory } from "./deck";
import { Row } from "./row";
import { Game, GameFactory } from "./game";
import { Player } from './player'
import exp from "constants";

describe("GameFactory", () => {
    test("create game", () => {
        const nPlayers = 2
        const deckFactory = new ManualDeckFactory()
        const gameFactory = new GameFactory(deckFactory, nPlayers)

        const game = gameFactory.createGame()
    })
})

describe("Game", () => {
    test("Game simulation", () => {
        const card0 = new Card(Points.One, [Color.Purple], "")
        const card1 = new Card(Points.Two, [Color.Purple], "")
        const card2 = new Card(Points.Three, [Color.Purple], "")
        const card3 = new Card(Points.One, [Color.Purple], "")
        const card4 = new Card(Points.Two, [Color.Purple], "")
        const card5 = new Card(Points.Three, [Color.Purple], "")
        const card6 = new Card(Points.One, [Color.Purple], "")
        const card7 = new Card(Points.Two, [Color.Purple], "")
        const card8 = new Card(Points.Three, [Color.Purple], "")
        const card9 = new Card(Points.Three, [Color.Purple], "")
        const cards = [card0, card1, card2, card3, card4, card5, card6, card7, card8, card9]
        const deck = new Deck(cards)

        const nPlayers = 2
        const testDeckFactory = new TestDeckFactory(deck)
        const gameFactory = new GameFactory(testDeckFactory, nPlayers)
        const game = gameFactory.createGame()

        const player0 = game.getActivePlayer()
        expect(player0.countPoints()).toBe(0)
        const player0Rows = player0.getActiveRows()

        game.placeCardToRow(card9, player0Rows[0])

        expect(deck.getCount()).toBe(9)

        const player1 = game.getActivePlayer()
        expect(player1).not.toBe(player0)
        expect(player1.countPoints()).toBe(0)
        const player1Rows = game.getActiveRowsOf(player1)

        game.placeCardToRow(card8, player1Rows[0])

        expect(deck.getCount()).toBe(8)

        game.placeCardToRow(card7, player0Rows[0])
        game.placeCardToRow(card6, player1Rows[0])
        game.placeCardToRow(card5, player0Rows[0])
        game.placeCardToRow(card4, player1Rows[0])

        expect(player0.countPoints()).toBe(0)
        expect(player1.countPoints()).toBe(0)

        game.placeCardToRow(card3, player0Rows[0])

        expect(player0.countPoints()).toBe(9)
        expect(player1.countPoints()).toBe(0)

        game.placeCardToRow(card2, player1Rows[0])

        expect(player0.countPoints()).toBe(9)

        expect(game.isFinished()).toBe(false)

        expect(player1.countPoints()).toBe(9)

        game.placeCardToRow(card1, player0Rows[0])
        game.placeCardToRow(card0, player1Rows[0])

        expect(game.isFinished()).toBe(true)

        expect(player0.countPoints()).toBe(9)
        expect(player1.countPoints()).toBe(9)
    })
})

class TestDeckFactory implements DeckFactory {

    private readonly deck: Deck

    constructor(deck: Deck) {
        this.deck = deck
    }

    public createDeck(): Deck {
        return this.deck
    }
}