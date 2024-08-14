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
            new Card(Points.One, [Color.Orange], "pickles"),
            new Card(Points.One, [Color.Orange], "pickles"),
            new Card(Points.One, [Color.Orange], "onion"),
            new Card(Points.One, [Color.Orange], "onion"),
            new Card(Points.One, [Color.Orange], "lettuce"),
            new Card(Points.One, [Color.Orange], "lettuce"),
            new Card(Points.Two, [Color.Orange], "hamburger-bun"),
            new Card(Points.Two, [Color.Orange], "hamburger-bun"),
            new Card(Points.Two, [Color.Orange], "soy-hamburger"),
            new Card(Points.Two, [Color.Orange], "soy-hamburger"),
            new Card(Points.Three, [Color.Orange], "hamburger"),
            new Card(Points.Three, [Color.Orange], "hamburger"),
            new Card(Points.One, [Color.Blue], "tomato-pieces"),
            new Card(Points.One, [Color.Blue], "tomato-pieces"),
            new Card(Points.One, [Color.Blue], "avocado"),
            new Card(Points.One, [Color.Blue], "avocado"),
            new Card(Points.One, [Color.Blue], "mayo"),
            new Card(Points.One, [Color.Blue], "mayo"),
            new Card(Points.One, [Color.Blue], "chucrut"),
            new Card(Points.One, [Color.Blue], "chucrut"),
            new Card(Points.Two, [Color.Blue], "hotdog-bun"),
            new Card(Points.Two, [Color.Blue], "hotdog-bun"),
            new Card(Points.Two, [Color.Blue], "french-fries"),
            new Card(Points.Two, [Color.Blue], "french-fries"),
            new Card(Points.Three, [Color.Blue], "sausages"),
            new Card(Points.Three, [Color.Blue], "sausages"),
            new Card(Points.Three, [Color.Blue], "sausages"),
            new Card(Points.Three, [Color.Blue], "sausages"),
            new Card(Points.One, [Color.Green], "olives"),
            new Card(Points.One, [Color.Green], "olives"),
            new Card(Points.One, [Color.Green], "pineapple"),
            new Card(Points.One, [Color.Green], "pineapple"),
            new Card(Points.One, [Color.Green], "tomato-sauce"),
            new Card(Points.One, [Color.Green], "tomato-sauce"),
            new Card(Points.Two, [Color.Green], "pizza"),
            new Card(Points.Two, [Color.Green], "pizza"),
            new Card(Points.Three, [Color.Green], "pepperoni"),
            new Card(Points.Three, [Color.Green], "pepperoni"),
            new Card(Points.One, [Color.Purple], "paprika"),
            new Card(Points.One, [Color.Purple], "paprika"),
            new Card(Points.One, [Color.Purple], "yoghurt"),
            new Card(Points.One, [Color.Purple], "yoghurt"),
            new Card(Points.One, [Color.Purple], "rice"),
            new Card(Points.One, [Color.Purple], "rice"),
            new Card(Points.Two, [Color.Purple], "guacamole"),
            new Card(Points.Two, [Color.Purple], "guacamole"),
            new Card(Points.Two, [Color.Purple], "tortilla"),
            new Card(Points.Two, [Color.Purple], "tortilla"),
            new Card(Points.One, [Color.Blue, Color.Orange], "mustard"),
            new Card(Points.One, [Color.Blue, Color.Orange], "mustard"),
            new Card(Points.One, [Color.Blue, Color.Orange], "ketchup"),
            new Card(Points.One, [Color.Blue, Color.Orange], "ketchup"),
            new Card(Points.One, [Color.Green, Color.Orange], "tomato"),
            new Card(Points.One, [Color.Green, Color.Orange], "tomato"),
            new Card(Points.One, [Color.Green, Color.Orange], "corn"),
            new Card(Points.One, [Color.Green, Color.Orange], "corn"),
            new Card(Points.Three, [Color.Green, Color.Purple], "meat-pieces"),
            new Card(Points.Three, [Color.Green, Color.Purple], "meat-pieces"),
            new Card(Points.Three, [Color.Green, Color.Purple], "chicken"),
            new Card(Points.Three, [Color.Green, Color.Purple], "chicken"),
            new Card(Points.One, [Color.Orange, Color.Green, Color.Purple], "cheese"),
            new Card(Points.One, [Color.Orange, Color.Green, Color.Purple], "cheese"),
            new Card(Points.Three, [Color.Blue, Color.Orange, Color.Green, Color.Purple], "love"),
            new Card(Points.Three, [Color.Blue, Color.Orange, Color.Green, Color.Purple], "love")
        ];
        cards.sort(() => Math.random() - 0.5); //shuffling cards
        return new Deck(cards)
    }
}

export const realDeckFactory = new RealDeckFactory()
