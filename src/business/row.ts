import { Card } from "./card";

export class Row {
    private cards: Card[];

    public static createEmpty(): Row {
        return new Row([])
    }
    constructor(cards: Card[]) {
        this.cards = cards
    }

    public isFull(): boolean {
        if (this.cards.length >= 4) {
            return true
        }
        return false
    }

    public addCard(card: Card): void {
        //first check if the row has space, then add to the row
        if (this.isFull()) {
            throw new Error('Row is full')
        }
        this.cards.push(card) //adding to the row
    }

    public countPoints() {
        let totalPoints = 0;
        for (const card of this.cards) {
            totalPoints += card.getPoints()
        }
        return totalPoints
    }
}
