
import React from 'react';
import { GameProvider, useGame } from '@/contexts/GameContext';
import Header from '@/components/layout/Header';
import ChallengeHeader from '@/components/game/ChallengeHeader';
import WordGrid from '@/components/game/WordGrid';
import GameControls from '@/components/game/GameControls';
import WordList from '@/components/game/WordList';
import HintModal from '@/components/game/HintModal';
import CompletionModal from '@/components/game/CompletionModal';

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
    shareResults
  } = useGame();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-5xl pt-6 pb-16 px-4 space-y-6">
        <ChallengeHeader
          title={title}
          description={description}
          date={new Date()}
          difficulty={difficulty}
          timeRemaining={formattedTime}
        />
        
        <WordGrid
          size={grid.length}
          letters={grid}
          words={words}
          onWordFound={findWord}
        />
        
        <GameControls
          wordsFound={foundWords.length}
          totalWords={words.length}
          hintsRemaining={hintsRemaining}
          onUseHint={useHint}
          onShare={shareResults}
        />
        
        <WordList
          words={words}
          foundWords={foundWords}
        />
        
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
            timeElapsed: formattedTime
          }}
          onShare={shareResults}
        />
      </main>
    </div>
  );
};

const Game = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

export default Game;
