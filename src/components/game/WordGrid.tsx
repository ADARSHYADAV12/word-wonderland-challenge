import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
  foundWords: string[]; // Add found words from context
}

const WordGrid: React.FC<WordGridProps> = ({
  size,
  letters,
  words,
  onWordFound,
  foundWords,
}) => {
  const [grid, setGrid] = useState<Letter[][]>(() => {
    return letters.map((row, rowIndex) =>
      row.map((char, colIndex) => ({
        char,
        row: rowIndex,
        col: colIndex,
        isSelected: false,
        isCorrect: false,
        isHighlighted: false,
      }))
    );
  });

  // Update grid when letters prop changes (for new puzzles)
  useEffect(() => {
    const newGrid = letters.map((row, rowIndex) =>
      row.map((char, colIndex) => ({
        char,
        row: rowIndex,
        col: colIndex,
        isSelected: false,
        isCorrect: false,
        isHighlighted: false,
      }))
    );
    setGrid(newGrid);
    setCurrentSelection([]);
  }, [letters]);

  const [currentSelection, setCurrentSelection] = useState<Letter[]>([]);

  // Update grid when foundWords changes
  useEffect(() => {
    // Mark words as found in the grid
    if (foundWords.length > 0) {
      const newGrid = [...grid];

      // Reset isCorrect for all cells
      newGrid.forEach((row) =>
        row.forEach((cell) => {
          cell.isCorrect = false;
        })
      );

      // For each found word, find all possible placements and mark them
      foundWords.forEach((word) => {
        // Search in all directions
        for (let row = 0; row < size; row++) {
          for (let col = 0; col < size; col++) {
            if (letters[row][col] === word[0]) {
              // Check all 8 directions
              const directions = [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1],
              ];

              for (const [dx, dy] of directions) {
                // Check if word can fit in this direction
                let canFit = true;
                for (let i = 0; i < word.length; i++) {
                  const newRow = row + i * dx;
                  const newCol = col + i * dy;

                  if (
                    newRow < 0 ||
                    newRow >= size ||
                    newCol < 0 ||
                    newCol >= size ||
                    letters[newRow][newCol] !== word[i]
                  ) {
                    canFit = false;
                    break;
                  }
                }

                // If word fits in this direction, mark all cells
                if (canFit) {
                  for (let i = 0; i < word.length; i++) {
                    const newRow = row + i * dx;
                    const newCol = col + i * dy;
                    newGrid[newRow][newCol].isCorrect = true;
                  }
                }
              }
            }
          }
        }
      });

      setGrid(newGrid);
    }
  }, [foundWords, letters, size, grid]);

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
      Math.abs(letter.row - lastLetter.row) <= 1 &&
      Math.abs(letter.col - lastLetter.col) <= 1;

    // Check if letter is already selected
    const isAlreadySelected = currentSelection.some(
      (l) => l.row === letter.row && l.col === letter.col
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
      else if (
        letter.row === currentSelection[0].row &&
        letter.col === currentSelection[0].col
      ) {
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
    const selectedWord = currentSelection.map((letter) => letter.char).join("");
    const reversedWord = currentSelection
      .map((letter) => letter.char)
      .reverse()
      .join("");

    // Normalize words for comparison (convert to uppercase)
    const normalizedSelectedWord = selectedWord.toUpperCase();
    const normalizedReversedWord = reversedWord.toUpperCase();

    // Check if the word exists in the word list (either forward or reversed)
    const wordToCheck = words.find(
      (word) =>
        word.toUpperCase() === normalizedSelectedWord ||
        word.toUpperCase() === normalizedReversedWord
    );

    if (wordToCheck && !foundWords.includes(wordToCheck)) {
      // Word found! Call the context function to update global state
      onWordFound(wordToCheck);

      // Clear selection
      const newGrid = [...grid];
      currentSelection.forEach((letter) => {
        newGrid[letter.row][letter.col].isSelected = false;
        // Mark letters as correct immediately for visual feedback
        newGrid[letter.row][letter.col].isCorrect = true;
      });

      setGrid(newGrid);
      setCurrentSelection([]);

      toast.success(`Found "${wordToCheck}"!`, {
        position: "top-center",
      });
    } else {
      // Invalid word or already found, clear selection
      const newGrid = [...grid];
      currentSelection.forEach((letter) => {
        newGrid[letter.row][letter.col].isSelected = false;
      });

      setGrid(newGrid);
      setCurrentSelection([]);

      if (wordToCheck && foundWords.includes(wordToCheck)) {
        toast.info("Word already found", {
          position: "top-center",
        });
      } else {
        toast.error("Not a valid word", {
          position: "top-center",
        });
      }
    }
  };

  const handleReset = () => {
    const newGrid = grid.map((row) =>
      row.map((letter) => ({
        ...letter,
        isSelected: false,
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
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
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
