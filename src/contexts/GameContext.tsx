
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  generateDailyChallenge,
  formatTimeElapsed 
} from '@/lib/utils';
import { toast } from 'sonner';

// Define the game state types
interface GameState {
  // Challenge data
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  grid: string[][];
  words: string[];
  
  // Game progress
  foundWords: string[];
  hintsUsed: number;
  hintsRemaining: number;
  secondsElapsed: number;
  formattedTime: string;
  isGameComplete: boolean;
  
  // Modal states
  isHintModalOpen: boolean;
  isCompletionModalOpen: boolean;
  currentHint: {
    type: 'letter' | 'word' | 'definition';
    content: string;
  };
}

interface GameContextType extends GameState {
  findWord: (word: string) => void;
  useHint: () => void;
  closeHintModal: () => void;
  closeCompletionModal: () => void;
  shareResults: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize game state
  const [gameState, setGameState] = useState<GameState>(() => {
    const dailyChallenge = generateDailyChallenge();
    
    return {
      // Challenge data
      title: dailyChallenge.title,
      description: dailyChallenge.description,
      difficulty: dailyChallenge.difficulty,
      grid: dailyChallenge.grid,
      words: dailyChallenge.words,
      
      // Game progress
      foundWords: [],
      hintsUsed: 0,
      hintsRemaining: 3, // Default hint count
      secondsElapsed: 0,
      formattedTime: '0:00',
      isGameComplete: false,
      
      // Modal states
      isHintModalOpen: false,
      isCompletionModalOpen: false,
      currentHint: {
        type: 'letter',
        content: ''
      }
    };
  });
  
  // Timer functionality
  useEffect(() => {
    if (gameState.isGameComplete) return;
    
    const timer = setInterval(() => {
      setGameState(prev => {
        const newSeconds = prev.secondsElapsed + 1;
        return {
          ...prev,
          secondsElapsed: newSeconds,
          formattedTime: formatTimeElapsed(newSeconds)
        };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameState.isGameComplete]);
  
  // Check for game completion
  useEffect(() => {
    if (gameState.foundWords.length === gameState.words.length && !gameState.isGameComplete) {
      setGameState(prev => ({
        ...prev,
        isGameComplete: true,
        isCompletionModalOpen: true
      }));
    }
  }, [gameState.foundWords, gameState.words, gameState.isGameComplete]);
  
  // Game actions
  const findWord = (word: string) => {
    if (gameState.foundWords.includes(word)) return;
    
    setGameState(prev => ({
      ...prev,
      foundWords: [...prev.foundWords, word]
    }));
  };
  
  const resetGame = () => {
    const newChallenge = generateDailyChallenge();
    
    setGameState({
      // Challenge data
      title: newChallenge.title,
      description: newChallenge.description,
      difficulty: newChallenge.difficulty,
      grid: newChallenge.grid,
      words: newChallenge.words,
      
      // Reset game progress
      foundWords: [],
      hintsUsed: 0,
      hintsRemaining: 3,
      secondsElapsed: 0,
      formattedTime: '0:00',
      isGameComplete: false,
      
      // Reset modal states
      isHintModalOpen: false,
      isCompletionModalOpen: false,
      currentHint: {
        type: 'letter',
        content: ''
      }
    });
    
    toast.success("New puzzle generated!", {
      position: "top-center"
    });
  };
  
  const useHint = () => {
    if (gameState.hintsRemaining <= 0) {
      toast.error("No hints remaining", {
        position: "top-center"
      });
      return;
    }
    
    // Find a word that hasn't been discovered yet
    const unsolvedWords = gameState.words.filter(
      word => !gameState.foundWords.includes(word)
    );
    
    if (unsolvedWords.length === 0) {
      toast.info("You've found all the words!", {
        position: "top-center"
      });
      return;
    }
    
    // Randomly choose hint type
    const hintTypes: ('letter' | 'word' | 'definition')[] = ['letter', 'word', 'definition'];
    const randomType = hintTypes[Math.floor(Math.random() * hintTypes.length)];
    
    // Randomly choose a word
    const randomWord = unsolvedWords[Math.floor(Math.random() * unsolvedWords.length)];
    
    let hintContent = '';
    
    switch (randomType) {
      case 'letter':
        // Reveal a random letter from the word
        const letterIndex = Math.floor(Math.random() * randomWord.length);
        hintContent = randomWord[letterIndex];
        break;
      case 'word':
        // Reveal the entire word
        hintContent = randomWord;
        break;
      case 'definition':
        // Simple definitions for demo purposes
        const definitions: Record<string, string> = {
          LION: 'A large wild cat with a mane',
          TIGER: 'A large Asian wild cat with stripes',
          ZEBRA: 'An African wild horse with black and white stripes',
          WOLF: 'A wild carnivorous mammal related to dogs',
          FROG: 'A small tailless amphibian that typically moves by jumping',
          BEAR: 'A large heavy mammal with thick fur',
          DEER: 'A hoofed grazing animal with antlers',
          FOX: 'A small carnivorous mammal with a bushy tail',
          RAT: 'A long-tailed rodent',
          APPLE: 'A round fruit with red, yellow, or green skin',
          PEAR: 'A sweet fruit that is narrow at the stalk and wider at the base',
          BANANA: 'A long curved fruit with a yellow peel',
          GRAPE: 'A small round fruit growing in clusters on a vine',
          CARROT: 'An orange root vegetable',
          MANGO: 'A sweet tropical fruit with orange flesh',
          PINEAPPLE: 'A tropical fruit with a tough spiky skin',
          PEA: 'A small round green seed that is eaten as a vegetable',
          PARIS: 'The capital city of France',
          ROME: 'The capital city of Italy',
          BERLIN: 'The capital city of Germany',
          TOKYO: 'The capital city of Japan',
          DELHI: 'The capital territory of India',
          DUBLIN: 'The capital city of Ireland',
          BANGKOK: 'The capital city of Thailand',
          BEIJING: 'The capital city of China'
        };
        
        hintContent = definitions[randomWord] || `A hidden word with ${randomWord.length} letters`;
        break;
    }
    
    setGameState(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
      hintsRemaining: prev.hintsRemaining - 1,
      isHintModalOpen: true,
      currentHint: {
        type: randomType,
        content: hintContent
      }
    }));
  };
  
  const closeHintModal = () => {
    setGameState(prev => ({
      ...prev,
      isHintModalOpen: false
    }));
  };
  
  const closeCompletionModal = () => {
    setGameState(prev => ({
      ...prev,
      isCompletionModalOpen: false
    }));
  };
  
  const shareResults = () => {
    // Create a shareable message
    const message = `I completed "${gameState.title}" in ${gameState.formattedTime} with ${gameState.hintsUsed} hints used! Play today's WordWonder challenge: https://wordwonder.game/daily`;
    
    // Try to use the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'WordWonder Challenge',
        text: message,
        url: 'https://wordwonder.game/daily'
      }).catch(() => {
        // Fallback if share fails
        copyToClipboard(message);
      });
    } else {
      // Fallback for browsers that don't support sharing
      copyToClipboard(message);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Results copied to clipboard!', {
        position: 'top-center'
      });
    }).catch(() => {
      toast.error('Failed to copy results', {
        position: 'top-center'
      });
    });
  };
  
  return (
    <GameContext.Provider
      value={{
        ...gameState,
        findWord,
        useHint,
        closeHintModal,
        closeCompletionModal,
        shareResults,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Create a hook for easy context usage
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
