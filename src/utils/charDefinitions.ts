import {
	type Angle,
	createAnglesFromVertexPaths,
	E, V, H, L1, L2, L3, L4
} from "./clockAngleUtils";

const UPPER_LINE = (maxCol: number) => [
	L2,
	...Array(maxCol - 2).fill(H),
	L3,
];

const LOWER_LINE = (maxCol: number) => [
	L1,
	...Array(maxCol - 2).fill(H),
	L4,
];

export const CHAR_DEFINITIONS: {
	[key: string]: {
		small: (maxCol: number, maxRow: number) => Angle[];
		normal: (maxCol: number, maxRow: number) => Angle[];
	}
} = {
	'0': {
		small: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
			[
				{ col: 0, row: 0 },
				{ col: maxCol - 1, row: 0 },
				{ col: maxCol - 1, row: maxRow - 1 },
				{ col: 0, row: maxRow - 1 },
				{ col: 0, row: 0 },
			],
		]),
		normal: (maxCol, maxRow) => {
			const angles = [];
			angles.push(...UPPER_LINE(maxCol));
			angles.push(V, L2, ...Array(maxCol - 4).fill(H), L3, V);
			for (let i = 0; i < maxRow - 4; i++) {
				angles.push(V, V, ...Array(maxCol - 4).fill(E), V, V);
			}
			angles.push(V, L1, ...Array(maxCol - 4).fill(H), L4, V);
			angles.push(...LOWER_LINE(maxCol));
			return angles;
		},
	},
	'1': {
		small: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
			[
				{ col: maxCol - 1, row: 0 },
				{ col: maxCol - 1, row: maxRow - 1 },
			],
		]),
		normal: (maxCol, maxRow) => {
			const angles = [];
			angles.push(...Array(maxCol - 2).fill(E), L2, L3);
			for (let i = 0; i < maxRow - 2; i++) {
				angles.push(...Array(maxCol - 2).fill(E), V, V);
			}
			angles.push(...Array(maxCol - 2).fill(E), L1, L4);
			return angles;
		},
	},
	'2': {
		small: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
			[
				{ col: 0, row: 0 },
				{ col: maxCol - 1, row: 0 },
				{ col: maxCol - 1, row: Math.floor(maxRow / 2) },
				{ col: 0, row: Math.floor(maxRow / 2) },
				{ col: 0, row: maxRow - 1 },
				{ col: maxCol - 1, row: maxRow - 1 },
			],
		]),
		normal: (maxCol, maxRow) => {
			const angles = [];
			angles.push(...UPPER_LINE(maxCol));
			angles.push(L1, ...Array(maxCol - 3).fill(H), L3, V);
			for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
				angles.push(...Array(maxCol - 2).fill(E), V, V);
			}
			angles.push(L2, ...Array(maxCol - 3).fill(H), L4, V);
			angles.push(V, L2, ...Array(maxCol - 3).fill(H), L4);
			for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
				angles.push(V, V, ...Array(maxCol - 2).fill(E));
			}
			angles.push(V, L1, ...Array(maxCol - 3).fill(H), L3);
			angles.push(...LOWER_LINE(maxCol));
			return angles;
		},
	},
	'3': {
		small: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
			[
				{ col: 0, row: 0 },
				{ col: maxCol - 1, row: 0 },
				{ col: maxCol - 1, row: Math.floor(maxRow / 2) },
				{ col: 0, row: Math.floor(maxRow / 2) },
			],
			[
				{ col: maxCol - 1, row: Math.floor(maxRow / 2) },
				{ col: maxCol - 1, row: maxRow - 1 },
				{ col: 0, row: maxRow - 1 },
			],
		]),
		normal: (maxCol, maxRow) => {
			const angles = [];
			angles.push(...UPPER_LINE(maxCol));
			angles.push(L1, ...Array(maxCol - 3).fill(H), L3, V);
			for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
				angles.push(...Array(maxCol - 2).fill(E), V, V);
			}
			angles.push(L2, ...Array(maxCol - 3).fill(H), L4, V);
			angles.push(L1, ...Array(maxCol - 3).fill(H), L3, V);
			for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
				angles.push(...Array(maxCol - 2).fill(E), V, V);
			}
			angles.push(L2, ...Array(maxCol - 3).fill(H), L4, V);
			angles.push(...LOWER_LINE(maxCol));
			return angles;
		},
	},
	'4': {
		small: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
			[
				{ col: 0, row: 0 },
				{ col: 0, row: Math.floor(maxRow / 2) },
				{ col: maxCol - 1, row: Math.floor(maxRow / 2) },
			],
			[
				{ col: maxCol - 1, row: 0 },
				{ col: maxCol - 1, row: maxRow - 1 },
			],
		]),
		normal: (maxCol, maxRow) => {
			const angles = [];
			angles.push(L2, L3, ...Array(maxCol - 4).fill(E), L2, L3);
			for (let i = 0; i < Math.floor((maxRow - 4) / 2); i++) {
				angles.push(V, V, ...Array(maxCol - 4).fill(E), V, V);
			}
			angles.push(V, L1, ...Array(maxCol - 4).fill(H), L4, V);
			angles.push(L1, ...Array(maxCol - 3).fill(H), L3, V);
			for (let i = 0; i < Math.ceil((maxRow - 4) / 2); i++) {
				angles.push(...Array(maxCol - 2).fill(E), V, V);
			}
			angles.push(...Array(maxCol - 2).fill(E), L1, L4);
			return angles;
		},
	},
	'5': {
		small: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
			[
				{ col: maxCol - 1, row: 0 },
				{ col: 0, row: 0 },
				{ col: 0, row: Math.floor(maxRow / 2) },
				{ col: maxCol - 1, row: Math.floor(maxRow / 2) },
				{ col: maxCol - 1, row: maxRow - 1 },
				{ col: 0, row: maxRow - 1 },
			],
		]),
		normal: (maxCol, maxRow) => {
			const angles = [];
			angles.push(...UPPER_LINE(maxCol));
			angles.push(V, L2, ...Array(maxCol - 3).fill(H), L4);
			for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
				angles.push(V, V, ...Array(maxCol - 2).fill(E));
			}
			angles.push(V, L1, ...Array(maxCol - 3).fill(H), L3);
			angles.push(L1, ...Array(maxCol - 3).fill(H), L3, V);
			for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
				angles.push(...Array(maxCol - 2).fill(E), V, V);
			}
			angles.push(L2, ...Array(maxCol - 3).fill(H), L4, V);
			angles.push(...LOWER_LINE(maxCol));
			return angles;
		},
	},
	'6': {
		small: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
			[
				{ col: maxCol - 1, row: 0 },
				{ col: 0, row: 0 },
				{ col: 0, row: maxRow - 1 },
			],
			[
				{ col: 0, row: Math.floor(maxRow / 2) },
				{ col: maxCol - 1, row: Math.floor(maxRow / 2) },
				{ col: maxCol - 1, row: maxRow - 1 },
				{ col: 0, row: maxRow - 1 },
				{ col: 0, row: Math.floor(maxRow / 2) },
			],
		]),
		normal: (maxCol, maxRow) => {
			const angles = [];
			angles.push(...UPPER_LINE(maxCol));
			angles.push(V, L2, ...Array(maxCol - 3).fill(H), L4);
			for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
				angles.push(V, V, ...Array(maxCol - 2).fill(E));
			}
			angles.push(V, L1, ...Array(maxCol - 3).fill(H), L3);
			angles.push(V, L2, ...Array(maxCol - 4).fill(H), L3, V);
			for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
				angles.push(V, V, ...Array(maxCol - 4).fill(E), V, V);
			}
			angles.push(V, L1, ...Array(maxCol - 4).fill(H), L4, V);
			angles.push(...LOWER_LINE(maxCol));
			return angles;
		},
	},
	'7': {
		small: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
			[
				{ col: 0, row: 0 },
				{ col: maxCol - 1, row: 0 },
				{ col: maxCol - 1, row: maxRow - 1 },
			],
		]),
		normal: (maxCol, maxRow) => {
			const angles = [];
			angles.push(...UPPER_LINE(maxCol));
			angles.push(L1, ...Array(maxCol - 3).fill(H), L3, V);
			for (let i = 0; i < maxRow - 3; i++) {
				angles.push(...Array(maxCol - 2).fill(E), V, V);
			}
			angles.push(...Array(maxCol - 2).fill(E), L1, L4);
			return angles;
		},
	},
	'8': {
		small: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
			[
				{ col: 0, row: 0 },
				{ col: maxCol - 1, row: 0 },
				{ col: maxCol - 1, row: Math.floor(maxRow / 2) },
				{ col: 0, row: Math.floor(maxRow / 2) },
				{ col: 0, row: 0 },
			],
			[
				{ col: 0, row: Math.floor(maxRow / 2) },
				{ col: maxCol - 1, row: Math.floor(maxRow / 2) },
				{ col: maxCol - 1, row: maxRow - 1 },
				{ col: 0, row: maxRow - 1 },
				{ col: 0, row: Math.floor(maxRow / 2) },
			],
		]),
		normal: (maxCol, maxRow) => {
			const angles = [];
			angles.push(...UPPER_LINE(maxCol));
			angles.push(V, L2, ...Array(maxCol - 4).fill(H), L3, V);
			for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
				angles.push(V, V, ...Array(maxCol - 4).fill(E), V, V);
			}
			angles.push(V, L1, ...Array(maxCol - 4).fill(H), L4, V);
			angles.push(V, L2, ...Array(maxCol - 4).fill(H), L3, V);
			for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
				angles.push(V, V, ...Array(maxCol - 4).fill(E), V, V);
			}
			angles.push(V, L1, ...Array(maxCol - 4).fill(H), L4, V);
			angles.push(...LOWER_LINE(maxCol));
			return angles;
		},
	},
	'9': {
		small: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
			[
				{ col: 0, row: 0 },
				{ col: maxCol - 1, row: 0 },
				{ col: maxCol - 1, row: Math.floor(maxRow / 2) },
				{ col: 0, row: Math.floor(maxRow / 2) },
				{ col: 0, row: 0 },
			],
			[
				{ col: 0, row: Math.floor(maxRow / 2) },
				{ col: maxCol - 1, row: Math.floor(maxRow / 2) },
				{ col: maxCol - 1, row: maxRow - 1 },
				{ col: 0, row: maxRow - 1 },
			],
		]),
		normal: (maxCol, maxRow) => {
			const angles = [];
			angles.push(...UPPER_LINE(maxCol));
			angles.push(V, L2, ...Array(maxCol - 4).fill(H), L3, V);
			for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
				angles.push(V, V, ...Array(maxCol - 4).fill(E), V, V);
			}
			angles.push(V, L1, ...Array(maxCol - 4).fill(H), L4, V);
			angles.push(L1, ...Array(maxCol - 3).fill(H), L3, V);
			for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
				angles.push(...Array(maxCol - 2).fill(E), V, V);
			}
			angles.push(L2, ...Array(maxCol - 3).fill(H), L4, V);
			angles.push(...LOWER_LINE(maxCol));
			return angles;
		},
	},
	'c': {
		small: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
			[
				{ col: maxCol - 1, row: 0 },
				{ col: 0, row: 0 },
				{ col: 0, row: maxRow - 1 },
				{ col: maxCol - 1, row: maxRow - 1 },
			],
		]),
		normal: (maxCol, maxRow) => {
			const angles = [];
			angles.push(...UPPER_LINE(maxCol));
			angles.push(V, L2, ...Array(maxCol - 3).fill(H), L4);
			for (let i = 0; i < maxRow - 4; i++) {
				angles.push(V, V, ...Array(maxCol - 2).fill(E));
			}
			angles.push(V, L1, ...Array(maxCol - 3).fill(H), L3);
			angles.push(...LOWER_LINE(maxCol));
			return angles;
		},
	},
	'l': {
		small: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
			[
				{ col: 0, row: 0 },
				{ col: 0, row: maxRow - 1 },
				{ col: maxCol - 1, row: maxRow - 1 },
			],
		]),
		normal: (maxCol, maxRow) => {
			const angles = [];
			angles.push(L2, L3, ...Array(maxCol - 2).fill(E));
			for (let i = 0; i < maxRow - 3; i++) {
				angles.push(V, V, ...Array(maxCol - 2).fill(E));
			}
			angles.push(V, L1, ...Array(maxCol - 3).fill(H), L3);
			angles.push(...LOWER_LINE(maxCol));
			return angles;
		},
	},
	'k': {
		small: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
			[
				{ col: 0, row: 0 },
				{ col: 0, row: maxRow - 1 },
			],
			[
				{ col: maxCol - 1, row: 0 },
				{ col: 0, row: Math.floor(maxRow / 2) },
				{ col: maxCol - 1, row: maxRow - 1 },
			],
		]),
		normal: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
			[
				{ col: 0, row: 0 },
				{ col: 1, row: 0 },
				{ col: 1, row: Math.max(Math.floor((maxRow - 4) / 2), 1) },
				{ col: maxCol - 1, row: 0 },
				{ col: 1, row: Math.max(Math.floor((maxRow - 4) / 2), 1) + 1 },
				{ col: maxCol - 1, row: maxRow - 2 },
				{ col: maxCol - 1, row: maxRow - 1 },
				{ col: 1, row: Math.max(Math.floor((maxRow - 4) / 2), 1) + 2 },
				{ col: 1, row: maxRow - 1 },
				{ col: 0, row: maxRow - 1 },
				{ col: 0, row: 0 },
			]
		]),
	},
	':': {
		small: (maxCol, maxRow) => [...Array(maxCol * maxRow)].map(() => E),
		normal: (maxCol, maxRow) => {
			const angles = [];
			const emptyTopBottomRows = Math.floor((maxRow - 5) / 2);
			const emptyMidRowColsLeft = Math.ceil((maxCol - 2) / 2);
			const emptyMidRowColsRight = Math.floor((maxCol - 2) / 2);

			angles.push(...Array(emptyTopBottomRows * maxCol).fill(E));
			angles.push(...Array(emptyMidRowColsLeft).fill(E), L2, L3, ...Array(emptyMidRowColsRight).fill(E));
			angles.push(...Array(emptyMidRowColsLeft).fill(E), L1, L4, ...Array(emptyMidRowColsRight).fill(E));
			angles.push(...Array(maxCol).fill(E));
			angles.push(...Array(emptyMidRowColsLeft).fill(E), L2, L3, ...Array(emptyMidRowColsRight).fill(E));
			angles.push(...Array(emptyMidRowColsLeft).fill(E), L1, L4, ...Array(emptyMidRowColsRight).fill(E));
			angles.push(...Array(emptyTopBottomRows * maxCol).fill(E));
			return angles;
		},
	},
};

// Aliases
CHAR_DEFINITIONS['o'] = CHAR_DEFINITIONS['0'];
CHAR_DEFINITIONS['O'] = CHAR_DEFINITIONS['0'];
CHAR_DEFINITIONS['C'] = CHAR_DEFINITIONS['c'];
CHAR_DEFINITIONS['L'] = CHAR_DEFINITIONS['l'];
CHAR_DEFINITIONS['K'] = CHAR_DEFINITIONS['k'];