
import React, { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Letter {
  char: string;
  row: number;
  col: number;
  isSelected: boolean;
  isCorrect: boolean;
  isHighlighted: boolean;
}

interface WordGridProps {
  size: number;
  letters: string[][];
  words: string[];
  onWordFound: (word: string) => void;
}

const WordGrid: React.FC<WordGridProps> = ({ size, letters, words, onWordFound }) => {
  const [grid, setGrid] = useState<Letter[][]>(() => {
    return letters.map((row, rowIndex) => 
      row.map((char, colIndex) => ({
        char,
        row: rowIndex,
        col: colIndex,
        isSelected: false,
        isCorrect: false,
        isHighlighted: false
      }))
    );
  });
  
  const [currentSelection, setCurrentSelection] = useState<Letter[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  
  const handleLetterClick = (letter: Letter) => {
    // Already part of a found word
    if (letter.isCorrect) return;
    
    // First letter selection
    if (currentSelection.length === 0) {
      const newGrid = [...grid];
      newGrid[letter.row][letter.col].isSelected = true;
      setGrid(newGrid);
      setCurrentSelection([letter]);
      return;
    }
    
    const lastLetter = currentSelection[currentSelection.length - 1];
    
    // Check if the letter is adjacent to the last selected letter
    const isAdjacent = 
      (Math.abs(letter.row - lastLetter.row) <= 1 && 
       Math.abs(letter.col - lastLetter.col) <= 1);
    
    // Check if letter is already selected
    const isAlreadySelected = currentSelection.some(
      l => l.row === letter.row && l.col === letter.col
    );
    
    if (isAlreadySelected) {
      // If clicking the last letter, deselect it
      if (letter.row === lastLetter.row && letter.col === lastLetter.col) {
        const newGrid = [...grid];
        newGrid[letter.row][letter.col].isSelected = false;
        setGrid(newGrid);
        setCurrentSelection(currentSelection.slice(0, -1));
      }
      // If clicking the first letter, complete the word selection
      else if (letter.row === currentSelection[0].row && letter.col === currentSelection[0].col) {
        checkWord();
      }
      return;
    }
    
    // Only allow adjacent letters to be selected
    if (isAdjacent) {
      const newGrid = [...grid];
      newGrid[letter.row][letter.col].isSelected = true;
      setGrid(newGrid);
      setCurrentSelection([...currentSelection, letter]);
    }
  };
  
  const checkWord = () => {
    const selectedWord = currentSelection.map(letter => letter.char).join('');
    const reversedWord = currentSelection.map(letter => letter.char).reverse().join('');
    
    if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      // Word found!
      const newGrid = [...grid];
      currentSelection.forEach(letter => {
        newGrid[letter.row][letter.col].isSelected = false;
        newGrid[letter.row][letter.col].isCorrect = true;
      });
      
      setGrid(newGrid);
      setCurrentSelection([]);
      setFoundWords([...foundWords, selectedWord]);
      onWordFound(selectedWord);
      
      toast.success(`Found "${selectedWord}"!`, {
        position: "top-center"
      });
    } 
    else if (words.includes(reversedWord) && !foundWords.includes(reversedWord)) {
      // Reversed word found!
      const newGrid = [...grid];
      currentSelection.forEach(letter => {
        newGrid[letter.row][letter.col].isSelected = false;
        newGrid[letter.row][letter.col].isCorrect = true;
      });
      
      setGrid(newGrid);
      setCurrentSelection([]);
      setFoundWords([...foundWords, reversedWord]);
      onWordFound(reversedWord);
      
      toast.success(`Found "${reversedWord}"!`, {
        position: "top-center"
      });
    } else {
      // Invalid word, clear selection
      const newGrid = [...grid];
      currentSelection.forEach(letter => {
        newGrid[letter.row][letter.col].isSelected = false;
      });
      
      setGrid(newGrid);
      setCurrentSelection([]);
      
      toast.error("Not a valid word", {
        position: "top-center"
      });
    }
  };
  
  const handleReset = () => {
    const newGrid = grid.map(row => 
      row.map(letter => ({
        ...letter,
        isSelected: false
      }))
    );
    
    setGrid(newGrid);
    setCurrentSelection([]);
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-panel rounded-2xl p-4 shadow-sm">
        <div 
          className="grid gap-1.5 md:gap-2.5" 
          style={{ 
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` 
          }}
        >
          {grid.flat().map((letter, index) => (
            <button
              key={index}
              className={cn(
                "letter-cell",
                letter.isSelected && "letter-cell-selected",
                letter.isCorrect && "letter-cell-correct",
                letter.isHighlighted && "letter-cell-highlight"
              )}
              onClick={() => handleLetterClick(letter)}
            >
              {letter.char}
            </button>
          ))}
        </div>
        
        {currentSelection.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              className="game-button bg-red-50 text-red-600 hover:bg-red-100"
              onClick={handleReset}
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordGrid;
