export interface Point {
  x: number;
  y: number;
}

/**
 * Area is an reactangle on the surface.
 * At backend we use mysql Polygon class that is defined as [[exterior boundary], ...[interior boundary]]
 * We deal only with exterior boundary now
 * https://dev.mysql.com/doc/refman/5.7/en/gis-class-polygon.html
 */
export class Area {
  boundary: Array<Point>;

  constructor(data: Array<Array<Point>>) {
    // forces to clone array and points
    this.boundary = data[0].map(p => ({x: p.x, y: p.y}));
    this.boundary.pop();
  }

  /**
   * Returns area as polygon type
   * @returns {[Array<Point>]}
   */
  asPolygon() {
    return [[...this.boundary, this.boundary[0]]];
  }
}
