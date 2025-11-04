import { useState } from 'react';
import TeamInput from './components/TeamInput';
import PointsCalculator from './components/PointsCalculator';
import { Team } from './types';

function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [tournamentName, setTournamentName] = useState('');
  const [matchDetails, setMatchDetails] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);

  const handleTeamsSubmit = (teamNames: string[]) => {
    const initializedTeams: Team[] = teamNames.map((name, index) => ({
      slot: index + 1,
      name: name.trim(),
      position: 11,
      finishes: 0
    }));
    setTeams(initializedTeams);
    setShowCalculator(true);
  };

  const handleReset = () => {
    setTeams([]);
    setShowCalculator(false);
    setTournamentName('');
    setMatchDetails('');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-6xl">
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 mb-2">Free Fire Max Points Calculator</h1>
          <p className="text-gray-400 text-sm sm:text-base">Calculate tournament points with ease</p>
        </header>

        {!showCalculator ? (
          <TeamInput onSubmit={handleTeamsSubmit} />
        ) : (
          <PointsCalculator
            teams={teams}
            setTeams={setTeams}
            tournamentName={tournamentName}
            setTournamentName={setTournamentName}
            matchDetails={matchDetails}
            setMatchDetails={setMatchDetails}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}

export default App;
