import { Card, Points } from "./card";
import { Row } from "./row";

describe("Row", () => {
    test("count points", () => {
        const card = new Card(Points.One)
        const card1 = new Card(Points.Three)
        const card2 = new Card(Points.Three)

        const row = new Row([card, card1, card2])
        
        expect(row.countPoints()).toBe(7)
    })

    test("add card", () => {
        const cards: Card[] = []
        const row = new Row(cards)
        
        for (let i = 0; i < 4; i++) {
            const card = new Card(Points.Three)
            row.addCard(card)
            expect(cards).toContain(card)
        }
        expect(cards.length).toBe(4)

        const card1 = new Card(Points.Two)
        expect(() => row.addCard(card1)).toThrow()
        expect(cards.length).toBe(4)

    })
})
