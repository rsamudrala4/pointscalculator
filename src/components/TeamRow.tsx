import { Plus, Minus } from 'lucide-react';
import { Team } from '../types';
import { getPositionPoints, calculateTotalPoints } from '../utils/pointsCalculator';

interface TeamRowProps {
  team: Team;
  onUpdate: (slot: number, updates: Partial<Team>) => void;
}

function TeamRow({ team, onUpdate }: TeamRowProps) {
  const posPoint = getPositionPoints(team.position);
  const totalPoint = calculateTotalPoints(team.position, team.finishes);

  const handlePositionChange = (position: number) => {
    onUpdate(team.slot, { position });
  };

  const handleFinishesChange = (delta: number) => {
    const newFinishes = Math.max(0, team.finishes + delta);
    onUpdate(team.slot, { finishes: newFinishes });
  };

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-700">
      <td className="px-2 sm:px-3 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-300">
        {team.slot}
      </td>
      <td className="px-2 sm:px-3 py-2 sm:py-4 text-xs sm:text-sm font-medium text-gray-200 truncate">
        {team.name}
      </td>
      <td className="px-2 sm:px-3 py-2 sm:py-4">
        <select
          value={team.position}
          onChange={(e) => handlePositionChange(Number(e.target.value))}
          className="px-2 sm:px-3 py-1 text-xs sm:text-sm border-2 border-gray-600 rounded bg-gray-700 text-white focus:border-pink-500 focus:outline-none"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((pos) => (
            <option key={pos} value={pos}>
              #{pos}
            </option>
          ))}
        </select>
      </td>
      <td className="px-2 sm:px-3 py-2 sm:py-4">
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <button
            onClick={() => handleFinishesChange(-1)}
            className="p-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors text-xs sm:text-sm"
            disabled={team.finishes === 0}
          >
            <Minus size={14} className="sm:w-4 sm:h-4" />
          </button>
          <span className="w-8 sm:w-12 text-center font-semibold text-white text-xs sm:text-sm">
            {team.finishes}
          </span>
          <button
            onClick={() => handleFinishesChange(1)}
            className="p-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors text-xs sm:text-sm"
          >
            <Plus size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </td>
      <td className="px-2 sm:px-3 py-2 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-300">
        {posPoint}
      </td>
      <td className="px-2 sm:px-3 py-2 sm:py-4 text-center text-xs sm:text-sm font-bold text-pink-400">
        {totalPoint}
      </td>
    </tr>
  );
}

export default TeamRow;
