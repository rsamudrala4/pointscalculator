import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface TeamInputProps {
  onSubmit: (teams: string[]) => void;
}

function TeamInput({ onSubmit }: TeamInputProps) {
  const [teamInput, setTeamInput] = useState('');

  const readClipboardIntoInput = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.length > 0) {
        setTeamInput(text);
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const handlePasteFromClipboard = async () => {
    const ok = await readClipboardIntoInput();
    if (!ok) {
      alert('Unable to access clipboard. Please allow clipboard permissions or paste manually (Ctrl+V).');
    }
  };

  useEffect(() => {
    // Attempt to auto-paste on load; ignore errors due to permission/user-gesture requirements
    readClipboardIntoInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    const teams = teamInput
      .split('\n')
      .map(team => team.trim())
      .filter(team => team.length > 0);

    if (teams.length > 0) {
      onSubmit(teams);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-orange-500 mb-3 sm:mb-4">Enter Team Names</h2>
      <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6">
        Enter team names line by line. Each line represents a slot number (Line 1 = Slot 1, Line 2 = Slot 2, etc.)
      </p>

      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={handlePasteFromClipboard}
          className="px-3 py-1.5 text-xs sm:text-sm bg-gray-700 hover:bg-gray-600 text-white rounded border border-gray-600 transition-colors"
        >
          Paste
        </button>
      </div>

      <textarea
        value={teamInput}
        onChange={(e) => setTeamInput(e.target.value)}
        placeholder="Team Alpha&#10;Team Beta&#10;Team Gamma&#10;..."
        className="w-full h-48 sm:h-64 p-3 sm:p-4 border-2 border-gray-700 rounded-lg focus:border-orange-500 focus:outline-none resize-none font-mono bg-gray-700 text-white placeholder-gray-500"
      />

      <button
        onClick={handleSubmit}
        disabled={teamInput.trim().length === 0}
        className="mt-5 sm:mt-6 w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        Continue to Points Calculator
        <ArrowRight size={20} />
      </button>
    </div>
  );
}

export default TeamInput;
