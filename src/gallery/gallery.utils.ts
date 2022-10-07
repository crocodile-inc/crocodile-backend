import { Stroke } from 'interfaces';

export const drawCircle = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  circleRadius: number,
  fillColor: string,
) => {
  context.fillStyle = fillColor;
  context.beginPath();
  context.arc(x, y, circleRadius, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
};

export const drawStroke = (context: CanvasRenderingContext2D, stroke: Stroke) => {
  context.lineWidth = stroke.strokeWidth;
  context.strokeStyle = stroke.strokeColor;
  context.lineCap = 'round';
  const points = stroke.points;
  for (let i = 1; i <= points.length; i++) {
    if (i === 1) {
      context.closePath();
      const circleRadius = stroke.strokeWidth / 2;
      drawCircle(context, points[i - 1].x, points[i - 1].y, circleRadius, stroke.strokeColor);
    } else if (i < points.length) {
      context.beginPath();
      context.moveTo(points[i - 1].x, points[i - 1].y);
      context.lineTo(points[i].x, points[i].y);
      context.stroke();
      context.closePath();
    }
  }
};
