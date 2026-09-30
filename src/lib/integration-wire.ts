// Geometry for the integrations hub wires, shared by the server render and
// the client parallax loop (kept apart from the logo data so the client
// bundle stays small).

/** Pointer parallax travel in CSS px at depth 1. */
export const PARALLAX_X = 22;
export const PARALLAX_Y = 16;

/**
 * A quadratic curve from the hub to a tile that bows sideways by `bend`
 * (a fraction of its length, signed), so the wires fan out in arcs rather
 * than radiating as straight spokes.
 */
export function wirePath(hx: number, hy: number, nx: number, ny: number, bend: number) {
  const dx = nx - hx;
  const dy = ny - hy;
  const cx = hx + dx / 2 - dy * bend;
  const cy = hy + dy / 2 + dx * bend;
  return `M${hx.toFixed(1)} ${hy.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${nx.toFixed(1)} ${ny.toFixed(1)}`;
}

/** Bend for a tile: bows away from the vertical axis, varied per tile. */
export function wireBend(nx: number, hx: number, delay: number) {
  return (nx < hx ? -1 : 1) * (0.14 + (delay / 6) * 0.14);
}
