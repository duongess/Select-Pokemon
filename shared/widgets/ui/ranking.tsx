import { ScrollArea, ScrollBar } from '@/shared/widgets/ui/scroll-area';

export function Ranking() {
  const rankings = [
    { name: "Player 1", description: "Top scorer", score: 1500 },
    { name: "Player 2", description: "Second place", score: 1400 },
    { name: "Player 3", description: "Third place", score: 1300 },
    { name: "Player 4", description: "Fourth place", score: 1200 },
    { name: "Player 5", description: "Fifth place", score: 1100 },
    { name: "Player 6", description: "Sixth", score: 1000 },
    { name: "Player 7", description: "Seventh", score: 950 },
    { name: "Player 8", description: "Eighth", score: 900 },
    { name: "Player 9", description: "Ninth", score: 850 },
    { name: "Player 10", description: "Tenth", score: 800 },
  ];

  return (
    <div className="rounded-xl border border-gray-700 bg-[#121212] shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-center text-xl font-bold text-white p-4 border-b border-gray-700">
        🏆 Leaderboard
      </h2>
      <ScrollArea className="h-[360px] px-1">
        <div className="space-y-3 p-4 pr-3">
          {rankings.map((ranking, index) => (
            <div
              key={index}
              className="bg-[#181A20] rounded-md px-4 py-3 flex items-center justify-between hover:bg-[#22242c] transition-colors duration-200"
            >
              <div>
                <h3 className="text-base font-medium text-white">{`${index + 1}. ${ranking.name}`}</h3>
                <p className="text-sm text-gray-400">{ranking.description}</p>
              </div>
              <span className="text-lg font-bold text-yellow-400">{ranking.score}</span>
            </div>
          ))}
        </div>
        <ScrollBar />
      </ScrollArea>
    </div>
  );
}
