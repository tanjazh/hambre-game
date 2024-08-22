import { Player } from './player'
import { Card } from "./card";
import { Deck, DeckFactory } from './deck'
import { Row } from "./row";

//bestimmt den ganzen Spielverlauf und alle Interaktionen
export class Game {
    private readonly deck: Deck;
    private readonly players: Player[];
    private readonly archivedRows: Map<Player, Row[]>;
    private readonly activeRows: Map<Player, Row[]>;
    private activePlayerIndex: number

    constructor(players: Player[], deck: Deck, archivedRows: Map<Player, Row[]>, activeRows: Map<Player, Row[]>, activePlayerIndex: number) {
        this.deck = deck
        this.players = players
        this.archivedRows = archivedRows
        this.activeRows = activeRows
        this.activePlayerIndex = activePlayerIndex
    }

    public getPlayer(index: number): Player {
        return this.players[index]
    }

    public getActivePlayer(): Player {
        return this.players[this.activePlayerIndex]
    }

    public getPlayers(): Player[] {
        return this.players;
    }

    public getDeck(): Deck {
        return this.deck;
    }

    public isFinished(): boolean {
        return this.deck.isEmpty()
    }

    public getActiveRowsOf(player: Player): Row[] {
        const playerActiveRows: Row[] | undefined = this.activeRows.get(player)
        if (typeof playerActiveRows === "undefined") {
            throw new Error("Active rows of player are missing")
        }
        return playerActiveRows
    }

    public getArchivedRows(player: Player): Row[] {
        const playerArchivedRows: Row[] | undefined = this.archivedRows.get(player)
        if (typeof playerArchivedRows === "undefined") {
            throw new Error("Archived rows of player are missing")
        }
        return playerArchivedRows
    }

    public placeCardToRow(card: Card, row: Row): void {
        //validate card
        if (card !== this.deck.peekCard()) {
            return
        }
        //validate row
        const activePlayer = this.getActivePlayer()
        if (!activePlayer.getActiveRows().includes(row)) {
            return
        }

        // remove card from deck
        this.deck.popCard()

        // add card to row
        row.addCard(card)

        // handle full row
        if (row.isFull()) {
            // move row to archived rows
            activePlayer.getArchivedRows().push(row)
            const rowIndex: number = activePlayer.getActiveRows().indexOf(row)
            // create new row for this player
            activePlayer.getActiveRows()[rowIndex] = Row.createEmpty()
        }
        //finish turn
        this.nextPlayer()
    }

    public peekCard(): Card {
        return this.deck.peekCard()
    }

    private nextPlayer(): void {
        this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length
    }
}

export class GameFactory {
    private readonly activeRowsPerPlayer: number
    private readonly deckFactory: DeckFactory
    private readonly nPlayers: number

    constructor(deckFactory: DeckFactory, nPlayers: number) {
        this.activeRowsPerPlayer = 2
        this.deckFactory = deckFactory
        this.nPlayers = nPlayers
    }

    public getRandomPlayerIndex(): number {
        return Math.floor(Math.random() * this.nPlayers)
    }

    public createPlayers(game: Game): Player[] {
        const players: Player[] = []
        for (let i = 0; i < this.nPlayers; i++) {
            players.push(new Player(game))
        }
        return players
    }

    public createGame(): Game {
        const players: Player[] = []

        const deck = this.deckFactory.createDeck()

        const activeRows = new Map<Player, Row[]>()
        const archivedRows = new Map<Player, Row[]>()
        const activePlayerIndex: number = this.getRandomPlayerIndex()

        const game = new Game(players, deck, archivedRows, activeRows, activePlayerIndex)

        for (const player of this.createPlayers(game)) {
            // creating players
            players.push(player)
            // 2 active rows
            const playerActiveRows: Row[] = []
            for (let i = 0; i < this.activeRowsPerPlayer; i++) {
                playerActiveRows.push(Row.createEmpty())
            }
            activeRows.set(player, playerActiveRows)
            // no archived rows
            archivedRows.set(player, [])
        }

        return game
    }
}