import React from "react";
import { GameProvider, useGame } from "@/contexts/GameContext";
import Header from "@/components/layout/Header";
import ChallengeHeader from "@/components/game/ChallengeHeader";
import WordGrid from "@/components/game/WordGrid";
import GameControls from "@/components/game/GameControls";
import WordList from "@/components/game/WordList";
import HintModal from "@/components/game/HintModal";
import CompletionModal from "@/components/game/CompletionModal";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const GameContent = () => {
  const {
    title,
    description,
    difficulty,
    grid,
    words,
    foundWords,
    hintsRemaining,
    formattedTime,
    isHintModalOpen,
    isCompletionModalOpen,
    currentHint,
    secondsElapsed,
    hintsUsed,
    findWord,
    useHint,
    closeHintModal,
    closeCompletionModal,
    shareResults,
    resetGame,
  } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Header />

      <main className="container max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Game Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card rounded-lg p-6 shadow-sm">
          <ChallengeHeader
            title={title}
            description={description}
            date={new Date()}
            difficulty={difficulty}
            timeRemaining={formattedTime}
          />

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={resetGame}
          >
            <RefreshCw className="h-4 w-4" />
            New Puzzle
          </Button>
        </div>

        {/* Game Grid Section */}
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <WordGrid
            size={grid.length}
            letters={grid}
            words={words}
            onWordFound={findWord}
            foundWords={foundWords}
          />
        </div>

        {/* Game Controls and Word List Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <GameControls
              wordsFound={foundWords.length}
              totalWords={words.length}
              hintsRemaining={hintsRemaining}
              onUseHint={useHint}
              onShare={shareResults}
            />
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm">
            <WordList words={words} foundWords={foundWords} />
          </div>
        </div>

        {/* Modals */}
        <HintModal
          isOpen={isHintModalOpen}
          onClose={closeHintModal}
          hint={currentHint}
        />

        <CompletionModal
          isOpen={isCompletionModalOpen}
          onClose={closeCompletionModal}
          stats={{
            wordsFound: foundWords.length,
            totalWords: words.length,
            hintsUsed: hintsUsed,
            timeElapsed: formattedTime,
          }}
          onShare={shareResults}
        />
      </main>
    </div>
  );
};

const Game = () => {
  // Extract challenge ID and category from URL params
  const [searchParams] = useSearchParams();
  const challengeId = searchParams.get("id");
  const category = searchParams.get("category");

  // Create a unique random ID when none is provided (e.g., on direct navigation or refresh)
  // This ensures we get a fresh puzzle on each page load
  const uniqueId =
    challengeId ||
    `refresh-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

  return (
    <GameProvider challengeId={uniqueId} category={category || undefined}>
      <GameContent />
    </GameProvider>
  );
};

export default Game;
