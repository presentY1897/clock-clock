
interface Point {
	x: number;
	y: number;
}

/**
 * Bresenham's Line Algorithm을 사용하여 두 점 사이의 모든 셀을 구합니다.
 * @param start 시작 셀 좌표 {x, y}
 * @param end 끝 셀 좌표 {x, y}
 * @returns 두 셀을 잇는 선분이 지나는 모든 셀의 좌표 배열
 */
function getCellsOnLine(start: Point, end: Point): Point[] {
	const cells: Point[] = [];
	let x1 = start.x;
	let y1 = start.y;
	const x2 = end.x;
	const y2 = end.y;

	const dx = Math.abs(x2 - x1);
	const dy = -Math.abs(y2 - y1);

	const sx = x1 < x2 ? 1 : -1;
	const sy = y1 < y2 ? 1 : -1;

	let err = dx + dy; // error value e_xy

	while (true) {
		cells.push({ x: x1, y: y1 });

		if (x1 === x2 && y1 === y2) {
			break;
		}

		const e2 = 2 * err;
		if (e2 >= dy) {
			// e_xy+e_x > 0
			err += dy;
			x1 += sx;
		}
		if (e2 <= dx) {
			// e_xy+e_y < 0
			err += dx;
			y1 += sy;
		}
	}

	return cells;
}

export default getCellsOnLine;