
export enum Points {
    One = 1,
    Two = 2,
    Three = 3,
}

export enum Color {
    Orange = "orange",
    Blue = "blue",
    Green = "green",
    Purple = "purple",
}

export class Card {
    private readonly points: Points;
    private readonly colors: Color[];
    private readonly image: string;

    constructor(points: Points, colors: Color[], image: string) {
        this.points = points;
        this.colors = colors;
        this.image = image;
    }

    getPoints(): number {
        return this.points
    }
};
