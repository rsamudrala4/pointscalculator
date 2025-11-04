const POSITION_POINTS: Record<number, number> = {
  1: 12,
  2: 9,
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4,
  8: 3,
  9: 2,
  10: 1,
  11: 0,
  12: 0,
};

export const getPositionPoints = (position: number): number => {
  return POSITION_POINTS[position] || 0;
};

export const calculateTotalPoints = (position: number, finishes: number): number => {
  return getPositionPoints(position) + finishes;
};
