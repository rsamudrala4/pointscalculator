import { Download, Save, RotateCcw } from 'lucide-react';
import { Team } from '../types';
import { generateCSV, downloadCSV } from '../utils/csvExport';
import TeamRow from './TeamRow';

interface PointsCalculatorProps {
  teams: Team[];
  setTeams: (teams: Team[]) => void;
  tournamentName: string;
  setTournamentName: (name: string) => void;
  matchDetails: string;
  setMatchDetails: (details: string) => void;
  onReset: () => void;
}

function PointsCalculator({
  teams,
  setTeams,
  tournamentName,
  setTournamentName,
  matchDetails,
  setMatchDetails,
  onReset
}: PointsCalculatorProps) {
  const updateTeam = (slot: number, updates: Partial<Team>) => {
    setTeams(
      teams.map(team =>
        team.slot === slot ? { ...team, ...updates } : team
      )
    );
  };

  const handleDownloadCSV = () => {
    const csvContent = generateCSV(teams);
    const filename = `${tournamentName || 'tournament'}_${matchDetails || 'match'}.csv`
      .replace(/[^a-z0-9_-]/gi, '_')
      .toLowerCase();
    downloadCSV(csvContent, filename);
  };

  const handleSaveFile = () => {
    const data = {
      tournamentName,
      matchDetails,
      teams
    };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    const filename = `${tournamentName || 'tournament'}_${matchDetails || 'match'}.json`
      .replace(/[^a-z0-9_-]/gi, '_')
      .toLowerCase();

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-3 sm:p-4 md:p-8 space-y-4 sm:space-y-6">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
              Tournament Name
            </label>
            <input
              type="text"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              placeholder="Enter tournament name"
              className="w-full px-3 sm:px-4 py-2 text-sm border-2 border-gray-700 rounded-lg focus:border-orange-500 focus:outline-none bg-gray-700 text-white placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
              Match Details
            </label>
            <input
              type="text"
              value={matchDetails}
              onChange={(e) => setMatchDetails(e.target.value)}
              placeholder="Enter match details"
              className="w-full px-3 sm:px-4 py-2 text-sm border-2 border-gray-700 rounded-lg focus:border-orange-500 focus:outline-none bg-gray-700 text-white placeholder-gray-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition-colors text-xs sm:text-sm"
          >
            <Download size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Download CSV</span>
            <span className="sm:hidden">CSV</span>
          </button>
          <button
            onClick={handleSaveFile}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition-colors text-xs sm:text-sm"
          >
            <Save size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Save File</span>
            <span className="sm:hidden">Save</span>
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition-colors text-xs sm:text-sm"
          >
            <RotateCcw size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Reset</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b-2 border-gray-700">
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left font-bold text-orange-500">Slot</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left font-bold text-orange-500">Team Name</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left font-bold text-orange-500">Position</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-center font-bold text-orange-500">Finish</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-center font-bold text-orange-500">Pos Pt</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-center font-bold text-orange-500">Total</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <TeamRow
                key={team.slot}
                team={team}
                onUpdate={updateTeam}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PointsCalculator;
