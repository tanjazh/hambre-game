import { Game } from "./game";
import { Row } from "./row";

export class Player {
    private game: Game;

    constructor(game: Game) {
        this.game = game
    }

    public isActive(): boolean {
        if (this.game.getActivePlayer() === this) {
            return true
        }
        return false
    }

    public countPoints(): number {
        let points = 0
        for (const row of this.getArchivedRows()) {
            points += row.countPoints()
        }
        return points
    }

    public getActiveRows(): Row[] {
        return this.game.getActiveRowsOf(this)
    }

    public getArchivedRows(): Row[] {
        return this.game.getArchivedRows(this)
    }
}