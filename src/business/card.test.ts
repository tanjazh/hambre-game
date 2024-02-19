import { Card, Points, Deck, ManualDeckFactory } from "./card";

describe("card", () => {
  test("should get points", () => {
    const card = new Card(Points.Three)
    expect(card.getPoints()).toBe(Points.Three)
  })
})

describe("deck", () => {
  test("pop Card", () => {
    const card0 = new Card(Points.One)
    const card1 = new Card(Points.Two)
    const card2 = new Card(Points.Three)
    const cards = [card0, card1, card2]
    const deck = new Deck(cards)

    deck.popCard()
    deck.popCard()
    expect(cards).toContainEqual(card0)

    deck.popCard()

    expect(() => deck.popCard()).toThrow()
  })

  test("is empty", () => {
    const card = new Card(Points.One)
    const fullDeck = new Deck([card])

    expect(fullDeck.isEmpty()).toBe(false)

    const emptyDeck = new Deck([])

    expect(emptyDeck.isEmpty()).toBe(true)
  })

  test("peek card", () => {
    const card0 = new Card(Points.One)
    const card1 = new Card(Points.Two)
    const card2 = new Card(Points.Three)
    const deck = new Deck([card0, card1, card2])

    expect(deck.peekCard()).toBe(card2)
  })

  test("pop card", () => {
    const card = new Card(Points.Three)
    const deck = new Deck([card])
    deck.popCard()

    expect(deck.isEmpty()).toBe(true)
  })
})


describe("Deck Factory", () => {
  test("create Deck", () => {
    const deckFactory = new ManualDeckFactory()
    const deck = deckFactory.createDeck()
    
    expect(deck.isEmpty()).toBe(false)
  })
})