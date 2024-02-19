import { ManualDeckFactory } from './card'

export * from './card'
export * from './row'

export function test() {
    console.clear()
    const deckFactory = new ManualDeckFactory()
    const deck1 = deckFactory.createDeck()
    // console.log(deck1)
}