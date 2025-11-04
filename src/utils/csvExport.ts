import { Team } from '../types';
import { getPositionPoints, calculateTotalPoints } from './pointsCalculator';

export const generateCSV = (teams: Team[]): string => {
  const header = '#,Slot,Team Name,Position,Total Fin,Pos Point,Total Point';

  const rows = teams.map((team, index) => {
    const posPoint = getPositionPoints(team.position);
    const totalPoint = calculateTotalPoints(team.position, team.finishes);

    return `${index + 1},${team.slot},${team.name},${team.position},${team.finishes},${posPoint},${totalPoint}`;
  });

  return [header, ...rows].join('\n');
};

export const downloadCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
