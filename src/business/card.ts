export enum Points {
    One = 1,
    Two,
    Three
}

export class Card {
    private readonly points: Points;

    constructor(points: Points) {
        this.points = points;
    }

    getPoints(): number {
        return this.points
    }
};

export class Deck {
    private cards: Card[];

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    /**
     * Get the top card without removing it.
     */
    public peekCard(): Card {
        if(this.isEmpty()) {
            throw new Error('The deck is empty')
        }
        return this.cards[this.cards.length - 1]
    }
        
    /**
     * Remove the top card.
     */
    public popCard(): void {
        if(this.isEmpty()) {
            throw new Error('The deck is empty')
        }
        this.cards.pop()
    }

    public isEmpty(): boolean {
        if (this.cards.length === 0) {
            return true
        }
        return false
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
            cards.push(new Card(Points.One))
        }
        for (let i = 0; i < 10; i++) {
            cards.push(new Card(Points.Two))
        }
        for (let i = 0; i < 5; i++) {
            cards.push(new Card(Points.Three))
        }        
        cards.sort(() => Math.random() - 0.5); //shuffling cards
        return new Deck(cards)
    }
}

