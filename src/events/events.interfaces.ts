export interface Room {
  id: string;
  riddle: string;
  picture: Picture;
}

export interface Picture {
  id: number;
  strokes: Stroke[];
  backgroundColor: string;
}

export interface Stroke {
  id: number;
  strokeColor: string;
  strokeWidth: number;
  points: Point[];
}

export interface Point {
  id: number;
  x: number;
  y: number;
}
