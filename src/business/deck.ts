import { Card, Points, Color } from './card'

export class Deck {
    private cards: Card[];

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    public isEmpty(): boolean {
        if (this.cards.length === 0) {
            return true
        }
        return false
    }

    /**
     * Get the top card without removing it.
     */
    public peekCard(): Card {
        if (this.isEmpty()) {
            throw new Error('The deck is empty')
        }
        return this.cards[this.cards.length - 1]
    }

    /**
     * Remove the top card.
     */
    public popCard(): void {
        if (this.isEmpty()) {
            throw new Error('The deck is empty')
        }
        this.cards.pop()
    }

    public getCount(): number {
        return this.cards.length
    }
}

export interface DeckFactory {
    createDeck(): Deck
}

export class ManualDeckFactory implements DeckFactory {

    public createDeck(): Deck {
        const cards = [];
        for (let i = 0; i < 10; i++) {
            cards.push(new Card(Points.One, [Color.Orange], ""))
        }
        for (let i = 0; i < 10; i++) {
            cards.push(new Card(Points.Two, [Color.Orange], ""))
        }
        for (let i = 0; i < 5; i++) {
            cards.push(new Card(Points.Three, [Color.Orange], ""))
        }
        cards.sort(() => Math.random() - 0.5); //shuffling cards
        return new Deck(cards)
    }
}

export class RealDeckFactory implements DeckFactory {

    public createDeck(): Deck {
        const cards: Card[] = [
            new Card(Points.One, [Color.Orange], ""),
            new Card(Points.One, [Color.Green], ""),
            new Card(Points.One, [Color.Purple], ""),
            new Card(Points.One, [Color.Purple, Color.Orange], ""),
            // and so on
        ];
        cards.sort(() => Math.random() - 0.5); //shuffling cards
        return new Deck(cards)
    }
}

export const realDeckFactory = new RealDeckFactory()
